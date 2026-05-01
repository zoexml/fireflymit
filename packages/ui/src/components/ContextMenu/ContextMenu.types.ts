import type { ExtractPropTypes } from 'vue'

export interface MenuItemType {
  /** Unique key for the menu item */
  key: string
  /** Menu item label */
  label: string
  /** Menu item icon (iconify icon name) */
  icon?: string
  /** Whether the menu item is disabled */
  disabled?: boolean
  /** Whether to show a divider line after this item */
  showLine?: boolean
  /** Submenu items */
  children?: MenuItemType[]
  [key: string]: any
}

export const contextMenuProps = {
  /** Menu items configuration */
  menuItems: { type: Array as () => MenuItemType[], required: true },
  /** Menu width in px */
  menuWidth: { type: Number, default: 120 },
  /** Submenu width in px */
  submenuWidth: { type: Number, default: 150 },
  /** Menu item height in px */
  itemHeight: { type: Number, default: 32 },
  /** Boundary distance from viewport edges in px */
  boundaryDistance: { type: Number, default: 10 },
  /** Menu padding in px */
  menuPadding: { type: Number, default: 5 },
  /** Menu item horizontal padding in px */
  itemPaddingX: { type: Number, default: 6 },
  /** Menu border radius in px */
  borderRadius: { type: Number, default: 6 },
  /** Animation duration in ms */
  animationDuration: { type: Number, default: 100 },
} as const

export type ContextMenuProps = ExtractPropTypes<typeof contextMenuProps>
