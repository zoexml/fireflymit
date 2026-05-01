import type { TransitionPresets } from '@vueuse/core'
import type { ExtractPropTypes } from 'vue'

export const countToProps = {
  target: { type: Number, default: 0 },
  duration: { type: Number, default: 2000 },
  autoStart: { type: Boolean, default: true },
  decimals: { type: Number, default: 0 },
  decimal: { type: String, default: '.' },
  separator: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  easing: {
    type: String as () => keyof typeof TransitionPresets,
    default: 'easeOutExpo',
  },
  disabled: { type: Boolean, default: false },
} as const

export type CountToProps = ExtractPropTypes<typeof countToProps>
