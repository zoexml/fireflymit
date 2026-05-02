<!-- 表格搜索组件 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { SearchBarEmits, SearchBarProps, SearchFormItem } from './types'
import {
  ArrowDownBold,
  ArrowUpBold,
} from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import {
  ElButton,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElRow,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTreeSelect,
} from 'element-plus'
import { computed, ref, toRaw, toRefs, useTemplateRef } from 'vue'
import { createNamespace } from '~/_utils'

defineOptions({ name: 'SearchBar' })

const props = withDefaults(defineProps<SearchBarProps>(), {
  items: () => [],
  span: 6,
  gutter: 12,
  isExpand: false,
  labelPosition: 'right',
  labelWidth: '70px',
  showExpand: true,
  defaultExpanded: false,
  buttonLeftLimit: 2,
  showReset: true,
  showSearch: true,
  disabledSearch: false,
  sanitizeOutput: () => ({}),
  expandText: '展开',
  collapseText: '收起',
  resetText: '重置',
  searchText: '查询',
})

const emit = defineEmits<SearchBarEmits>()

const [className, bem] = createNamespace('search-bar')

const componentMap = {
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

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 500)

const formInstance = useTemplateRef<FormInstance>('formRef')
const modelValue = defineModel<Record<string, any>>({ default: {} })
const initialModelValue = ref<Record<string, any>>({})

// Save form snapshot at initialization for reset restore
const cloneModelValue = (value: Record<string, any> | undefined) => {
  if (!value) return {}

  const deepClone = (source: unknown): unknown => {
    if (Array.isArray(source)) {
      return source.map(item => deepClone(item))
    }

    if (source && typeof source === 'object') {
      const rawSource = toRaw(source)
      return Object.keys(rawSource).reduce<Record<string, unknown>>((accumulator, key) => {
        accumulator[key] = deepClone((rawSource as Record<string, unknown>)[key])
        return accumulator
      }, {})
    }

    return source
  }

  return deepClone(toRaw(value)) as Record<string, any>
}

initialModelValue.value = cloneModelValue(modelValue.value)

/**
 * 是否展开状态
 */
const isExpanded = ref(props.defaultExpanded)

const rootProps = ['label', 'labelWidth', 'key', 'type', 'hidden', 'span', 'slots', 'render']

// Sanitize output options
const sanitizeOutputOptions = computed(() => ({
  removeEmptyString: true,
  removeEmptyArray: true,
  removeEmptyObject: true,
  removeEmptyRichText: true,
  keepZero: true,
  keepFalse: true,
  ...props.sanitizeOutput,
}))

const getProps = (item: SearchFormItem) => {
  if (item.props) return item.props
  const itemProps = { ...item }
  rootProps.forEach(key => delete (itemProps as Record<string, any>)[key])
  return itemProps
}

// 获取插槽
const getSlots = (item: SearchFormItem) => {
  if (!item.slots) return {}
  const validSlots: Record<string, () => any> = {}
  Object.entries(item.slots).forEach(([key, slotFn]) => {
    if (slotFn) {
      validSlots[key] = slotFn
    }
  })
  return validSlots
}

/**
 * 获取列宽 span 值（简易响应式降级）
 */
const getColSpan = (itemSpan: number | undefined): number => {
  const finalSpan = itemSpan ?? props.span
  return finalSpan
}

// 搜索表单清空输入时不保留空字符串
const normalizeFieldValue = (value: unknown) => {
  return value === '' ? undefined : value
}

const getFieldValue = (key: string) => modelValue.value[key]

const setFieldValue = (key: string, value: unknown) => {
  const normalizedValue = normalizeFieldValue(value)

  if (normalizedValue === undefined) {
    delete modelValue.value[key]
    return
  }

  modelValue.value[key] = normalizedValue
}

const isRichTextEmpty = (value: string) => {
  if (/<(?:img|video|audio|iframe|embed|object)\b/i.test(value)) {
    return false
  }

  return (
    value
      .replace(/&nbsp;/gi, '')
      .replace(/<br\s*\/?>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim() === ''
  )
}

// 搜索时按配置清洗空值
const sanitizeOutputValue = (value: unknown): unknown => {
  const options = sanitizeOutputOptions.value

  if (Array.isArray(value)) {
    const sanitizedArray = value
      .map(item => sanitizeOutputValue(item))
      .filter(item => item !== undefined)
    return sanitizedArray.length === 0 && options.removeEmptyArray ? undefined : sanitizedArray
  }

  if (value && typeof value === 'object') {
    const rawValue = toRaw(value)
    const sanitizedObject = Object.entries(rawValue).reduce<Record<string, unknown>>(
      (accumulator, [key, item]) => {
        const sanitizedItem = sanitizeOutputValue(item)
        if (sanitizedItem !== undefined) {
          accumulator[key] = sanitizedItem
        }
        return accumulator
      },
      {},
    )
    return Object.keys(sanitizedObject).length === 0 && options.removeEmptyObject
      ? undefined
      : sanitizedObject
  }

  if (typeof value === 'string') {
    if (options.removeEmptyString && value.trim() === '') {
      return undefined
    }
    if (options.removeEmptyRichText && isRichTextEmpty(value)) {
      return undefined
    }
    return value
  }

  if (value === 0) {
    return options.keepZero ? value : undefined
  }

  if (value === false) {
    return options.keepFalse ? value : undefined
  }

  return value ?? undefined
}

const getSanitizedOutput = () => {
  return (sanitizeOutputValue(cloneModelValue(modelValue.value)) || {}) as Record<string, any>
}

// 组件
const getComponent = (item: SearchFormItem) => {
  // 优先使用 render 函数或组件渲染自定义组件
  if (item.render) {
    return item.render
  }
  const { type } = item
  return componentMap[type as keyof typeof componentMap] || componentMap.input
}

/**
 * 可见的表单项
 */
const visibleFormItems = computed(() => {
  const filteredItems = props.items.filter(item => !item.hidden)
  const shouldShowLess = !props.isExpand && !isExpanded.value
  if (shouldShowLess) {
    const maxItemsPerRow = Math.floor(24 / props.span) - 1
    return filteredItems.slice(0, maxItemsPerRow)
  }
  return filteredItems
})

/**
 * 是否应该显示展开/收起按钮
 */
const shouldShowExpandToggle = computed(() => {
  const filteredItems = props.items.filter(item => !item.hidden)
  return (
    !props.isExpand && props.showExpand && filteredItems.length > Math.floor(24 / props.span) - 1
  )
})

/**
 * 展开/收起按钮文本
 */
const expandToggleText = computed(() => {
  return isExpanded.value ? props.collapseText : props.expandText
})

/**
 * 操作按钮样式
 */
const actionButtonsStyle = computed(() => ({
  'justify-content': isMobile.value
    ? 'flex-end'
    : props.items.filter(item => !item.hidden).length <= props.buttonLeftLimit
      ? 'flex-start'
      : 'flex-end',
}))

/**
 * 切换展开/收起状态
 */
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

/**
 * 处理重置事件
 */
const handleReset = () => {
  // 重置表单字段（UI 层）
  formInstance.value?.resetFields()

  // 恢复初始表单值，保留默认搜索条件
  Object.keys(modelValue.value).forEach((key) => {
    delete modelValue.value[key]
  })
  Object.assign(modelValue.value, cloneModelValue(initialModelValue.value))

  // 触发 reset 事件
  emit('reset')
}

/**
 * 处理搜索事件
 */
const handleSearch = () => {
  // 对外只抛出清洗后的查询参数
  emit('search', getSanitizedOutput())
}

defineExpose({
  ref: formInstance,
  validate: (...args: any[]) => formInstance.value?.validate(...args),
  reset: handleReset,
  // 允许外部在手动组装请求前直接读取清洗后的参数
  getOutput: getSanitizedOutput,
})

// 解构 props 以便在模板中直接使用
const { span, gutter, labelPosition, labelWidth } = toRefs(props)
</script>

<template>
  <section :class="[className, { 'is-expanded': isExpanded }]">
    <ElForm ref="formRef" :model="modelValue" :label-position="labelPosition" v-bind="{ ...$attrs }">
      <ElRow class="search-form-row" :gutter="gutter">
        <ElCol
          v-for="item in visibleFormItems"
          :key="item.key"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="getColSpan(item.span)"
          :xl="getColSpan(item.span)"
        >
          <ElFormItem
            :prop="item.key"
            :label-width="item.label ? item.labelWidth || labelWidth : undefined"
          >
            <template v-if="item.label" #label>
              <component :is="item.label" v-if="typeof item.label !== 'string'" />
              <span v-else>{{ item.label }}</span>
            </template>
            <slot :name="item.key" :item="item" :modelValue="modelValue">
              <component
                :is="getComponent(item)"
                :model-value="getFieldValue(item.key)"
                v-bind="getProps(item)"
                @update:model-value="setFieldValue(item.key, $event)"
              >
                <!-- 下拉选择 -->
                <template v-if="item.type === 'select' && getProps(item)?.options">
                  <ElOption
                    v-for="option in getProps(item).options"
                    v-bind="option"
                    :key="option.value"
                  />
                </template>

                <!-- 复选框组 -->
                <template v-if="item.type === 'checkboxgroup' && getProps(item)?.options">
                  <ElCheckbox
                    v-for="option in getProps(item).options"
                    v-bind="option"
                    :key="option.value"
                  />
                </template>

                <!-- 单选框组 -->
                <template v-if="item.type === 'radiogroup' && getProps(item)?.options">
                  <ElRadio
                    v-for="option in getProps(item).options"
                    v-bind="option"
                    :key="option.value"
                  />
                </template>

                <!-- 动态插槽支持 -->
                <template v-for="(slotFn, slotName) in getSlots(item)" :key="slotName" #[slotName]>
                  <component :is="slotFn" />
                </template>
              </component>
            </slot>
          </ElFormItem>
        </ElCol>
        <ElCol :xs="24" :sm="24" :md="span" :lg="span" :xl="span" class="action-column">
          <div class="action-buttons-wrapper" :style="actionButtonsStyle">
            <div class="form-buttons">
              <ElButton v-if="showReset" class="reset-button" @click="handleReset">
                {{ resetText }}
              </ElButton>
              <ElButton
                v-if="showSearch"
                type="primary"
                class="search-button"
                :disabled="disabledSearch"
                @click="handleSearch"
              >
                {{ searchText }}
              </ElButton>
            </div>
            <div v-if="shouldShowExpandToggle" class="filter-toggle" @click="toggleExpand">
              <span>{{ expandToggleText }}</span>
              <div class="icon-wrapper">
                <ElIcon>
                  <ArrowUpBold v-if="isExpanded" />
                  <ArrowDownBold v-else />
                </ElIcon>
              </div>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </ElForm>
  </section>
</template>

<style lang="scss" scoped>
.art-search-bar {
  padding: 15px 20px 0;
  background-color: var(--art-main-bg-color, #fff);
  border-radius: calc(var(--custom-radius, 4px) / 2 + 2px);

  .search-form-row {
    display: flex;
    flex-wrap: wrap;
  }

  .action-column {
    flex: 1;
    max-width: 100%;

    .action-buttons-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 12px;
    }

    .form-buttons {
      display: flex;
      gap: 8px;
    }

    .filter-toggle {
      display: flex;
      align-items: center;
      margin-left: 10px;
      line-height: 32px;
      color: var(--el-color-primary, #409eff);
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--el-color-primary-light-3, #66b1ff);
      }

      span {
        font-size: 14px;
        user-select: none;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        margin-left: 4px;
        font-size: 14px;
        transition: transform 0.2s ease;
      }
    }
  }
}

// 响应式优化
@media (width <= 768px) {
  .art-search-bar {
    padding: 16px 16px 0;

    .action-column {
      .action-buttons-wrapper {
        flex-direction: column;
        gap: 8px;
        align-items: stretch;

        .form-buttons {
          justify-content: center;
        }

        .filter-toggle {
          justify-content: center;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
