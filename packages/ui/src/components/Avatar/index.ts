import { withInstall } from '~/_utils'
import _Avatar from './Avatar.vue'

export const Avatar = withInstall(_Avatar)
export default Avatar

export * from './Avatar.types'

declare module 'vue' {
  export interface GlobalComponents {
    Avatar: typeof Avatar
  }
}
