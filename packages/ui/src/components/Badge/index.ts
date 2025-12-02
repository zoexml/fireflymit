import { withInstall } from '~/_utils'
import _Badge from './Badge.vue'

export const Badge = withInstall(_Badge)
export default Badge

export * from './Badge.types'

// 添加类型, 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    ArtBadge: typeof Badge
  }
}
