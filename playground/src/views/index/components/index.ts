import Avatar from './avatar.vue'
import Badge from './badge.vue'
import Banner from './banner.vue'
import ContextMenu from './context-menu.vue'
import CountTo from './count-to.vue'
import DialogForm from './dialog-form.vue'
import DragVerify from './drag-verify.vue'
import DrawerForm from './drawer-form.vue'
import ProForm from './pro-form.vue'
import ProTable from './pro-table.vue'
import SearchBar from './search-bar.vue'
import SvgIcon from './svg-icon.vue'
import TextScroll from './text-scroll.vue'
import Upload from './upload.vue'

export const componentMap = {
  Avatar,
  Badge,
  Banner,
  ContextMenu,
  CountTo,
  DialogForm,
  DragVerify,
  DrawerForm,
  ProForm,
  ProTable,
  SearchBar,
  SvgIcon,
  TextScroll,
  Upload,
}

export const components = [
  { label: 'Avatar', value: 'Avatar' },
  { label: 'Badge', value: 'Badge' },
  { label: 'Banner', value: 'Banner' },
  { label: 'ContextMenu', value: 'ContextMenu' },
  { label: 'CountTo', value: 'CountTo' },
  { label: 'DialogForm', value: 'DialogForm' },
  { label: 'DragVerify', value: 'DragVerify' },
  { label: 'DrawerForm', value: 'DrawerForm' },
  { label: 'ProForm', value: 'ProForm' },
  { label: 'ProTable', value: 'ProTable' },
  { label: 'SearchBar', value: 'SearchBar' },
  { label: 'SvgIcon', value: 'SvgIcon' },
  { label: 'TextScroll', value: 'TextScroll' },
  { label: 'Upload', value: 'Upload' },
] as const
