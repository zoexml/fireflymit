import type { ExtractPropTypes } from 'vue'

export interface CardBannerButtonConfig {
  show?: boolean
  text?: string
  color?: string
  textColor?: string
}

export const cardBannerProps = {
  /** 高度 */
  height: { type: String, default: '24rem' },
  /** 图片路径 */
  image: { type: String, default: '' },
  /** 标题文本（必填） */
  title: { type: String, required: true },
  /** 描述文本（必填） */
  description: { type: String, required: true },
  /** 主按钮配置 */
  button: {
    type: Object as () => CardBannerButtonConfig,
    default: () => ({
      show: true,
      text: '查看详情',
      color: 'var(--el-color-primary, #409eff)',
      textColor: '#fff',
    }),
  },
  /** 取消按钮配置 */
  cancelButton: {
    type: Object as () => CardBannerButtonConfig,
    default: () => ({
      show: false,
      text: '取消',
      color: '#f5f5f5',
      textColor: '#666',
    }),
  },
} as const

export type CardBannerProps = ExtractPropTypes<typeof cardBannerProps>
