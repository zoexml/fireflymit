import type { Component, VNode } from 'vue'
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

export const componentMap: Record<string, Component> = {
  input: ElInput,
  inputTag: ElInputNumber,
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
} as const

export type ComponentMapKey = keyof typeof componentMap

// 表单项配置
export interface SearchFormItem {
  /** 表单项的唯一标识 */
  key: string
  /** 表单项的标签文本或自定义渲染函数 */
  label: string | (() => VNode) | Component
  /** 表单项标签的宽度，会覆盖 Form 的 labelWidth */
  labelWidth?: string | number
  /** 表单项类型，支持预定义的组件类型 */
  type?: ComponentMapKey | string
  /** 自定义渲染函数或组件，用于渲染自定义组件（优先级高于 type） */
  render?: (() => VNode) | Component
  /** 是否隐藏该表单项 */
  hidden?: boolean
  /** 表单项占据的列宽，基于24格栅格系统 */
  span?: number
  /** 选项数据，用于 select、checkbox-group、radio-group 等 */
  options?: Record<string, any>
  /** 传递给表单项组件的属性 */
  props?: Record<string, any>
  /** 表单项的插槽配置 */
  slots?: Record<string, (() => any) | undefined>
  /** 表单项的占位符文本 */
  placeholder?: string
  /** 更多属性配置请参考 ElementPlus 官方文档 */
}

// 表单配置
export interface SearchBarProps {
  /** 表单项配置数组 */
  items?: SearchFormItem[]
  /** 每列的宽度（基于 24 格布局） */
  span?: number
  /** 表单控件间隙 */
  gutter?: number
  /** 展开/收起 */
  isExpand?: boolean
  /** 默认是否展开（仅在 showExpand 为 true 且 isExpand 为 false 时生效） */
  defaultExpanded?: boolean
  /** 表单域标签的位置 */
  labelPosition?: 'left' | 'right' | 'top'
  /** 文字宽度 */
  labelWidth?: string | number
  /** 是否需要展示展开/收起按钮 */
  showExpand?: boolean
  /** 按钮靠左对齐限制（表单项小于等于该值时） */
  buttonLeftLimit?: number
  /** 是否显示重置按钮 */
  showReset?: boolean
  /** 是否显示搜索按钮 */
  showSearch?: boolean
  /** 是否禁用搜索按钮 */
  disabledSearch?: boolean
  /** 搜索时是否清洗空值 */
  sanitizeOutput?: Partial<SanitizeOutputOptions>
  /** 展开/收起按钮文本（展开） */
  expandText?: string
  /** 展开/收起按钮文本（收起） */
  collapseText?: string
  /** 重置按钮文本 */
  resetText?: string
  /** 搜索按钮文本 */
  searchText?: string
}

export interface SanitizeOutputOptions {
  /** 移除空字符串 */
  removeEmptyString: boolean
  /** 移除空数组 */
  removeEmptyArray: boolean
  /** 移除清洗后为空的对象 */
  removeEmptyObject: boolean
  /** 移除空富文本占位内容，如 <p><br></p> */
  removeEmptyRichText: boolean
  /** 保留数字 0 这类有效筛选值 */
  keepZero: boolean
  /** 保留 false 这类有效筛选值 */
  keepFalse: boolean
}

export interface SearchBarEmits {
  reset: []
  search: [Record<string, any>]
}
