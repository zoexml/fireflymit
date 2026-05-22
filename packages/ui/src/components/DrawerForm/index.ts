import { withInstall } from '~/_utils'
import _DrawerForm from './DrawerForm.vue'

export type { DrawerFormEmits, DrawerFormProps, FormPanelExpose, FormSubmitHandler } from './DrawerForm.types'

export const DrawerForm = withInstall(_DrawerForm)
export default DrawerForm

declare module 'vue' {
  export interface GlobalComponents {
    DrawerForm: typeof DrawerForm
  }
}
