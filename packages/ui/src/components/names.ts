/**
 * FireflyMit component names.
 *
 * When adding a new component, append its name here to keep the
 * unplugin resolver in sync with the components barrel export.
 */
export const componentNames = [
  'Avatar',
  'Badge',
  'Banner',
  'CardBanner',
  'ContextMenu',
  'CountTo',
  'DialogForm',
  'DragVerify',
  'DrawerForm',
  'ProForm',
  'ProTable',
  'SearchBar',
  'SvgIcon',
  'TextScroll',
  'Upload',
] as const

export type FireflyMitComponentName = typeof componentNames[number]
