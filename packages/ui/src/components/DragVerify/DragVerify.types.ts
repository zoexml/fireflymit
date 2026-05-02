import type { ExtractPropTypes } from 'vue'

export const dragVerifyProps = {
  modelValue: { type: Boolean, default: false },
  width: { type: Number, default: 250 },
  height: { type: Number, default: 40 },
  text: { type: String, default: '请按住滑块拖动' },
  successText: { type: String, default: '验证通过' },
  background: { type: String, default: '#eee' },
  progressBarBg: { type: String, default: '#1385FF' },
  completedBg: { type: String, default: '#57D187' },
  circle: { type: Boolean, default: false },
  radius: { type: String, default: '10px' },
  handlerIcon: { type: String, default: 'solar:double-alt-arrow-right-linear' },
  successIcon: { type: String, default: 'ri:check-fill' },
  handlerBg: { type: String, default: '#fff' },
  textSize: { type: String, default: '14px' },
  textColor: { type: String, default: '#333' },
  border: { type: String, default: '1px solid #ddd' },
} as const

export type DragVerifyProps = ExtractPropTypes<typeof dragVerifyProps>
