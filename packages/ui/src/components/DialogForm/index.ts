import { withInstall } from '~/_utils'
import _DialogForm from './DialogForm.vue'

export type { DialogFormEmits, DialogFormProps, FormPanelExpose, FormSubmitHandler } from './DialogForm.types'

export const DialogForm = withInstall(_DialogForm)
export default DialogForm

declare module 'vue' {
  export interface GlobalComponents {
    DialogForm: typeof DialogForm
  }
}
