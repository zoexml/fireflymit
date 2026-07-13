/**
 * Initialize a new project from a preset.
 *
 * Usage:
 *   firefly init [target] --preset vue-monorepo --name my-app
 *   firefly init [target] --preset node-lib --no-interactive
 *
 * Steps:
 *   1. Resolve preset (interactive prompt if not given)
 *   2. Write package.json (if absent)
 *   3. Apply all configs from the preset via applyConfig()
 *   4. Run pnpm install
 */
import { existsSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { execa } from 'execa'
import { detectProject } from '../utils/detect.js'
import { CliError } from '../utils/errors.js'
import { DEFAULT_PRESET, listPresets, PRESETS } from '../utils/presets.js'
import { applyConfig } from './apply.js'

const __req = createRequire(import.meta.url)
const pc = __req('picocolors')
const { bg, brightBlue, brightGreen, brightYellow, dim, red } = pc

async function promptPreset() {
  const { isCancel, select, cancel } = await import('@clack/prompts')
  const result = await select({
    message: 'Choose a preset:',
    options: listPresets().map(p => ({
      value: p.id,
      label: p.label,
      hint: p.description,
    })),
    initialValue: DEFAULT_PRESET,
  })
  if (isCancel(result)) {
    cancel()
    throw new CliError('Cancelled', 0)
  }
  return result
}

async function promptName(defaultName) {
  const { isCancel, text, cancel } = await import('@clack/prompts')
  const result = await text({
    message: 'Project name:',
    initialValue: defaultName,
    validate: v => (v && /^[\w-]+$/.test(v) ? undefined : 'Use letters, numbers, dashes, underscores'),
  })
  if (isCancel(result)) {
    cancel()
    throw new CliError('Cancelled', 0)
  }
  return result
}

export async function initCommand(target, opts = {}) {
  const abs = resolve(target)

  // 1. Resolve preset
  let presetId = opts.preset
  if (!presetId && opts.interactive !== false) {
    presetId = await promptPreset()
  }
  if (!presetId) presetId = DEFAULT_PRESET

  const preset = PRESETS[presetId]
  if (!preset) {
    console.log(`${red('✗')} Unknown preset: ${presetId}`)
    console.log(`${dim('?')} Available: ${listPresets().map(p => p.id).join(', ')}\n`)
    throw new CliError(`Unknown preset: ${presetId}`)
  }

  console.log(`${brightBlue('▶')} Initializing with preset: ${brightGreen(preset.label)}\n`)

  // 2. Detect / derive project name
  const detected = detectProject(abs)
  let projectName = opts.name
  if (!projectName) {
    projectName = detected.name || abs.split('/').pop() || 'my-project'
    if (opts.interactive !== false && !detected.hasPackageJson) {
      projectName = await promptName(projectName)
    }
  }

  // 3. Write package.json if missing
  const pkgPath = join(abs, 'package.json')
  if (!existsSync(pkgPath)) {
    const minimalPkg = {
      name: projectName,
      version: '0.0.1',
      private: true,
      type: 'module',
      ...(preset.monorepo ? { workspaces: ['packages/*'] } : {}),
    }
    writeFileSync(pkgPath, `${JSON.stringify(minimalPkg, null, 2)}\n`, 'utf-8')
    console.log(`  ${bg(16, 168, 8)('✓')} package.json`)
  }

  // 4. Apply each config
  const ctx = {
    projectName,
    year: new Date().getFullYear(),
    monorepo: preset.monorepo,
    framework: preset.framework,
    preset: presetId,
  }

  for (const id of preset.configs) {
    try {
      await applyConfig(id, abs, ctx)
      console.log(`  ${bg(16, 168, 8)('✓')} ${id}`)
    } catch (err) {
      console.log(`  ${red('✗')} ${id}: ${err.message}`)
    }
  }

  // 5. Install
  console.log(`\n${brightBlue('→')} Running pnpm install...`)
  try {
    await execa('pnpm', ['install'], { cwd: abs, stdio: 'inherit' })
  } catch {
    console.log(`${brightYellow('⚠')} pnpm install failed — run ${brightBlue('pnpm install')} manually\n`)
  }

  console.log()
  console.log(`${bg(16, 168, 8)(brightGreen(` ✓ ${preset.label} ready at ${abs}`))}`)
  console.log(`${dim('  Next:')} cd ${abs} && pnpm dev\n`)
}
