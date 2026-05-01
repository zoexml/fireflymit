import { withInstall } from '~/_utils'
import _DragVerify from './DragVerify.vue'

export const DragVerify = withInstall(_DragVerify)
export default DragVerify

export * from './DragVerify.types'

declare module 'vue' {
  export interface GlobalComponents {
    DragVerify: typeof DragVerify
  }
}
