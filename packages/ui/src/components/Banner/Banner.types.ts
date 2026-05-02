import type { ExtractPropTypes } from 'vue'

export interface BannerButtonConfig {
  /** 是否启用按钮 */
  show: boolean
  /** 按钮文本 */
  text: string
  /** 按钮背景色 */
  color?: string
  /** 按钮文字颜色 */
  textColor?: string
  /** 按钮圆角大小 */
  radius?: string
}

export interface BannerMeteorConfig {
  /** 是否启用流星效果 */
  enabled: boolean
  /** 流星数量 */
  count?: number
}

export interface BannerImageConfig {
  /** 图片源地址 */
  src: string
  /** 图片宽度 */
  width?: string
  /** 距底部距离 */
  bottom?: string
  /** 距右侧距离 */
  right?: string
}

export interface BannerMeteor {
  x: number
  speed: number
  delay: number
}

export const bannerProps = {
  /** 横幅高度 */
  height: { type: String, default: '11rem' },
  /** 标题文本 */
  title: { type: String, default: '' },
  /** 副标题文本 */
  subtitle: { type: String, default: '' },
  /** 自定义 class */
  boxStyle: { type: String, default: '' },
  /** 是否显示装饰效果 */
  decoration: { type: Boolean, default: true },
  /** 按钮配置 */
  buttonConfig: {
    type: Object as () => BannerButtonConfig,
    default: () => ({
      show: true,
      text: '查看',
      color: '#fff',
      textColor: '#333',
      radius: '6px',
    }),
  },
  /** 流星配置 */
  meteorConfig: {
    type: Object as () => BannerMeteorConfig,
    default: () => ({ enabled: false, count: 10 }),
  },
  /** 图片配置 */
  imageConfig: {
    type: Object as () => BannerImageConfig,
    default: () => ({ src: '', width: '12rem', bottom: '-3rem', right: '0' }),
  },
  /** 标题颜色 */
  titleColor: { type: String, default: 'white' },
  /** 副标题颜色 */
  subtitleColor: { type: String, default: 'white' },
  /** 是否暗黑模式 */
  dark: { type: Boolean, default: false },
} as const

export type BannerProps = ExtractPropTypes<typeof bannerProps>
