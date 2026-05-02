import { withInstall } from '~/_utils'
import _SearchBar from './SearchBar.vue'

export type { SanitizeOutputOptions, SearchBarEmits, SearchBarProps, SearchFormItem } from './types'

export const SearchBar = withInstall(_SearchBar)
export default SearchBar

declare module 'vue' {
  export interface GlobalComponents {
    SearchBar: typeof SearchBar
  }
}
