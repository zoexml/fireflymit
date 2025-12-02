import type { ExtractPropTypes, PropType } from 'vue'

export type BadgeType = 'primary' | 'success' | 'info' | 'warning' | 'error'

// 定义所需的基本props属性
export const badgeProps = {
  type: {
    type: String as PropType<BadgeType>,
    default: 'primary',
  },
  text: {
    type: String,
    default: '',
  },
} as const

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
