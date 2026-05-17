import { describe, expect, it } from 'vitest'
import { FireflyMitResolver } from '../resolver'

describe('firefly mit resolver', () => {
  it('resolves library components for auto import plugins', () => {
    const resolver = FireflyMitResolver()

    expect(resolver('Badge')).toEqual({
      name: 'default',
      from: '@fireflymit/ui/es/components/Badge',
      sideEffects: '@fireflymit/ui/dist/index.css',
    })
    expect(resolver('ProTable')).toEqual({
      name: 'default',
      from: '@fireflymit/ui/es/components/ProTable',
      sideEffects: '@fireflymit/ui/dist/index.css',
    })
  })

  it('supports custom component prefix', () => {
    const resolver = FireflyMitResolver({ prefix: 'F' })

    expect(resolver('FBadge')).toEqual({
      name: 'default',
      from: '@fireflymit/ui/es/components/Badge',
      sideEffects: '@fireflymit/ui/dist/index.css',
    })
    expect(resolver('Badge')).toBeUndefined()
  })

  it('can disable style side effects', () => {
    const resolver = FireflyMitResolver({ importStyle: false })

    expect(resolver('Badge')).toEqual({
      name: 'default',
      from: '@fireflymit/ui/es/components/Badge',
      sideEffects: undefined,
    })
  })

  it('ignores unknown components', () => {
    const resolver = FireflyMitResolver()

    expect(resolver('Unknown')).toBeUndefined()
  })
})
