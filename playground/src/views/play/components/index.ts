import Avatar from './avatar.vue'
import Badge from './badge.vue'
import Banner from './banner.vue'
import ContextMenu from './context-menu.vue'
import CountTo from './count-to.vue'
import DragVerify from './drag-verify.vue'
import ProForm from './pro-form.vue'
import ProTable from './pro-table.vue'
import SearchBar from './search-bar.vue'
import SvgIcon from './svg-icon.vue'
import TextScroll from './text-scroll.vue'

export const componentMap = {
  Avatar,
  Badge,
  Banner,
  ContextMenu,
  CountTo,
  DragVerify,
  ProForm,
  ProTable,
  SearchBar,
  SvgIcon,
  TextScroll,
}

export const components = [
  { label: 'Avatar', value: 'Avatar' },
  { label: 'Badge', value: 'Badge' },
  { label: 'Banner', value: 'Banner' },
  { label: 'ContextMenu', value: 'ContextMenu' },
  { label: 'CountTo', value: 'CountTo' },
  { label: 'DragVerify', value: 'DragVerify' },
  { label: 'ProForm', value: 'ProForm' },
  { label: 'ProTable', value: 'ProTable' },
  { label: 'SearchBar', value: 'SearchBar' },
  { label: 'SvgIcon', value: 'SvgIcon' },
  { label: 'TextScroll', value: 'TextScroll' },
] as const
