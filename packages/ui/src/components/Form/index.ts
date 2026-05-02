import { withInstall } from '~/_utils'
import _ArtForm from './Form.vue'

export type { FormEmits, FormItem, FormProps } from './Form.types'

export const ArtForm = withInstall(_ArtForm)
export default ArtForm

declare module 'vue' {
  export interface GlobalComponents {
    ArtForm: typeof ArtForm
  }
}
