import type { VNode } from 'vue'

// 表单项配置
export interface SearchFormItem {
  /** 表单项的唯一标识 */
  key: string
  /** 表单项的标签文本 */
  label: string
  /** 表单项标签的宽度，会覆盖 Form 的 labelWidth */
  labelWidth?: string | number
  /** 表单项类型，可以是预定义的字符串类型或自定义组件 */
  type: keyof typeof componentMap | string | (() => VNode)
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
  /** 表单数据 */
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
  /** 是否需要展示，收起 */
  showExpand?: boolean
  /** 按钮靠左对齐限制（表单项小于等于该值时） */
  buttonLeftLimit?: number
  /** 是否显示重置按钮 */
  showReset?: boolean
  /** 是否显示搜索按钮 */
  showSearch?: boolean
  /** 是否禁用搜索按钮 */
  disabledSearch?: boolean
}

export interface SearchBarEmits {
  reset: []
  search: []
}

// 对应组件映射
export const componentMap = {
  input: 'ElInput',
  number: 'ElInputNumber',
  select: 'ElSelect',
  switch: 'ElSwitch',
  checkbox: 'ElCheckbox',
  checkboxgroup: 'ElCheckboxGroup',
  radiogroup: 'ElRadioGroup',
  date: 'ElDatePicker',
  daterange: 'ElDatePicker',
  datetime: 'ElDatePicker',
  datetimerange: 'ElDatePicker',
  rate: 'ElRate',
  slider: 'ElSlider',
  cascader: 'ElCascader',
  timepicker: 'ElTimePicker',
  timeselect: 'ElTimeSelect',
  treeselect: 'ElTreeSelect',
} as const
