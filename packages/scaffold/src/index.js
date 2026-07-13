export { applyCommand, applyConfig } from './commands/apply.js'
export { initCommand } from './commands/init.js'
export { detectProject } from './utils/detect.js'
export { CliError } from './utils/errors.js'
export {
  CONFIGS,
  DEFAULT_PRESET,
  getPreset,
  listConfigs,
  listPresets,
  PRESETS,
  resolvePreset,
  resolvePresetConfigs,
} from './utils/presets.js'
/**
 * Public API surface for @fireflymit/scaffold.
 * Re-exports utility modules so other packages can embed scaffold.
 */
export { render, renderFile } from './utils/templates.js'
export { getVersion, version } from './version.js'
