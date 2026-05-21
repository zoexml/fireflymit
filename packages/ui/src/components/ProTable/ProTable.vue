<script setup lang="ts">
import type {
  ProTableColumn,
  ProTableColumnsStateMap,
  ProTablePaginationChange,
  ProTableSize,
} from './ProTable.types'
import {
  ElButton,
  ElCheckbox,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElPagination,
  ElTable,
  ElTableColumn,
  ElTooltip,
} from 'element-plus'
import { computed, defineComponent, h, shallowRef, useAttrs, useSlots, watch } from 'vue'
import { createNamespace } from '~/_utils'
import SvgIcon from '../SvgIcon/SvgIcon.vue'
import { proTableProps } from './ProTable.types'
import {
  getColumnProps,
  getPagedData,
  loadColumnsState,
  normalizePagination,
  resolveColumnKey,
  resolveColumnStateKey,
  saveColumnsState,
} from './ProTable.utils'
import ProTableCell from './ProTableCell'
import ProTableHeader from './ProTableHeader'

defineOptions({
  name: 'ProTable',
  inheritAttrs: false,
})

const props = defineProps(proTableProps)
const emit = defineEmits<{
  'currentChange': [currentPage: number]
  'sizeChange': [pageSize: number]
  'paginationChange': [payload: ProTablePaginationChange]
  'update:currentPage': [currentPage: number]
  'update:pageSize': [pageSize: number]
  'columnsStateChange': [columnsState: ProTableColumnsStateMap]
  'reload': []
}>()

const [className, bem] = createNamespace('table')
const attrs = useAttrs()
const slots = useSlots()

const innerCurrentPage = shallowRef(1)
const innerPageSize = shallowRef(20)
const innerColumnsState = shallowRef<ProTableColumnsStateMap>({})
const innerTableSize = shallowRef<ProTableSize>()
type ProTableToolDrawer = 'columns'

const activeToolDrawer = shallowRef<ProTableToolDrawer>()
const toolDrawerMounted = shallowRef(false)
const toolDrawerVisible = shallowRef(false)

const ToolbarRender = defineComponent({
  name: 'ProTableToolbarRender',
  props: {
    render: {
      type: Function,
      required: true,
    },
  },
  setup(renderProps) {
    return () => h('div', { class: bem('__toolbar-custom') }, renderProps.render())
  },
})

watch(
  () => props.columnsState,
  (columnsState) => {
    innerColumnsState.value = loadColumnsState(columnsState)
  },
  { immediate: true },
)

const currentColumnsState = computed(() => props.columnsState?.value ?? innerColumnsState.value)

const sortedColumns = computed(() => {
  return props.columns
    .map((column, index) => {
      const stateKey = resolveColumnStateKey(column, index)
      const state = currentColumnsState.value[stateKey]

      return {
        column,
        index,
        stateKey,
        state,
        order: state?.order ?? index,
      }
    })
    .sort((current, next) => current.order - next.order || current.index - next.index)
})

const visibleColumns = computed<ProTableColumn[]>(() => {
  return sortedColumns.value
    .filter(({ column, state }) => !column.hidden && state?.show !== false)
    .map(({ column, state }) => ({
      ...column,
      fixed: state?.fixed ?? column.fixed,
    }))
})

const columnSettingItems = computed(() => {
  return sortedColumns.value
    .filter(({ column }) => !column.hideInSetting)
    .map(({ column, index, stateKey }) => {
      const state = currentColumnsState.value[stateKey]

      return {
        key: stateKey,
        label: column.label ?? column.prop ?? stateKey,
        visible: !column.hidden && state?.show !== false,
        disabled: Boolean(column.disableInSetting || state?.disabled),
        index,
      }
    })
})

const normalizedOptions = computed(() => {
  if (props.options === false) {
    return {
      reload: false,
      density: false,
      setting: false,
    }
  }

  if (props.options === true) {
    return {
      reload: true,
      density: true,
      setting: true,
    }
  }

  const options = props.options ?? {}

  return {
    reload: options.reload ?? false,
    density: options.density ?? false,
    setting: options.setting ?? Boolean(props.columnsState),
  }
})

const hasToolbarOptions = computed(() => {
  return Boolean(
    normalizedOptions.value.reload
    || normalizedOptions.value.density
    || normalizedOptions.value.setting,
  )
})

const hasToolBarRender = computed(() => Boolean(props.toolBarRender))

const toolDrawerMetaMap: Record<ProTableToolDrawer, { icon: string, title: string, description: string }> = {
  columns: {
    icon: 'ri:layout-column-line',
    title: '列设置',
    description: '选择表格中需要显示的列',
  },
}

const activeToolDrawerMeta = computed(() => {
  if (!activeToolDrawer.value) return undefined
  return toolDrawerMetaMap[activeToolDrawer.value]
})

const showToolbar = computed(() => {
  return Boolean(
    props.headerTitle
    || hasToolBarRender.value
    || props.columnsState
    || props.options
    || slots.title
    || slots.toolbar,
  )
})

const tableBindProps = computed(() => {
  const size = props.tableProps.size ?? attrs.size ?? innerTableSize.value

  return {
    ...props.tableProps,
    ...attrs,
    size,
  }
})

const normalizedPagination = computed(() => {
  return normalizePagination(props.pagination, props.data.length, {
    currentPage: innerCurrentPage.value,
    pageSize: innerPageSize.value,
  })
})

const displayData = computed(() => getPagedData(props.data, normalizedPagination.value))

const normalizePaginationLayout = (layout: string) => {
  return layout
    .split(',')
    .map(item => item.trim())
    .filter(item => item && item !== 'total' && item !== '->')
    .join(', ')
}

const paginationProps = computed(() => {
  const {
    enabled,
    layout,
    remote,
    ...restPaginationProps
  } = normalizedPagination.value

  return {
    ...restPaginationProps,
    layout: normalizePaginationLayout(layout),
  }
})

const toCssLength = (value: string | number | undefined) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const rootStyle = computed(() => ({
  height: toCssLength(props.height),
  maxHeight: toCssLength(props.maxHeight),
}))

const tableHeight = computed(() => {
  if (props.height) return '100%'
  return undefined
})

const tableMaxHeight = computed(() => {
  if (props.height) return undefined
  return props.maxHeight
})

const renderToolBar = () => props.toolBarRender?.({
  columns: props.columns,
  visibleColumns: visibleColumns.value,
})

const getRenderIndex = (index: number) => {
  const pagination = normalizedPagination.value
  if (!pagination.enabled || pagination.remote) return index

  return (pagination.currentPage - 1) * pagination.pageSize + index
}

const emitPaginationChange = (payload: ProTablePaginationChange) => {
  emit('paginationChange', payload)
}

const handleCurrentChange = (currentPage: number) => {
  innerCurrentPage.value = currentPage
  emit('update:currentPage', currentPage)
  emit('currentChange', currentPage)
  emitPaginationChange({
    currentPage,
    pageSize: normalizedPagination.value.pageSize,
  })
}

const handleSizeChange = (pageSize: number) => {
  innerPageSize.value = pageSize
  innerCurrentPage.value = 1
  emit('update:pageSize', pageSize)
  emit('update:currentPage', 1)
  emit('sizeChange', pageSize)
  emitPaginationChange({
    currentPage: 1,
    pageSize,
  })
}

const setColumnsState = (columnsState: ProTableColumnsStateMap) => {
  innerColumnsState.value = columnsState
  saveColumnsState(props.columnsState, columnsState)
  emit('columnsStateChange', columnsState)
}

const handleColumnVisibleChange = (columnKey: string, visible: boolean) => {
  const currentState = currentColumnsState.value[columnKey] ?? {}

  if (currentState.disabled) return

  setColumnsState({
    ...currentColumnsState.value,
    [columnKey]: {
      ...currentState,
      show: visible,
    },
  })
}

const resetColumnsState = () => {
  setColumnsState({ ...(props.columnsState?.defaultValue ?? {}) })
}

const openToolDrawer = (drawer: ProTableToolDrawer) => {
  activeToolDrawer.value = drawer
  toolDrawerMounted.value = true
  toolDrawerVisible.value = true
}

const closeToolDrawer = () => {
  toolDrawerVisible.value = false
  activeToolDrawer.value = undefined
  toolDrawerMounted.value = false
}

const handleReload = () => {
  if (typeof normalizedOptions.value.reload === 'function') {
    normalizedOptions.value.reload()
  }

  emit('reload')
}

const handleDensityChange = (size: ProTableSize) => {
  innerTableSize.value = size
}
</script>

<template>
  <section :class="[className, { [bem('loading')]: loading }]" :style="rootStyle">
    <div v-if="showToolbar" :class="bem('__toolbar')">
      <div :class="bem('__toolbar-title')">
        <slot name="title">
          <span v-if="headerTitle">{{ headerTitle }}</span>
        </slot>
      </div>

      <div :class="bem('__toolbar-actions')">
        <slot name="toolbar" />
        <ToolbarRender v-if="hasToolBarRender" :render="renderToolBar" />

        <div v-if="hasToolbarOptions" :class="bem('__toolbar-options')">
          <ElTooltip v-if="normalizedOptions.reload" content="刷新" placement="top">
            <ElButton text circle :class="bem('__toolbar-button')" @click="handleReload">
              <SvgIcon icon="ri:refresh-line" />
            </ElButton>
          </ElTooltip>

          <ElDropdown v-if="normalizedOptions.density" trigger="click" @command="handleDensityChange">
            <ElButton text circle :class="bem('__toolbar-button')" title="表格密度">
              <SvgIcon icon="ri:equalizer-2-line" />
            </ElButton>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem command="large">
                  宽松
                </ElDropdownItem>
                <ElDropdownItem command="default">
                  默认
                </ElDropdownItem>
                <ElDropdownItem command="small">
                  紧凑
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>

          <ElTooltip v-if="normalizedOptions.setting" content="列设置" placement="top">
            <ElButton text circle :class="bem('__toolbar-button')" @click="openToolDrawer('columns')">
              <SvgIcon icon="ri:settings-3-line" />
            </ElButton>
          </ElTooltip>
        </div>
      </div>
    </div>

    <ElTable
      v-bind="tableBindProps"
      :data="displayData"
      :height="tableHeight"
      :max-height="tableMaxHeight"
      :row-key="rowKey"
      :class="bem('__table')"
    >
      <ElTableColumn
        v-for="(column, columnIndex) in visibleColumns"
        :key="resolveColumnKey(column, columnIndex)"
        v-bind="getColumnProps(column)"
      >
        <template v-if="column.headerRender" #header>
          <ProTableHeader :column="column" :index="columnIndex" />
        </template>

        <template v-if="!column.type || column.render || column.formatter" #default="scope">
          <ProTableCell :row="scope.row" :column="column" :index="getRenderIndex(scope.$index)" />
        </template>
      </ElTableColumn>

      <template #empty>
        <slot name="empty">
          暂无数据
        </slot>
      </template>
    </ElTable>

    <div v-if="normalizedPagination.enabled" :class="bem('__pagination')">
      <span :class="bem('__pagination-total')">共 {{ normalizedPagination.total }} 条</span>
      <ElPagination
        v-bind="paginationProps"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>

    <div
      v-if="toolDrawerMounted && toolDrawerVisible"
      :class="bem('__drawer-mask')"
      @click="closeToolDrawer"
    >
      <aside :class="bem('__drawer')" @click.stop>
        <div :class="bem('__drawer-header')">
          <div :class="bem('__drawer-title')">
            <SvgIcon v-if="activeToolDrawerMeta" :icon="activeToolDrawerMeta.icon" />
            <span>{{ activeToolDrawerMeta?.title }}</span>
          </div>
          <ElButton text circle :class="bem('__drawer-close')" @click="closeToolDrawer">
            <SvgIcon icon="ri:close-line" />
          </ElButton>
        </div>
        <div v-if="activeToolDrawerMeta?.description" :class="bem('__drawer-desc')">
          {{ activeToolDrawerMeta.description }}
        </div>

        <div :class="bem('__drawer-body')">
          <template v-if="activeToolDrawer === 'columns'">
            <div :class="bem('__setting')">
              <div :class="bem('__setting-actions')">
                <span>显示列</span>
                <ElButton link type="primary" @click="resetColumnsState">
                  重置
                </ElButton>
              </div>

              <div :class="bem('__setting-list')">
                <div
                  v-for="item in columnSettingItems"
                  :key="item.key"
                  :class="[bem('__setting-item'), { 'is-disabled': item.disabled }]"
                  @click="!item.disabled && handleColumnVisibleChange(item.key, !item.visible)"
                >
                  <ElCheckbox
                    :model-value="item.visible"
                    :disabled="item.disabled"
                    @click.stop
                    @change="value => handleColumnVisibleChange(item.key, Boolean(value))"
                  >
                    <span :class="bem('__setting-label')">{{ item.label }}</span>
                  </ElCheckbox>
                  <SvgIcon
                    :icon="item.visible ? 'ri:eye-line' : 'ri:eye-off-line'"
                    :class="bem('__setting-status')"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </aside>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.art-table {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;

  &--loading {
    opacity: 0.72;
    pointer-events: none;
  }

  &__table {
    flex: 1;
    min-height: 0;
    width: 100%;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    margin-bottom: 12px;

    &-title {
      min-width: 0;
      color: var(--el-text-color-primary);
      font-size: 16px;
      font-weight: 600;
      line-height: 32px;
    }

    &-actions {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      min-width: 0;
    }

    &-custom,
    &-options {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &-button {
      font-size: 16px;
    }
  }

  &__drawer-mask {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: flex;
    justify-content: flex-end;
    background-color: rgb(0 0 0 / 45%);
  }

  &__drawer {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: min(320px, 92vw);
    height: 100%;
    min-width: 0;
    padding: 20px;
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  &__drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 48px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  &__drawer-title {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--el-text-color-primary);
    font-size: 16px;
    font-weight: 600;

    .art-svg-icon {
      flex-shrink: 0;
      color: var(--el-color-primary);
      font-size: 18px;
    }
  }

  &__drawer-close {
    flex-shrink: 0;
    font-size: 16px;
  }

  &__drawer-desc {
    margin-top: 12px;
    color: var(--el-text-color-secondary);
    font-size: 13px;
    line-height: 20px;
  }

  &__drawer-body {
    flex: 1;
    min-height: 0;
    padding-top: 16px;
  }

  &__setting {
    min-width: 0;

    &-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
      color: var(--el-text-color-primary);
      font-size: 14px;
      font-weight: 600;
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-width: 0;
      height: 38px;
      padding: 0 10px;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 8px;
      background-color: var(--el-fill-color-blank);
      cursor: pointer;
      transition:
        background-color var(--el-transition-duration-fast),
        border-color var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary-light-5);
        background-color: var(--el-fill-color-light);
      }

      &.is-disabled {
        cursor: not-allowed;
        opacity: 0.58;

        &:hover {
          border-color: var(--el-border-color-lighter);
          background-color: var(--el-fill-color-blank);
        }
      }

      :deep(.el-checkbox) {
        flex: 1;
        min-width: 0;
        height: 36px;
        margin-right: 0;
      }

      :deep(.el-checkbox__label) {
        min-width: 0;
        padding-left: 8px;
      }
    }

    &-label {
      display: block;
      overflow: hidden;
      color: var(--el-text-color-primary);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-status {
      flex-shrink: 0;
      color: var(--el-text-color-placeholder);
      font-size: 15px;
    }
  }

  &__pagination {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin-top: 12px;

    &-total {
      flex-shrink: 0;
      color: var(--el-text-color-regular);
      font-size: var(--el-pagination-font-size, 14px);
      line-height: var(--el-pagination-button-height, 32px);
      white-space: nowrap;
    }

    :deep(.el-pagination) {
      flex: 1;
      justify-content: flex-end;
      min-width: 0;
      width: 100%;
    }
  }
}

@media (width <= 768px) {
  .art-table {
    &__toolbar {
      align-items: flex-start;
      flex-direction: column;

      &-actions {
        justify-content: flex-start;
        width: 100%;
        overflow-x: auto;
      }
    }

    &__pagination {
      overflow-x: auto;
    }
  }
}
</style>
