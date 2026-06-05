import type { Component, VNodeChild } from 'vue'
import {
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTreeSelect,
} from 'element-plus'
import { toRaw } from 'vue'

export const formComponentMap: Record<string, Component> = {
  input: ElInput,
  number: ElInputNumber,
  select: ElSelect,
  switch: ElSwitch,
  checkbox: ElCheckbox,
  checkboxgroup: ElCheckboxGroup,
  radiogroup: ElRadioGroup,
  date: ElDatePicker,
  daterange: ElDatePicker,
  datetime: ElDatePicker,
  datetimerange: ElDatePicker,
  rate: ElRate,
  slider: ElSlider,
  cascader: ElCascader,
  timepicker: ElTimePicker,
  timeselect: ElTimeSelect,
  treeselect: ElTreeSelect,
}

export interface FormItemLike {
  type?: string
  props?: Record<string, unknown>
  slots?: Record<string, (() => any) | undefined>
  hidden?: boolean
  render?: Component | (() => VNodeChild)
}

const ROOT_PROPS = ['label', 'labelWidth', 'key', 'type', 'hidden', 'span', 'slots', 'render']

export const getFormItemProps = (item: FormItemLike): Record<string, any> => {
  if (item.props) return item.props
  const itemProps = { ...item } as Record<string, any>
  ROOT_PROPS.forEach(key => delete itemProps[key])
  return itemProps
}

export const getFormItemSlots = (item: FormItemLike): Record<string, () => VNodeChild> => {
  if (!item.slots) return {}
  const validSlots: Record<string, () => VNodeChild> = {}
  Object.entries(item.slots).forEach(([key, slotFn]) => {
    if (slotFn) validSlots[key] = slotFn
  })
  return validSlots
}

export const getFormItemComponent = (item: FormItemLike): Component => {
  if (item.render) return item.render as Component
  const { type } = item
  return (formComponentMap[type as keyof typeof formComponentMap] as Component) || formComponentMap.input as Component
}

export interface SanitizeOptions {
  removeEmptyString?: boolean
  removeEmptyArray?: boolean
  removeEmptyObject?: boolean
  removeEmptyRichText?: boolean
  keepZero?: boolean
  keepFalse?: boolean
}

const isRichTextEmpty = (value: string) => {
  if (/<(?:img|video|audio|iframe|embed|object)\b/i.test(value)) return false
  return value
    .replace(/&nbsp;/gi, '')
    .replace(/<br\s*\/?>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim() === ''
}

export const sanitizeFormOutput = (value: unknown, options: SanitizeOptions): unknown => {
  if (Array.isArray(value)) {
    const sanitized = value.map(item => sanitizeFormOutput(item, options)).filter(item => item !== undefined)
    return sanitized.length === 0 && options.removeEmptyArray ? undefined : sanitized
  }

  if (value && typeof value === 'object') {
    const raw = toRaw(value) as Record<string, unknown>
    const sanitized = Object.entries(raw).reduce<Record<string, unknown>>((acc, [key, item]) => {
      const clean = sanitizeFormOutput(item, options)
      if (clean !== undefined) acc[key] = clean
      return acc
    }, {})
    return Object.keys(sanitized).length === 0 && options.removeEmptyObject ? undefined : sanitized
  }

  if (typeof value === 'string') {
    if (options.removeEmptyString && value.trim() === '') return undefined
    if (options.removeEmptyRichText && isRichTextEmpty(value)) return undefined
    return value
  }

  if (value === 0) return options.keepZero ? value : undefined
  if (value === false) return options.keepFalse ? value : undefined

  return value ?? undefined
}

const DEEP_CLONE_MAX_DEPTH = 20

export const deepCloneModelValue = (value: unknown, depth = 0): unknown => {
  if (depth > DEEP_CLONE_MAX_DEPTH) return value

  if (Array.isArray(value)) return value.map(item => deepCloneModelValue(item, depth + 1))

  if (value && typeof value === 'object') {
    const raw = toRaw(value) as Record<string, unknown>
    return Object.keys(raw).reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = deepCloneModelValue(raw[key], depth + 1)
      return acc
    }, {})
  }

  return value
}

export const defaultSanitizeOptions: SanitizeOptions = {
  removeEmptyString: true,
  removeEmptyArray: true,
  removeEmptyObject: true,
  removeEmptyRichText: true,
  keepZero: true,
  keepFalse: true,
}
