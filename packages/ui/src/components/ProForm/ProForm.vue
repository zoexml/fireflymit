<!-- 表单组件 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FormEmits } from './ProForm.types'
import { useWindowSize } from '@vueuse/core'
import {
  ElButton,
  ElCheckbox,
  ElCol,
  ElForm,
  ElFormItem,
  ElOption,
  ElRadio,
  ElRow,
} from 'element-plus'
import { computed, ref, toRefs, useTemplateRef } from 'vue'
import { createNamespace } from '~/_utils'
import {
  deepCloneModelValue,
  defaultSanitizeOptions,
  getFormItemComponent,
  getFormItemProps,
  getFormItemSlots,
  sanitizeFormOutput,
} from '~/_utils/form-helpers'
import { formProps } from './ProForm.types'

defineOptions({ name: 'ProForm' })

const props = defineProps(formProps)
const emit = defineEmits<FormEmits>()

const [className, bem] = createNamespace('form')

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 500)

const formInstance = useTemplateRef<FormInstance>('formRef')
const modelValue = defineModel<Record<string, any>>({ default: {} })
const initialModelValue = ref<Record<string, any>>({})

initialModelValue.value = deepCloneModelValue(modelValue.value) as Record<string, any>

const sanitizeOutputOptions = computed(() => ({
  ...defaultSanitizeOptions,
  ...props.sanitizeOutput,
}))

const PATH_NUMBER_RE = /^\d+$/

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

const getSanitizedOutput = () => {
  return (sanitizeFormOutput(deepCloneModelValue(modelValue.value), sanitizeOutputOptions.value) || {}) as Record<string, any>
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
  Object.assign(modelValue.value, deepCloneModelValue(initialModelValue.value) as Record<string, any>)

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
          <ElFormItem :prop="item.key" :label-width="item.label ? item.labelWidth || labelWidth : undefined">
            <template v-if="item.label" #label>
              <component :is="item.label" v-if="typeof item.label !== 'string'" />
              <span v-else>{{ item.label }}</span>
            </template>
            <slot :name="item.key" :item="item" :modelValue="modelValue">
              <component
                :is="getFormItemComponent(item)"
                :model-value="getFieldValue(item.key)"
                v-bind="getFormItemProps(item)"
                @update:model-value="setFieldValue(item.key, $event)"
              >
                <template v-if="item.type === 'select' && getFormItemProps(item)?.options">
                  <ElOption v-for="option in getFormItemProps(item).options" v-bind="option" :key="option.value" />
                </template>

                <template v-if="item.type === 'checkboxgroup' && getFormItemProps(item)?.options">
                  <ElCheckbox v-for="option in getFormItemProps(item).options" v-bind="option" :key="option.value" />
                </template>

                <template v-if="item.type === 'radiogroup' && getFormItemProps(item)?.options">
                  <ElRadio v-for="option in getFormItemProps(item).options" v-bind="option" :key="option.value" />
                </template>

                <template v-for="(slotFn, slotName) in getFormItemSlots(item)" :key="slotName" #[slotName]>
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
.ffm-form {
  padding: 1rem 1rem 0;
  background-color: var(--ffm-main-bg-color, #f7f8fa);
  border-radius: calc(var(--custom-radius, 4px) / 2 + 2px);

  &__row {
    display: flex;
    flex-wrap: wrap;
  }

  &__action {
    flex: 1;
    max-width: 100%;
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

@media (width <= 768px) {
  .ffm-form {
    padding: 16px 16px 0;

    &__action-buttons {
      flex-direction: column;
      gap: 8px;
      align-items: stretch;

      .ffm-form__buttons {
        justify-content: center;
      }
    }
  }
}
</style>
