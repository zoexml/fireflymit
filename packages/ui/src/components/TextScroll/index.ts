import { withInstall } from '~/_utils'
import _TextScroll from './TextScroll.vue'

export type { TextScrollDirection, TextScrollProps, TextScrollTheme } from './TextScroll.types'

export const TextScroll = withInstall(_TextScroll)
export default TextScroll

declare module 'vue' {
  export interface GlobalComponents {
    TextScroll: typeof TextScroll
  }
}
