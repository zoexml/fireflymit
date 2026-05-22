import { withInstall } from '~/_utils'
import _Upload from './Upload.vue'

export const Upload = withInstall(_Upload)
export default Upload

export * from './Upload.types'

declare module 'vue' {
  export interface GlobalComponents {
    Upload: typeof Upload
  }
}
