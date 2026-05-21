import { withInstall } from '~/_utils'
import _ProTable from './ProTable.vue'

export type {
  ProTableColumn,
  ProTableColumnsState,
  ProTableColumnsStateMap,
  ProTableColumnState,
  ProTableEmits,
  ProTablePagination,
  ProTablePaginationChange,
  ProTablePaginationConfig,
  ProTableProps,
  ProTableRenderScope,
  ProTableSize,
  ProTableToolbarOptions,
  ProTableToolbarRenderScope,
} from './ProTable.types'

export const ProTable = withInstall(_ProTable)
export default ProTable

declare module 'vue' {
  export interface GlobalComponents {
    ProTable: typeof ProTable
  }
}
