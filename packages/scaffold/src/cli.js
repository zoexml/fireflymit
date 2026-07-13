#!/usr/bin/env node
import { applyCommand } from './commands/apply.js'
import { initCommand } from './commands/init.js'
/**
 * firefly CLI entry. Subcommands:
 *
 *   init  [target] [--preset <id>] [--name <pkg>] [--yes]
 *     Scaffold a new project from a preset.
 *
 *   apply [target] [--all | --config <list> | --preset <id>] [--yes]
 *     Apply individual configs (or a preset bundle) to an existing project.
 *
 *   --help, -h     Show help
 */

const HELP = `
  ${'firefly'.padEnd(10)}  fireflymit project scaffolding CLI

  ${'USAGE'.padEnd(10)}
    firefly init  [target] [--preset <id>] [--name <pkg>] [--yes]
    firefly apply [target] [--all | --config <id,id,...>] [--preset <id>] [--yes]
    firefly --help

  ${'PRESETS'.padEnd(10)}
    vue-monorepo   Vue 3 + TS + Element Plus monorepo with Turborepo (default)
    node-lib       TypeScript library without frontend tooling
    basic          Minimal lint + format + commit hooks

  ${'OPTIONS'.padEnd(10)}
    -y, --yes                Skip interactive prompts
    --preset <id>            Preset for init or apply
    --name <pkg>             Override project name
    --all                    Apply all available configs
    --config <list>          Comma-separated list of config ids
    -h, --help               Show this help

  ${'EXAMPLES'.padEnd(10)}
    firefly init my-app --preset vue-monorepo
    firefly apply . --config eslint,typescript,git-hooks
    firefly apply . --preset node-lib --yes
`

function parseArgs(argv) {
  const positional = []
  const flags = { interactive: true }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-y' || a === '--yes' || a === '--no-interactive') {
      flags.interactive = false
    } else if (a === '--all') {
      flags.all = true
    } else if (a === '--preset' && argv[i + 1]) {
      flags.preset = argv[++i]
    } else if (a.startsWith('--preset=')) {
      flags.preset = a.slice('--preset='.length)
    } else if (a === '--config' && argv[i + 1]) {
      flags.configs = argv[++i].split(',').map(s => s.trim()).filter(Boolean)
    } else if (a.startsWith('--config=')) {
      flags.configs = a.slice('--config='.length).split(',').map(s => s.trim()).filter(Boolean)
    } else if (a === '--name' && argv[i + 1]) {
      flags.name = argv[++i]
    } else if (a.startsWith('--name=')) {
      flags.name = a.slice('--name='.length)
    } else if (a === '-h' || a === '--help') {
      flags.help = true
    } else if (a.startsWith('--')) {
      flags[a.slice(2)] = true
    } else {
      positional.push(a)
    }
  }

  return { command: positional[0], target: positional[1] || '.', flags, positional }
}

async function main() {
  const { command, target, flags } = parseArgs(process.argv.slice(2))

  if (flags.help || !command) {
    if (command) console.log(HELP)
    else console.log(HELP)
    return
  }

  switch (command) {
    case 'init':
      await initCommand(target, flags)
      break
    case 'apply':
      await applyCommand(target, flags)
      break
    case 'version':
    case '-v':
    case '--version':
    {
      const { version } = await import('./version.js')
      console.log(version)
      break
    }
    default:
      console.error(`Unknown command: ${command}\n`)
      console.log(HELP)
      process.exit(1)
  }
}

main().catch((err) => {
  const exitCode = err.exitCode ?? 1
  console.error('firefly:', err.message)
  if (process.env.DEBUG) console.error(err.stack)
  process.exit(exitCode)
})
