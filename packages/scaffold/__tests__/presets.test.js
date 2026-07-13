import { describe, expect, it } from 'vitest'
import {
  CONFIGS,
  DEFAULT_PRESET,
  getPreset,
  listConfigs,
  listPresets,
  PRESETS,
  resolvePresetConfigs,
} from '../src/utils/presets.js'

describe('presets', () => {
  it('exposes three built-in presets', () => {
    expect(Object.keys(PRESETS).sort()).toEqual(['basic', 'node-lib', 'vue-monorepo'])
  })

  it('default preset is vue-monorepo', () => {
    expect(DEFAULT_PRESET).toBe('vue-monorepo')
  })

  it('vue-monorepo is marked as monorepo + vue', () => {
    const p = PRESETS['vue-monorepo']
    expect(p.monorepo).toBe(true)
    expect(p.framework).toBe('vue')
    expect(p.configs).toContain('turbo')
    expect(p.configs).toContain('stylelint')
  })

  it('node-lib excludes frontend tooling', () => {
    const p = PRESETS['node-lib']
    expect(p.monorepo).toBe(false)
    expect(p.framework).toBe('node')
    expect(p.configs).not.toContain('stylelint')
    expect(p.configs).not.toContain('turbo')
    expect(p.configs).not.toContain('github-actions')
  })

  it('basic preset has only lint/format/commit', () => {
    const p = PRESETS.basic
    expect(p.configs).toEqual(['eslint', 'prettier', 'commitlint', 'git-hooks'])
  })

  it('every preset config id exists in CONFIGS', () => {
    for (const [name, p] of Object.entries(PRESETS)) {
      for (const id of p.configs) {
        expect(CONFIGS, `preset ${name} references unknown config ${id}`).toHaveProperty(id)
      }
    }
  })

  it('listPresets returns array with id and metadata', () => {
    const list = listPresets()
    expect(list).toHaveLength(3)
    expect(list[0]).toHaveProperty('id')
    expect(list[0]).toHaveProperty('label')
    expect(list[0]).toHaveProperty('description')
  })

  it('listConfigs returns all config ids', () => {
    const ids = listConfigs().map(c => c.id)
    expect(ids).toContain('eslint')
    expect(ids).toContain('turbo')
    expect(ids).toContain('github-actions')
  })

  it('resolvePresetConfigs returns the preset configs by default', () => {
    expect(resolvePresetConfigs('node-lib')).toEqual(PRESETS['node-lib'].configs)
  })

  it('resolvePresetConfigs allows overrides', () => {
    expect(resolvePresetConfigs('node-lib', ['eslint'])).toEqual(['eslint'])
  })

  it('resolvePresetConfigs throws on unknown preset', () => {
    expect(() => resolvePresetConfigs('nope')).toThrow(/Unknown preset/)
  })

  it('getPreset returns preset by id or undefined', () => {
    expect(getPreset('vue-monorepo')).toBe(PRESETS['vue-monorepo'])
    expect(getPreset('nope')).toBeUndefined()
  })
})
