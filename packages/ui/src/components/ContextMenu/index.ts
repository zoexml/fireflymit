import { withInstall } from '~/_utils'
import _ContextMenu from './ContextMenu.vue'

export const ContextMenu = withInstall(_ContextMenu)
export default ContextMenu

export * from './ContextMenu.types'

declare module 'vue' {
  export interface GlobalComponents {
    ContextMenu: typeof ContextMenu
  }
}
