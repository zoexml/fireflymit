<!-- 表格搜索组件 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { SearchBarEmits, SearchBarProps } from './SearchBar.types'
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
import SvgIcon from '../SvgIcon/SvgIcon.vue'

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

const [className] = createNamespace('search-bar')

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 500)

const formInstance = useTemplateRef<FormInstance>('formRef')
const modelValue = defineModel<Record<string, any>>({ default: {} })
const initialModelValue = ref<Record<string, any>>({})

initialModelValue.value = deepCloneModelValue(modelValue.value) as Record<string, any>

/**
 * 是否展开状态
 */
const isExpanded = ref(props.defaultExpanded)

const sanitizeOutputOptions = computed(() => ({
  ...defaultSanitizeOptions,
  ...props.sanitizeOutput,
}))

/**
 * 获取列宽 span 值（简易响应式降级）
 */
const getColSpan = (itemSpan: number | undefined): number => {
  return itemSpan ?? props.span
}

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

const getSanitizedOutput = () => {
  return (sanitizeFormOutput(deepCloneModelValue(modelValue.value), sanitizeOutputOptions.value) || {}) as Record<string, any>
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
  return !props.isExpand && props.showExpand && filteredItems.length > Math.floor(24 / props.span) - 1
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
  formInstance.value?.resetFields()

  Object.keys(modelValue.value).forEach((key) => {
    delete modelValue.value[key]
  })
  Object.assign(modelValue.value, deepCloneModelValue(initialModelValue.value) as Record<string, any>)

  emit('reset')
}

/**
 * 处理搜索事件
 */
const handleSearch = () => {
  emit('search', getSanitizedOutput())
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
                <SvgIcon :icon="isExpanded ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'" />
              </div>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </ElForm>
  </section>
</template>

<style lang="scss" scoped>
.ffm-search-bar {
  padding: 15px 20px 0;
  background-color: var(--ffm-main-bg-color, #f7f8fa);
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
        color: var(--el-color-primary-light-3, #79bbff);
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

@media (width <= 768px) {
  .ffm-search-bar {
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
