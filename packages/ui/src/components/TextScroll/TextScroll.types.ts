import type { ExtractPropTypes } from 'vue'

export type TextScrollTheme
  = | 'theme'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'

export type TextScrollDirection = 'left' | 'right' | 'up' | 'down'

export const textScrollProps = {
  /** 滚动文本内容 */
  text: { type: String, default: '' },
  /** 主题类型 */
  type: {
    type: String as () => TextScrollTheme,
    default: 'theme',
  },
  /** 滚动方向 */
  direction: {
    type: String as () => TextScrollDirection,
    default: 'left',
  },
  /** 滚动速度，单位：像素/秒 */
  speed: { type: Number, default: 80 },
  /** 容器宽度 */
  width: { type: String, default: '100%' },
  /** 容器高度 */
  height: { type: String, default: '36px' },
  /** 鼠标悬停时是否暂停滚动 */
  pauseOnHover: { type: Boolean, default: true },
  /** 是否显示关闭按钮 */
  showClose: { type: Boolean, default: false },
  /** 始终滚动（即使文字未溢出） */
  alwaysScroll: { type: Boolean, default: true },
} as const

export type TextScrollProps = ExtractPropTypes<typeof textScrollProps>
