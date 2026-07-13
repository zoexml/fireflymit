/**
 * Project type detection. Reads package.json + workspace markers
 * to infer the framework, package manager, and monorepo structure.
 *
 * Returns a plain info object with no side effects.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export function detectProject(target) {
  const abs = target

  const info = {
    exists: false,
    hasPackageJson: false,
    isMonorepo: false,
    framework: 'unknown',
    packageManager: 'unknown',
    hasGit: existsSync(join(abs, '.git')),
    name: undefined,
    dependencies: {},
  }

  try {
    statSync(join(abs, 'package.json'))
    info.exists = true
    info.hasPackageJson = true

    const pkg = JSON.parse(readFileSync(join(abs, 'package.json'), 'utf-8'))
    info.name = pkg.name
    info.dependencies = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }

    // Package manager: prefer lockfile presence
    if (existsSync(join(abs, 'pnpm-lock.yaml'))) info.packageManager = 'pnpm'
    else if (existsSync(join(abs, 'yarn.lock'))) info.packageManager = 'yarn'
    else if (existsSync(join(abs, 'package-lock.json'))) info.packageManager = 'npm'

    // Monorepo markers
    info.isMonorepo = Boolean(
      pkg.workspaces
      || existsSync(join(abs, 'pnpm-workspace.yaml'))
      || existsSync(join(abs, 'turbo.json'))
      || existsSync(join(abs, 'nx.json')),
    )

    // Framework detection
    const deps = info.dependencies
    if (deps.vue || deps['@vue/runtime-core'] || deps.nuxt) info.framework = 'vue'
    else if (deps.react || deps.next) info.framework = 'react'
    else if (deps.express || deps.fastify || deps.koa || deps.hapi) info.framework = 'node'
    else info.framework = 'node'
  } catch {
    // No package.json or unreadable
  }

  return info
}
