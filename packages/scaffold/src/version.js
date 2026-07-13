import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
let cached = null

export function getVersion() {
  if (cached) return cached
  try {
    const pkg = JSON.parse(readFileSync(join(here, '..', 'package.json'), 'utf-8'))
    cached = pkg.version
  } catch {
    cached = '0.0.0'
  }
  return cached
}

export const version = getVersion()
