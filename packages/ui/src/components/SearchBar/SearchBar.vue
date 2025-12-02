<!-- 表格搜索组件 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { SearchBarEmits, SearchBarProps, SearchFormItem } from './types'
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
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
import { computed, ref, toRefs, useTemplateRef } from 'vue'

defineOptions({ name: 'ArtSearchBar' })

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
})

const emit = defineEmits<SearchBarEmits>()

const componentMap = {
  input: ElInput, // 输入框
  number: ElInputNumber, // 数字输入框
  select: ElSelect, // 选择器
  switch: ElSwitch, // 开关
  checkbox: ElCheckbox, // 复选框
  checkboxgroup: ElCheckboxGroup, // 复选框组
  radiogroup: ElRadioGroup, // 单选框组
  date: ElDatePicker, // 日期选择器
  daterange: ElDatePicker, // 日期范围选择器
  datetime: ElDatePicker, // 日期时间选择器
  datetimerange: ElDatePicker, // 日期时间范围选择器
  rate: ElRate, // 评分
  slider: ElSlider, // 滑块
  cascader: ElCascader, // 级联选择器
  timepicker: ElTimePicker, // 时间选择器
  timeselect: ElTimeSelect, // 时间选择
  treeselect: ElTreeSelect, // 树选择器
}

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 500)

const formInstance = useTemplateRef<FormInstance>('formRef')
const modelValue = defineModel<Record<string, any>>({ default: {} })

/**
 * 是否展开状态
 */
const isExpanded = ref(props.defaultExpanded)

const rootProps = ['label', 'labelWidth', 'key', 'type', 'hidden', 'span', 'slots']
const getProps = (item: SearchFormItem) => {
  if (item.props) return item.props
  const props = { ...item }
  rootProps.forEach(key => delete (props as Record<string, any>)[key])
  return props
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

// 组件
const getComponent = (item: SearchFormItem) => {
  const { type } = item
  if (type && typeof item.type !== 'string') return type
  // type不传递、默认使用 input
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
  return isExpanded.value ? '收起' : '展开'
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

  // 清空所有表单项值（包含隐藏项）
  Object.assign(
    modelValue.value,
    Object.fromEntries(props.items.map(({ key }) => [key, undefined])),
  )

  // 触发 reset 事件
  emit('reset')
}

/**
 * 处理搜索事件
 */
const handleSearch = () => {
  emit('search')
}

defineExpose({
  ref: formInstance,
  validate: (...args: any[]) => formInstance.value?.validate(...args),
  reset: handleReset,
})

// 解构 props 以便在模板中直接使用
const { span, gutter, labelPosition, labelWidth } = toRefs(props)
</script>

<template>
  <section class="art-search-bar art-custom-card" :class="{ 'is-expanded': isExpanded }">
    <ElForm ref="formRef" :model="modelValue" :label-position="labelPosition" v-bind="{ ...$attrs }">
      <ElRow class="search-form-row" :gutter="gutter">
        <ElCol
          v-for="item in visibleFormItems"
          :key="item.key"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="item.span || span"
          :xl="item.span || span"
        >
          <ElFormItem
            :label="item.label"
            :prop="item.key"
            :label-width="item.label ? item.labelWidth || labelWidth : undefined"
          >
            <slot :name="item.key" :item="item" :modelValue="modelValue">
              <component
                :is="getComponent(item)"
                v-model="modelValue[item.key]"
                v-bind="getProps(item)"
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
              <!-- v-ripple -->
              <ElButton v-if="showReset" class="reset-button" @click="handleReset">
                重置
              </ElButton>
              <!-- v-ripple -->
              <ElButton
                v-if="showSearch"

                type="primary"
                class="search-button"
                :disabled="disabledSearch"
                @click="handleSearch"
              >
                查询
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
  background-color: var(--art-main-bg-color);
  border-radius: calc(var(--custom-radius) / 2 + 2px);

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
      color: var(--main-color);
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--ElColor-primary);
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
