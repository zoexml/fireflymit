import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { applyConfig } from '../src/commands/apply.js'

let dir
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'scaffold-apply-'))
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('applyConfig()', () => {
  it('writes eslint.config.js from vue-monorepo template', async () => {
    await applyConfig('eslint', dir, {
      projectName: 'demo-app',
      monorepo: true,
      framework: 'vue',
      preset: 'vue-monorepo',
    })
    const out = readFileSync(join(dir, 'eslint.config.js'), 'utf-8')
    expect(out).toContain('@fireflymit/eslint-config')
    expect(out).toContain('vue-monorepo')
    expect(out).toContain('demo-app')
    expect(out).not.toContain('{{projectName}}')
  })

  it('writes tsconfig.json that extends the vue preset', async () => {
    await applyConfig('typescript', dir, {
      projectName: 'demo',
      monorepo: true,
      framework: 'vue',
      preset: 'vue-monorepo',
    })
    const out = JSON.parse(readFileSync(join(dir, 'tsconfig.json'), 'utf-8'))
    expect(out.extends).toBe('@fireflymit/typescript-config/vue.json')
  })

  it('writes node-lib tsconfig when preset is node-lib', async () => {
    await applyConfig('typescript', dir, {
      projectName: 'demo',
      monorepo: false,
      framework: 'node',
      preset: 'node-lib',
    })
    const out = JSON.parse(readFileSync(join(dir, 'tsconfig.json'), 'utf-8'))
    expect(out.extends).toBe('@fireflymit/typescript-config/base.json')
  })

  it('writes turbo.json from vue-monorepo template', async () => {
    await applyConfig('turbo', dir, {
      projectName: 'demo',
      monorepo: true,
      framework: 'vue',
      preset: 'vue-monorepo',
    })
    expect(existsSync(join(dir, 'turbo.json'))).toBe(true)
    const turbo = JSON.parse(readFileSync(join(dir, 'turbo.json'), 'utf-8'))
    expect(turbo).toHaveProperty('tasks.build')
    expect(turbo.tasks.build).toMatchObject({ dependsOn: ['^build'] })
  })

  it('vscode writes both settings.json and extensions.json', async () => {
    await applyConfig('vscode', dir, {
      projectName: 'demo',
      monorepo: true,
      framework: 'vue',
      preset: 'vue-monorepo',
    })
    expect(existsSync(join(dir, '.vscode/settings.json'))).toBe(true)
    expect(existsSync(join(dir, '.vscode/extensions.json'))).toBe(true)
    const settings = JSON.parse(readFileSync(join(dir, '.vscode/settings.json'), 'utf-8'))
    expect(settings['vue.server.hybridMode']).toBe(true)
  })

  it('github-actions writes ci.yml into .github/workflows', async () => {
    await applyConfig('github-actions', dir, {
      projectName: 'demo',
      monorepo: true,
      framework: 'vue',
      preset: 'vue-monorepo',
    })
    expect(existsSync(join(dir, '.github/workflows/ci.yml'))).toBe(true)
    const ci = readFileSync(join(dir, '.github/workflows/ci.yml'), 'utf-8')
    expect(ci).toMatch(/^name: ✅ CI/m)
    expect(ci).toContain('pnpm lint')
  })

  it('git-hooks merges simpleGitHooks + lint-staged into existing package.json', async () => {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({
      name: 'merge-target',
      version: '1.0.0',
    }, null, 2))

    await applyConfig('git-hooks', dir, { projectName: 'merge-target' })

    const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8'))
    expect(pkg.simpleGitHooks).toEqual({
      'pre-commit': 'pnpm lint-staged',
      'commit-msg': 'npx --no-install commitlint --edit $1',
    })
    expect(pkg['lint-staged']).toEqual({ '*': 'eslint --fix' })
    // Original fields preserved
    expect(pkg.name).toBe('merge-target')
    expect(pkg.version).toBe('1.0.0')
  })

  it('git-hooks throws when package.json is missing', async () => {
    await expect(applyConfig('git-hooks', dir, { projectName: 'x' }))
      .rejects
      .toThrow(/package.json required/)
  })
})
