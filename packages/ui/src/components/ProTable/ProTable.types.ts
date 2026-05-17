import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'

export interface ProTableRenderScope<T = any> {
  row: T
  column: ProTableColumn<T>
  value: unknown
  $index: number
}

export interface ProTableColumn<T = any> {
  key?: string | number
  prop?: string
  label?: string
  type?: 'selection' | 'index' | 'expand' | string
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: true | 'left' | 'right'
  sortable?: boolean | 'custom'
  hidden?: boolean
  render?: (scope: ProTableRenderScope<T>) => VNodeChild
  headerRender?: (scope: { column: ProTableColumn<T>, $index: number }) => VNodeChild
  formatter?: (row: T, column: ProTableColumn<T>, value: unknown, index: number) => VNodeChild
  [key: string]: unknown
}

export interface ProTablePagination {
  enabled: boolean
  currentPage: number
  pageSize: number
  total: number
  pageSizes: number[]
  layout: string
  background: boolean
  remote: boolean
}

export type ProTablePaginationConfig = | boolean | Partial<Omit<ProTablePagination, 'enabled'> & { enabled: boolean }>

export interface ProTablePaginationState {
  currentPage?: number
  pageSize?: number
}

export interface ProTablePaginationChange {
  currentPage: number
  pageSize: number
}

export const proTableProps = {
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((row: Record<string, any>) => string)>,
    default: 'id',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  tableProps: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  pagination: {
    type: [Boolean, Object] as PropType<ProTablePaginationConfig>,
    default: false,
  },
} as const

export type ProTableProps = ExtractPropTypes<typeof proTableProps>

export interface ProTableEmits {
  'currentChange': [currentPage: number]
  'sizeChange': [pageSize: number]
  'paginationChange': [payload: ProTablePaginationChange]
  'update:currentPage': [currentPage: number]
  'update:pageSize': [pageSize: number]
}
