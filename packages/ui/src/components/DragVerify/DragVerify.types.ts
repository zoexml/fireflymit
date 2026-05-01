import type { ExtractPropTypes, PropType } from 'vue'

export const dragVerifyProps = {
  modelValue: { type: Boolean, default: false },
  width: { type: [Number, String] as PropType<number | string>, default: '100%' },
  height: { type: Number, default: 40 },
  text: { type: String, default: '按住滑块拖动' },
  successText: { type: String, default: 'success' },
  background: { type: String, default: '#eee' },
  progressBarBg: { type: String, default: '#1385FF' },
  completedBg: { type: String, default: '#57D187' },
  circle: { type: Boolean, default: false },
  radius: { type: String, default: 'calc(var(--custom-radius) / 3 + 2px)' },
  handlerIcon: { type: String, default: 'solar:double-alt-arrow-right-linear' },
  successIcon: { type: String, default: 'ri:check-fill' },
  handlerBg: { type: String, default: '#fff' },
  textSize: { type: String, default: '13px' },
  textColor: { type: String, default: '#333' },
} as const

export type DragVerifyProps = ExtractPropTypes<typeof dragVerifyProps>
