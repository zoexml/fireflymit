import { defineAsyncComponent } from 'vue'

export const componentMap = {
  Avatar: defineAsyncComponent(() => import('./avatar.vue')),
  Badge: defineAsyncComponent(() => import('./badge.vue')),
  Banner: defineAsyncComponent(() => import('./banner.vue')),
  ContextMenu: defineAsyncComponent(() => import('./context-menu.vue')),
  CountTo: defineAsyncComponent(() => import('./count-to.vue')),
  DragVerify: defineAsyncComponent(() => import('./drag-verify.vue')),
  ProForm: defineAsyncComponent(() => import('./pro-form.vue')),
  SearchBar: defineAsyncComponent(() => import('./search-bar.vue')),
  SvgIcon: defineAsyncComponent(() => import('./svg-icon.vue')),
  TextScroll: defineAsyncComponent(() => import('./text-scroll.vue')),
}

export const components = [
  { label: 'Avatar', value: 'Avatar' },
  { label: 'Badge', value: 'Badge' },
  { label: 'Banner', value: 'Banner' },
  { label: 'ContextMenu', value: 'ContextMenu' },
  { label: 'CountTo', value: 'CountTo' },
  { label: 'DragVerify', value: 'DragVerify' },
  { label: 'ProForm', value: 'ProForm' },
  { label: 'SearchBar', value: 'SearchBar' },
  { label: 'SvgIcon', value: 'SvgIcon' },
  { label: 'TextScroll', value: 'TextScroll' },
] as const
