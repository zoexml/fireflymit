import type { ExtractPropTypes, PropType } from 'vue'
import type { FormItem, SanitizeOutputOptions } from '../ProForm/ProForm.types'

export type FormSubmitHandler = (values: Record<string, any>) => Promise<void> | void

export interface FormPanelExpose {
  validate: (...args: any[]) => Promise<boolean> | boolean | void
  reset: () => void
  getOutput: () => Record<string, any>
}

export const dialogFormProps = {
  cancelText: { type: String, default: '取消' },
  closeOnSuccess: { type: Boolean, default: true },
  destroyOnClose: { type: Boolean, default: false },
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
  span: { type: Number, default: 24 },
  submit: { type: Function as PropType<FormSubmitHandler> },
  submitText: { type: String, default: '确定' },
  title: { type: String, default: '' },
  width: { type: [String, Number] as PropType<string | number>, default: '560px' },
} as const

export type DialogFormProps = ExtractPropTypes<typeof dialogFormProps>

export interface DialogFormEmits {
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
