import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { render, renderFile } from '../src/utils/templates.js'

describe('render()', () => {
  it('substitutes simple variables', () => {
    expect(render('hello {{name}}', { name: 'world' })).toBe('hello world')
  })

  it('substitutes multiple variables', () => {
    expect(render('{{a}}-{{b}}', { a: 1, b: 2 })).toBe('1-2')
  })

  it('returns empty for undefined variables without default', () => {
    // {{var}} with no match → keeps the raw token (useful for debugging)
    expect(render('{{missing}}', {})).toBe('{{missing}}')
  })

  it('uses default fallback when variable missing', () => {
    expect(render('{{name | Anonymous}}', {})).toBe('Anonymous')
  })

  it('coerces arrays as comma-joined strings', () => {
    expect(render('{{list}}', { list: ['a', 'b', 'c'] })).toBe('a, b, c')
  })

  it('explicit false renders as empty string', () => {
    expect(render('a{{flag}}b', { flag: false })).toBe('ab')
  })
  it('keeps placeholder for missing variables (debug-friendly)', () => {
    expect(render('{{undefined_var}}', {})).toBe('{{undefined_var}}')
  })

  it('renders {{#if}} blocks when truthy', () => {
    expect(render('{{#if monorepo}}workspaces{{/if}}', { monorepo: true }))
      .toBe('workspaces')
  })

  it('removes {{#if}} blocks when falsy', () => {
    expect(render('{{#if monorepo}}workspaces{{/if}}', {}))
      .toBe('')
  })

  it('renders {{#unless}} blocks when falsy', () => {
    expect(render('{{#unless monorepo}}single{{/unless}}', {}))
      .toBe('single')
  })

  it('removes {{#unless}} blocks when truthy', () => {
    expect(render('{{#unless monorepo}}single{{/unless}}', { monorepo: true }))
      .toBe('')
  })

  it('handles whitespace inside markers', () => {
    expect(render('{{ name }}', { name: 'x' })).toBe('x')
    expect(render('{{#if monorepo }}y{{/if}}', { monorepo: true })).toBe('y')
  })

  it('combines conditionals and variables', () => {
    const tpl = `name: {{name}}\n{{#if monorepo}}workspaces: ["packages/*"]{{/if}}`
    expect(render(tpl, { name: 'foo', monorepo: true }))
      .toBe('name: foo\nworkspaces: ["packages/*"]')
    expect(render(tpl, { name: 'foo', monorepo: false }))
      .toBe('name: foo\n')
  })
})

describe('renderFile()', () => {
  it('writes rendered content to target path, creating dirs', () => {
    const dir = mkdtempSync(join(tmpdir(), 'scaffold-test-'))
    const src = join(dir, 'src.tpl')
    const dst = join(dir, 'nested', 'out.txt')
    writeFileSync(src, 'hello {{name}}', 'utf-8')

    const result = renderFile(src, dst, { name: 'world' })

    expect(readFileSync(dst, 'utf-8')).toBe('hello world')
    expect(result.bytes).toBe('hello world'.length)

    rmSync(dir, { recursive: true, force: true })
  })
})
