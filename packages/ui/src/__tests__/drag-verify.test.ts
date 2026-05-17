import { describe, expect, it } from 'vitest'
import { dragVerifyProps } from '../components/DragVerify/DragVerify.types'
import { getDragTrackWidth, toCssLength } from '../components/DragVerify/DragVerify.utils'

describe('drag verify sizing', () => {
  it('accepts percentage widths', () => {
    expect(dragVerifyProps.width.type).toEqual([Number, String])
    expect(toCssLength('100%')).toBe('100%')
  })

  it('keeps numeric width compatible with pixel sizing', () => {
    expect(toCssLength(250)).toBe('250px')
    expect(toCssLength('320px')).toBe('320px')
  })

  it('uses rendered element width for responsive drag math', () => {
    const element = { clientWidth: 480 } as HTMLElement

    expect(getDragTrackWidth('100%', element)).toBe(480)
    expect(getDragTrackWidth(320, element)).toBe(320)
  })
})
