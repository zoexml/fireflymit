<!-- 表单组件 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FormEmits, FormItem } from './ProForm.types'
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
import { formProps } from './ProForm.types'

defineOptions({ name: 'ProForm' })

const props = defineProps(formProps)
const emit = defineEmits<FormEmits>()

const [className, bem] = createNamespace('form')

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

const PATH_NUMBER_RE = /^\d+$/

// 兼容 a.b、a.0.b 这类路径写法，数字段会被当作数组索引处理
const parsePath = (path: string) => {
  return path
    .split('.')
    .filter(Boolean)
    .map(segment => (PATH_NUMBER_RE.test(segment) ? Number(segment) : segment))
}

const getFieldValue = (path: string) => {
  return parsePath(path).reduce<any>((currentValue, segment) => {
    if (currentValue == null) return undefined
    return currentValue[segment]
  }, modelValue.value)
}

// 清空字段时只删除路径的最后一段，避免误删同级数据
const deleteFieldValue = (path: string) => {
  const segments = parsePath(path)
  if (!segments.length) return

  const lastSegment = segments.pop()
  const parent = segments.reduce<any>((currentValue, segment) => {
    if (currentValue == null) return undefined
    return currentValue[segment]
  }, modelValue.value)

  if (parent != null && lastSegment !== undefined) {
    delete parent[lastSegment]
  }
}

// 表单值设置，支持嵌套路径，自动补齐中间对象或数组
const setFieldValue = (path: string, value: unknown) => {
  const normalizedValue = value === '' ? undefined : value
  const segments = parsePath(path)

  if (!segments.length) return

  if (normalizedValue === undefined) {
    deleteFieldValue(path)
    return
  }

  let currentValue: any = modelValue.value

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1

    if (isLast) {
      currentValue[segment] = normalizedValue
      return
    }

    const nextSegment = segments[index + 1]
    const nextContainer = typeof nextSegment === 'number' ? [] : {}

    if (
      currentValue[segment] === null
      || currentValue[segment] === undefined
      || typeof currentValue[segment] !== 'object'
    ) {
      currentValue[segment] = nextContainer
    }

    currentValue = currentValue[segment]
  })
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

// 提交时按配置清洗空值
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

const getProps = (item: FormItem) => {
  if (item.props) return item.props
  const itemProps = { ...item }
  rootProps.forEach(key => delete (itemProps as Record<string, any>)[key])
  return itemProps
}

// 获取插槽
const getSlots = (item: FormItem) => {
  if (!item.slots) return {}
  const validSlots: Record<string, () => any> = {}
  Object.entries(item.slots).forEach(([key, slotFn]) => {
    if (slotFn) {
      validSlots[key] = slotFn
    }
  })
  return validSlots
}

// 组件
const getComponent = (item: FormItem) => {
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
  return props.items.filter(item => !item.hidden)
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
 * 获取列宽 span 值
 */
const getColSpan = (itemSpan: number | undefined): number => {
  return itemSpan ?? props.span
}

/**
 * 处理重置事件
 */
const handleReset = () => {
  formInstance.value?.resetFields()

  Object.keys(modelValue.value).forEach((key) => {
    delete modelValue.value[key]
  })
  Object.assign(modelValue.value, cloneModelValue(initialModelValue.value))

  emit('reset')
}

/**
 * 处理提交事件
 */
const handleSubmit = () => {
  emit('submit', getSanitizedOutput())
}

defineExpose({
  ref: formInstance,
  validate: (...args: any[]) => formInstance.value?.validate(...args),
  reset: handleReset,
  getOutput: getSanitizedOutput,
})

// 解构 props 以便在模板中直接使用
const { span, gutter, labelPosition, labelWidth } = toRefs(props)
</script>

<template>
  <section :class="className">
    <ElForm ref="formRef" :model="modelValue" :label-position="labelPosition" v-bind="{ ...$attrs }">
      <ElRow :class="bem('__row')" :gutter="gutter">
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
        <ElCol :xs="24" :sm="24" :md="span" :lg="span" :xl="span" :class="bem('__action')">
          <div :class="bem('__action-buttons')" :style="actionButtonsStyle">
            <div :class="bem('__buttons')">
              <ElButton v-if="showReset" class="reset-button" @click="handleReset">
                {{ resetText }}
              </ElButton>
              <ElButton
                v-if="showSubmit"
                type="primary"
                class="submit-button"
                :disabled="disabledSubmit"
                @click="handleSubmit"
              >
                {{ submitText }}
              </ElButton>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </ElForm>
  </section>
</template>

<style lang="scss" scoped>
.art-form {
  padding: 1rem 1rem 0;
  background-color: var(--art-main-bg-color, #fff);
  border-radius: calc(var(--custom-radius, 4px) / 2 + 2px);

  &__row {
    display: flex;
    flex-wrap: wrap;
  }

  &__action {
    max-width: 100%;
    flex: 1;
  }

  &__action-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 12px;
  }

  &__buttons {
    display: flex;
    gap: 8px;
  }
}

// 响应式优化
@media (width <= 768px) {
  .art-form {
    padding: 16px 16px 0;

    &__action-buttons {
      flex-direction: column;
      gap: 8px;
      align-items: stretch;

      .art-form__buttons {
        justify-content: center;
      }
    }
  }
}
</style>
