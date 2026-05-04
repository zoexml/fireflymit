export const avatarProps = {
  /** 图片地址 */
  src: { type: String, default: '' },
  /** 用户名 */
  name: { type: String, default: '' },
  /** 尺寸（px） */
  size: { type: Number, default: 40 },
  /** 占位符背景色，为空时随机生成 */
  backgroundColor: { type: String, default: '' },
  /** 形状 */
  shape: { type: String as () => 'square' | 'circle', default: 'square' },
} as const

export type AvatarShape = 'square' | 'circle'
