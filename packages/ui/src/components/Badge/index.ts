import { withInstall } from '~/_utils'
import _Badge from './Badge.vue'

// 类型导出
export type { ArtBadgeProps } from './types'
export const Badge = withInstall(_Badge)

// 添加类型, 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    ArtBadge: typeof Badge
  }
}
