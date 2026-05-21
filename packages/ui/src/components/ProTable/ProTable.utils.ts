import type {
  ProTableColumn,
  ProTableColumnsState,
  ProTableColumnsStateMap,
  ProTablePagination,
  ProTablePaginationConfig,
  ProTablePaginationState,
} from './ProTable.types'

const DEFAULT_PAGE_SIZES = [20, 50, 100, 200]
const DEFAULT_PAGE_SIZE = 20
const DEFAULT_LAYOUT = 'sizes, prev, pager, next, jumper'

const clampPage = (currentPage: number, pageSize: number, total: number) => {
  const maxPage = Math.max(1, Math.ceil(total / pageSize))
  return Math.min(Math.max(1, currentPage), maxPage)
}

export const normalizePagination = (
  pagination: ProTablePaginationConfig | undefined,
  dataTotal: number,
  state: ProTablePaginationState = {},
): ProTablePagination => {
  if (!pagination) {
    return {
      enabled: false,
      currentPage: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      total: dataTotal,
      pageSizes: DEFAULT_PAGE_SIZES,
      layout: DEFAULT_LAYOUT,
      background: true,
      remote: false,
    }
  }

  const config = typeof pagination === 'boolean' ? {} : pagination
  const pageSize = Math.max(1, Number(config.pageSize ?? state.pageSize ?? DEFAULT_PAGE_SIZE))
  const total = Math.max(0, Number(config.total ?? dataTotal))
  const currentPage = clampPage(Number(config.currentPage ?? state.currentPage ?? 1), pageSize, total)

  return {
    enabled: config.enabled ?? true,
    currentPage,
    pageSize,
    total,
    pageSizes: config.pageSizes ?? DEFAULT_PAGE_SIZES,
    layout: config.layout ?? DEFAULT_LAYOUT,
    background: config.background ?? true,
    remote: config.remote ?? false,
  }
}

export const getPagedData = <T>(data: T[], pagination: ProTablePagination): T[] => {
  if (!pagination.enabled || pagination.remote) return data

  const start = (pagination.currentPage - 1) * pagination.pageSize
  return data.slice(start, start + pagination.pageSize)
}

export const getRowValue = (row: Record<string, any>, prop?: string): unknown => {
  if (!prop) return undefined

  return prop.split('.').reduce<unknown>((currentValue, segment) => {
    if (currentValue == null || typeof currentValue !== 'object') return undefined
    return (currentValue as Record<string, unknown>)[segment]
  }, row)
}

export const resolveColumnKey = (column: ProTableColumn, index: number): string | number => {
  return column.key ?? column.prop ?? `column-${index}`
}

export const resolveColumnStateKey = (column: ProTableColumn, index: number): string => {
  return String(resolveColumnKey(column, index))
}

export const getColumnProps = (column: ProTableColumn) => {
  const {
    key,
    hidden,
    hideInSetting,
    disableInSetting,
    render,
    headerRender,
    formatter,
    ...columnProps
  } = column

  return columnProps
}

const isBrowser = () => typeof window !== 'undefined'

export const getColumnsStateStorage = (
  persistenceType: ProTableColumnsState['persistenceType'] = 'localStorage',
): Storage | undefined => {
  if (!isBrowser()) return undefined

  return persistenceType === 'sessionStorage'
    ? window.sessionStorage
    : window.localStorage
}

export const loadColumnsState = (
  columnsState: ProTableColumnsState | undefined,
): ProTableColumnsStateMap => {
  const defaultValue = columnsState?.defaultValue ?? {}
  const persistenceKey = columnsState?.persistenceKey

  if (!persistenceKey) return { ...defaultValue }

  const storage = getColumnsStateStorage(columnsState.persistenceType)
  const storedValue = storage?.getItem(persistenceKey)

  if (!storedValue) return { ...defaultValue }

  try {
    return {
      ...defaultValue,
      ...JSON.parse(storedValue),
    }
  } catch {
    return { ...defaultValue }
  }
}

export const saveColumnsState = (
  columnsState: ProTableColumnsState | undefined,
  value: ProTableColumnsStateMap,
) => {
  const persistenceKey = columnsState?.persistenceKey
  if (!persistenceKey) return

  const storage = getColumnsStateStorage(columnsState.persistenceType)
  storage?.setItem(persistenceKey, JSON.stringify(value))
}
