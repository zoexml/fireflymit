import type { ExtractPropTypes, PropType } from 'vue'
import type { FormPanelExpose, FormSubmitHandler } from '../DialogForm/DialogForm.types'
import type { FormItem, SanitizeOutputOptions } from '../ProForm/ProForm.types'

export const drawerFormProps = {
  cancelText: { type: String, default: '取消' },
  closeOnSuccess: { type: Boolean, default: true },
  destroyOnClose: { type: Boolean, default: false },
  direction: { type: String as PropType<'ltr' | 'rtl' | 'ttb' | 'btt'>, default: 'rtl' },
  disabledSubmit: { type: Boolean, default: false },
  formAttrs: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  gutter: { type: Number, default: 12 },
  items: { type: Array as PropType<FormItem[]>, default: () => [] },
  labelPosition: { type: String as PropType<'left' | 'right' | 'top'>, default: 'right' },
  labelWidth: { type: [String, Number] as PropType<string | number>, default: '70px' },
  resetOnClosed: { type: Boolean, default: true },
  resetText: { type: String, default: '重置' },
  sanitizeOutput: { type: Object as PropType<Partial<SanitizeOutputOptions>>, default: () => ({}) },
  showCancel: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  showReset: { type: Boolean, default: true },
  showSubmit: { type: Boolean, default: true },
  size: { type: [String, Number] as PropType<string | number>, default: '480px' },
  span: { type: Number, default: 24 },
  submit: { type: Function as PropType<FormSubmitHandler> },
  submitText: { type: String, default: '确定' },
  title: { type: String, default: '' },
} as const

export type DrawerFormProps = ExtractPropTypes<typeof drawerFormProps>
export type { FormPanelExpose, FormSubmitHandler }

export interface DrawerFormEmits {
  cancel: []
  close: []
  closed: []
  open: []
  opened: []
  reset: []
  submit: [values: Record<string, any>]
  success: [values: Record<string, any>]
  validateError: [error: unknown]
}
