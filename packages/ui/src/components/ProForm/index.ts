import { withInstall } from '~/_utils'
import _ProForm from './ProForm.vue'

export type { FormEmits, FormItem, FormProps } from './ProForm.types'

export const ProForm = withInstall(_ProForm)
export default ProForm

declare module 'vue' {
  export interface GlobalComponents {
    ProForm: typeof ProForm
  }
}
