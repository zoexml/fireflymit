<script setup lang="ts">
import type { ProTablePaginationChange } from './ProTable.types'
import { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { computed, shallowRef } from 'vue'
import { createNamespace } from '~/_utils'
import { proTableProps } from './ProTable.types'
import {
  getColumnProps,
  getPagedData,
  normalizePagination,
  resolveColumnKey,
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
}>()

const [className, bem] = createNamespace('table')

const innerCurrentPage = shallowRef(1)
const innerPageSize = shallowRef(20)

const visibleColumns = computed(() => props.columns.filter(column => !column.hidden))

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
</script>

<template>
  <section :class="[className, { [bem('loading')]: loading }]" :style="rootStyle">
    <ElTable
      v-bind="{ ...tableProps, ...$attrs }"
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
    &__pagination {
      overflow-x: auto;
    }
  }
}
</style>
