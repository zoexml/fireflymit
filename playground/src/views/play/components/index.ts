import { defineAsyncComponent } from 'vue'

export const componentMap = {
  Avatar: defineAsyncComponent(() => import('./avatar.vue')),
  Badge: defineAsyncComponent(() => import('./badge.vue')),
  CountTo: defineAsyncComponent(() => import('./count-to.vue')),
  DragVerify: defineAsyncComponent(() => import('./drag-verify.vue')),
  ContextMenu: defineAsyncComponent(() => import('./context-menu.vue')),
  SearchBar: defineAsyncComponent(() => import('./search-bar.vue')),
  ProForm: defineAsyncComponent(() => import('./pro-form.vue')),
  Banner: defineAsyncComponent(() => import('./banner.vue')),
  TextScroll: defineAsyncComponent(() => import('./text-scroll.vue')),
  SvgIcon: defineAsyncComponent(() => import('./svg-icon.vue')),
}

export const components = [
  { label: 'Avatar', value: 'Avatar' },
  { label: 'Badge', value: 'Badge' },
  { label: 'CountTo', value: 'CountTo' },
  { label: 'DragVerify', value: 'DragVerify' },
  { label: 'ContextMenu', value: 'ContextMenu' },
  { label: 'SearchBar', value: 'SearchBar' },
  { label: 'ProForm', value: 'ProForm' },
  { label: 'TextScroll', value: 'TextScroll' },
  { label: 'SvgIcon', value: 'SvgIcon' },
  { label: 'Banner', value: 'Banner' },
]
