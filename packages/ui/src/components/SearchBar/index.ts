import { withInstall } from '~/_utils'
import _SearchBar from './SearchBar.vue'

// 类型导出
export type { SearchBarEmits, SearchBarProps, SearchFormItem } from './types'
// 组件导出
export const SearchBar = withInstall(_SearchBar)

declare module 'vue' {
  export interface GlobalComponents {
    ArtSearchBar: typeof SearchBar
  }
}
