/**
 * Preset definitions. Each preset lists the configs it bundles.
 *
 * Config ids map to files under templates/<preset>/:
 *   - eslint        → eslint.config.js.tpl
 *   - prettier      → .prettierrc.json.tpl
 *   - typescript    → tsconfig.json.tpl
 *   - stylelint     → .stylelintrc.js.tpl
 *   - commitlint    → commitlint.config.js.tpl
 *   - git-hooks     → package.json.snippet.tpl (merges into existing pkg)
 *   - turbo         → turbo.json.tpl
 *   - vscode        → .vscode/settings.json.tpl, .vscode/extensions.json.tpl
 *   - github-actions → .github/workflows/ci.yml.tpl
 *
 * Adding a preset = create templates/<id>/ + add entry below.
 */

export const CONFIGS = {
  'eslint': { label: 'ESLint', description: '@fireflymit/eslint-config', requires: ['typescript'] },
  'prettier': { label: 'Prettier', description: '@fireflymit/prettier-config' },
  'typescript': { label: 'TypeScript', description: '@fireflymit/typescript-config' },
  'stylelint': { label: 'Stylelint', description: '@fireflymit/stylelint-config' },
  'commitlint': { label: 'CommitLint', description: '@fireflymit/commitlint-config' },
  'git-hooks': { label: 'Git Hooks', description: 'lint-staged + commit-msg' },
  'turbo': { label: 'Turborepo', description: 'build orchestration' },
  'vscode': { label: 'VSCode', description: 'settings + extensions' },
  'github-actions': { label: 'GitHub Actions', description: 'CI workflow' },
}

export const PRESETS = {
  'vue-monorepo': {
    label: 'Vue 3 + Monorepo',
    description: 'Vue 3 + TS + Element Plus monorepo with Turborepo',
    framework: 'vue',
    monorepo: true,
    configs: ['eslint', 'prettier', 'typescript', 'stylelint', 'commitlint', 'git-hooks', 'turbo', 'vscode', 'github-actions'],
  },
  'node-lib': {
    label: 'Node Library',
    description: 'TypeScript library without frontend tooling',
    framework: 'node',
    monorepo: false,
    configs: ['eslint', 'prettier', 'typescript', 'commitlint', 'git-hooks', 'vscode'],
  },
  'basic': {
    label: 'Basic JavaScript',
    description: 'Minimal lint + format + commit hooks',
    framework: 'node',
    monorepo: false,
    configs: ['eslint', 'prettier', 'commitlint', 'git-hooks'],
  },
}

export const DEFAULT_PRESET = 'vue-monorepo'

export function getPreset(id) {
  return PRESETS[id]
}

export function listPresets() {
  return Object.entries(PRESETS).map(([id, p]) => ({ id, ...p }))
}

export function listConfigs() {
  return Object.entries(CONFIGS).map(([id, c]) => ({ id, ...c }))
}

export function resolvePresetConfigs(presetId, overrides = null) {
  const preset = PRESETS[presetId]
  if (!preset) {
    throw new Error(`Unknown preset: ${presetId}. Available: ${Object.keys(PRESETS).join(', ')}`)
  }
  return overrides || preset.configs
}

/**
 * Resolve preset id from framework + monorepo flags.
 * Explicit preset takes precedence.
 */
export function resolvePreset(framework, monorepo, explicitPreset) {
  if (explicitPreset) return explicitPreset
  if (framework === 'node' && !monorepo) return 'node-lib'
  return 'vue-monorepo'
}
