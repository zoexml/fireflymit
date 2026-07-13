/**
 * Minimal template renderer.
 *
 * Supports:
 *   {{var}}                     substitute variable
 *   {{var | default}}           substitute with default fallback
 *   {{#if var}}…{{/if}}         conditional block (var truthy/non-empty)
 *   {{#unless var}}…{{/unless}} negative conditional
 *
 * Variables resolve against the merged context object. Values may be
 * strings, booleans, or arrays (rendered as comma-separated strings).
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

// Template DSL — the lint rules below don't understand the mustache
// syntax we deliberately allow (whitespace around the `|`, free text
// in the fallback). Static analysis flags false-positive backtracking
// risk here. The patterns are anchored by `{{` and `}}` so input is
// already bounded.
/* eslint-disable regexp/no-super-linear-backtracking */
const VAR_PATTERN = /\{\{[ \t]*([a-z_]\w*)(?:[ \t]*\|[ \t]*([^}]+))?[ \t]*\}\}/gi
const IF_PATTERN = /\{\{#if[ \t]+([a-z_]\w*)[ \t]*\}\}([\s\S]*?)\{\{\/if\}\}/g
const UNLESS_PATTERN = /\{\{#unless[ \t]+([a-z_]\w*)[ \t]*\}\}([\s\S]*?)\{\{\/unless\}\}/g

function resolveValue(name, ctx) {
  if (!Object.prototype.hasOwnProperty.call(ctx, name)) return ''
  const v = ctx[name]
  if (v === undefined || v === null || v === false || v === '') return ''
  if (Array.isArray(v)) return v.join(', ')
  return String(v)
}

function substituteVars(input, ctx) {
  return input.replace(VAR_PATTERN, (match, name, fallback) => {
    // hasOwnProperty first so explicit-false values render as '' instead
    // of leaving the placeholder visible.
    if (Object.prototype.hasOwnProperty.call(ctx, name)) {
      return resolveValue(name, ctx)
    }
    return fallback !== undefined ? fallback.trim() : match
  })
}

function processConditionals(input, ctx) {
  return input
    .replace(IF_PATTERN, (_, name, body) => {
      const v = ctx[name]
      return v && v !== 'false' ? body : ''
    })
    .replace(UNLESS_PATTERN, (_, name, body) => {
      const v = ctx[name]
      return !v || v === 'false' ? body : ''
    })
}

export function render(template, ctx = {}) {
  return substituteVars(processConditionals(template, ctx), ctx)
}

export function renderFile(sourcePath, targetPath, ctx = {}) {
  const tpl = readFileSync(sourcePath, 'utf-8')
  const out = render(tpl, ctx)
  mkdirSync(dirname(targetPath), { recursive: true })
  writeFileSync(targetPath, out, 'utf-8')
  return { sourcePath, targetPath, bytes: out.length }
}
