/**
 * Apply individual configs to an existing project.
 *
 * Templates live under templates/<preset>/<config>.tpl. Filenames
 * with a .tpl suffix have the suffix stripped on output. Files
 * without a recognized preset template fall through to applyConfig()
 * special cases (git-hooks, vscode, github-actions — which produce
 * multiple files from a single config id).
 *
 * Usage:
 *   await applyCommand(target, { configs: ['eslint','typescript'] })
 *   await applyCommand(target, { all: true })
 *   await applyCommand(target, { preset: 'vue-monorepo' })  // applies preset bundle
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import { CliError } from '../utils/errors.js'
import { CONFIGS, listConfigs, PRESETS, resolvePreset, resolvePresetConfigs } from '../utils/presets.js'
import { renderFile } from '../utils/templates.js'

const __req = createRequire(import.meta.url)
const pc = __req('picocolors')
const { bg, brightBlue, brightGreen, brightYellow, dim, red } = pc

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = resolve(__dirname, '../../templates')

function resolveConfigs(opts) {
  if (opts.preset) return resolvePresetConfigs(opts.preset)
  if (opts.all) return listConfigs().map(c => c.id)
  if (Array.isArray(opts.configs) && opts.configs.length) return opts.configs
  return null
}

async function promptConfigs() {
  const { isCancel, select, cancel } = await import('@clack/prompts')
  console.log(`${dim('?')} Select configs to apply (space to toggle, enter to confirm)\n`)
  const result = await select({
    message: 'Which configs do you want to apply?',
    options: listConfigs().map(c => ({
      value: c.id,
      label: c.label,
      hint: c.description,
    })),
    multiple: true,
    initialValues: ['eslint', 'typescript', 'git-hooks'],
  })
  if (isCancel(result)) {
    cancel()
    throw new CliError('Cancelled', 0)
  }
  return result
}

export async function applyCommand(target, opts = {}) {
  const { interactive = true } = opts
  const abs = resolve(target)

  let selected = resolveConfigs(opts)

  if (!selected && interactive) {
    selected = await promptConfigs()
  }
  if (!selected || selected.length === 0) {
    console.log(`${dim('→')} No configs selected, exiting.`)
    return
  }

  // Validate
  const invalid = selected.filter(id => !CONFIGS[id])
  if (invalid.length) {
    console.log(`${red('✗')} Unknown configs: ${invalid.join(', ')}`)
    console.log(`${dim('?')} Available: ${listConfigs().map(c => c.id).join(', ')}\n`)
    throw new CliError(`Unknown configs: ${invalid.join(', ')}`)
  }

  console.log(`${dim('→')} Applying: ${selected.join(', ')}\n`)

  const ctx = buildContext(abs, opts)
  const applied = []
  const failed = []

  for (const id of selected) {
    try {
      await applyConfig(id, abs, ctx)
      applied.push(id)
      console.log(`  ${bg(16, 168, 8)('✓')} ${CONFIGS[id].label}`)
    } catch (err) {
      failed.push(id)
      console.log(`  ${red('✗')} ${CONFIGS[id].label}: ${err.message}`)
    }
  }

  // Install deps
  console.log(`\n${brightBlue('→')} Running pnpm install...`)
  try {
    await execa('pnpm', ['install'], { cwd: abs, stdio: 'inherit' })
  } catch {
    console.log(`${brightYellow('⚠')} pnpm install failed — run ${brightBlue('pnpm install')} manually\n`)
  }

  // Summary
  console.log()
  if (failed.length === 0) {
    console.log(`${bg(16, 168, 8)(brightGreen(` ✓ Applied ${applied.length} config(s)`))}`)
  } else {
    console.log(`${bg(220, 161, 38)(brightGreen(` ✓ Applied ${applied.length}, failed ${failed.length}`))}`)
    console.log(`${dim('  Failed:')} ${failed.join(', ')}`)
  }
  console.log()
}

function buildContext(target, opts) {
  let name = opts.name
  if (!name) {
    try {
      const pkg = JSON.parse(readFileSync(join(target, 'package.json'), 'utf-8'))
      name = pkg.name || 'my-project'
    } catch {
      name = 'my-project'
    }
  }
  const preset = opts.preset ? PRESETS[opts.preset] : null
  return {
    projectName: name,
    year: new Date().getFullYear(),
    monorepo: opts.monorepo === undefined ? preset?.monorepo : opts.monorepo,
    framework: opts.framework || preset?.framework || 'vue',
    preset: opts.preset,
  }
}

function destPath(target, rel) {
  return join(target, rel)
}

export async function applyConfig(id, target, ctx) {
  const preset = resolvePreset(ctx.framework, ctx.monorepo, ctx.preset)
  const presetDir = join(TEMPLATES_DIR, preset)

  switch (id) {
    case 'eslint':
      return renderFile(join(presetDir, 'eslint.config.js.tpl'), destPath(target, 'eslint.config.js'), ctx)
    case 'prettier':
      return renderFile(join(presetDir, '.prettierrc.json.tpl'), destPath(target, '.prettierrc.json'), ctx)
    case 'typescript':
      return renderFile(join(presetDir, 'tsconfig.json.tpl'), destPath(target, 'tsconfig.json'), ctx)
    case 'stylelint':
      return renderFile(join(presetDir, '.stylelintrc.js.tpl'), destPath(target, '.stylelintrc.js'), ctx)
    case 'commitlint':
      return renderFile(join(presetDir, 'commitlint.config.js.tpl'), destPath(target, 'commitlint.config.js'), ctx)
    case 'git-hooks':
      return mergeGitHooks(target, ctx)
    case 'turbo':
      return renderFile(join(presetDir, 'turbo.json.tpl'), destPath(target, 'turbo.json'), ctx)
    case 'vscode':
      await renderFile(join(presetDir, '.vscode/settings.json.tpl'), destPath(target, '.vscode/settings.json'), ctx)
      return renderFile(join(presetDir, '.vscode/extensions.json.tpl'), destPath(target, '.vscode/extensions.json'), ctx)
    case 'github-actions':
      return renderFile(join(presetDir, '.github/workflows/ci.yml.tpl'), destPath(target, '.github/workflows/ci.yml'), ctx)
    default:
      throw new Error(`Unknown config: ${id}`)
  }
}

function mergeGitHooks(target, ctx) {
  const pkgPath = join(target, 'package.json')
  if (!existsSync(pkgPath)) {
    throw new Error('package.json required for git-hooks config')
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
  pkg.simpleGitHooks = {
    'pre-commit': 'pnpm lint-staged',
    'commit-msg': 'npx --no-install commitlint --edit $1',
  }
  const lintCmd = ctx.monorepo ? 'pnpm lint-staged' : 'eslint --fix'
  pkg['lint-staged'] = { '*': lintCmd }
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf-8')
}
