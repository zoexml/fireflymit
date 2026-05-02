<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MenuItemType } from './ContextMenu.types'
import { createNamespace } from '~/_utils'
import { contextMenuProps } from './ContextMenu.types'

defineOptions({ name: 'ContextMenu' })

const props = defineProps(contextMenuProps)

const emit = defineEmits<{
  (e: 'select', item: MenuItemType): void
  (e: 'show'): void
  (e: 'hide'): void
}>()

const [className, bem] = createNamespace('context-menu')

const visible = ref(false)
const position = ref({ x: 0, y: 0 })

let showTimer: ReturnType<typeof setTimeout> | null = null
let eventListenersAdded = false

// Menu style
const menuStyle = computed(
  (): CSSProperties => ({
    position: 'fixed',
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    zIndex: 2000,
    width: `${props.menuWidth}px`,
  }),
)

// Menu list style
const menuListStyle = computed(
  (): CSSProperties => ({
    padding: `${props.menuPadding}px`,
  }),
)

// Menu item style
const menuItemStyle = computed(
  (): CSSProperties => ({
    height: `${props.itemHeight}px`,
    padding: `0 ${props.itemPaddingX}px`,
    borderRadius: '4px',
  }),
)

// Submenu list style
const submenuListStyle = computed(
  (): CSSProperties => ({
    minWidth: `${props.submenuWidth}px`,
    padding: `${props.menuPadding}px 0`,
    borderRadius: `${props.borderRadius}px`,
  }),
)

// Calculate total menu height for boundary detection
const calculateMenuHeight = (): number => {
  let totalHeight = props.menuPadding * 2
  props.menuItems.forEach((item) => {
    totalHeight += props.itemHeight
    if (item.showLine) {
      totalHeight += 10
    }
  })
  return totalHeight
}

// Calculate position to avoid viewport overflow
const calculatePosition = (e: MouseEvent) => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const menuHeight = calculateMenuHeight()

  let x = e.clientX
  let y = e.clientY

  // Right boundary
  if (x + props.menuWidth > screenWidth - props.boundaryDistance) {
    x = Math.max(props.boundaryDistance, x - props.menuWidth)
  }

  // Bottom boundary
  if (y + menuHeight > screenHeight - props.boundaryDistance) {
    y = Math.max(props.boundaryDistance, screenHeight - menuHeight - props.boundaryDistance)
  }

  // Clamp to viewport
  x = Math.max(
    props.boundaryDistance,
    Math.min(x, screenWidth - props.menuWidth - props.boundaryDistance),
  )
  y = Math.max(
    props.boundaryDistance,
    Math.min(y, screenHeight - menuHeight - props.boundaryDistance),
  )

  return { x, y }
}

// Hide menu (defined first — referenced by handlers below)
const hide = () => {
  if (!visible.value) return
  visible.value = false
  emit('hide')
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  // eslint-disable-next-line ts/no-use-before-define
  removeEventListeners()
}

// Handle document click outside menu
const handleDocumentClick = (e: Event) => {
  const target = e.target as Element
  const menuElement = document.querySelector(`.${className}`)
  if (menuElement && menuElement.contains(target)) return
  hide()
}

// Handle document right-click to close menu
const handleDocumentContextmenu = () => {
  hide()
}

// Handle Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') hide()
}

// Add document event listeners
const addEventListeners = () => {
  if (eventListenersAdded) return
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('contextmenu', handleDocumentContextmenu)
  document.addEventListener('keydown', handleKeydown)
  eventListenersAdded = true
}

// Remove document event listeners
const removeEventListeners = () => {
  if (!eventListenersAdded) return
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('contextmenu', handleDocumentContextmenu)
  document.removeEventListener('keydown', handleKeydown)
  eventListenersAdded = false
}

// Show menu
const show = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()

  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }

  position.value = calculatePosition(e)
  visible.value = true
  emit('show')

  // Delay adding listeners to avoid immediate close trigger
  showTimer = setTimeout(() => {
    if (visible.value) addEventListeners()
    showTimer = null
  }, 50)
}

// Handle menu item click
const handleMenuClick = (item: MenuItemType) => {
  if (item.disabled) return
  emit('select', item)
  hide()
}

// Transition hooks
const onBeforeEnter = (el: Element) => {
  ;(el as HTMLElement).style.transformOrigin = 'top left'
}

const onAfterLeave = () => {
  removeEventListeners()
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

// Cleanup on unmount
onUnmounted(() => {
  removeEventListeners()
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
})

defineExpose({
  show,
  hide,
  visible: computed(() => visible.value),
})
</script>

<template>
  <div :class="bem('__wrapper')">
    <Transition name="context-menu" @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
      <div
        v-show="visible"
        :style="menuStyle"
        :class="className"
      >
        <ul :class="bem('__list')" :style="menuListStyle">
          <template v-for="item in menuItems" :key="item.key">
            <!-- Menu item without children -->
            <li
              v-if="!item.children"
              :class="[bem('__item'), { 'is-disabled': item.disabled, 'has-line': item.showLine }]"
              :style="menuItemStyle"
              @click="handleMenuClick(item)"
            >
              <slot name="icon" :item="item">
                <span v-if="item.icon" :class="bem('__icon')" />
              </slot>
              <span :class="bem('__label')">{{ item.label }}</span>
            </li>

            <!-- Submenu with children -->
            <li
              v-else
              :class="[bem('__item'), bem('__submenu')]"
              :style="menuItemStyle"
            >
              <div :class="bem('__submenu-title')">
                <slot name="icon" :item="item">
                  <span v-if="item.icon" :class="bem('__icon')" />
                </slot>
                <span :class="bem('__label')">{{ item.label }}</span>
                <span :class="bem('__arrow')" />
              </div>
              <ul
                :class="bem('__submenu-list')"
                :style="submenuListStyle"
              >
                <li
                  v-for="child in item.children"
                  :key="child.key"
                  :class="[bem('__item'), bem('__submenu-item'), { 'is-disabled': child.disabled, 'has-line': child.showLine }]"
                  :style="menuItemStyle"
                  @click="handleMenuClick(child)"
                >
                  <slot name="icon" :item="child">
                    <span v-if="child.icon" :class="bem('__icon')" />
                  </slot>
                  <span :class="bem('__label')">{{ child.label }}</span>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.art-context-menu__wrapper {
  --context-menu-border-radius: v-bind('`${props.borderRadius}px`');
}

.art-context-menu {
  background: var(--el-bg-color, #fff);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: var(--context-menu-border-radius);
}

.art-context-menu__list {
  margin: 0;
  list-style: none;
}

.art-context-menu__item {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  font-size: 12px;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--el-fill-color-light, #f5f7fa);
  }

  &.has-line {
    margin-bottom: 10px;

    &::after {
      position: absolute;
      right: 0;
      bottom: -5px;
      left: 0;
      height: 1px;
      content: '';
      background-color: var(--el-border-color-light, #e4e7ed);
    }
  }

  &.is-disabled {
    color: var(--el-text-color-disabled, #c0c4cc);
    cursor: not-allowed;

    &:hover {
      background-color: transparent !important;
    }

    .art-context-menu__icon,
    .art-context-menu__label {
      color: var(--el-text-color-disabled, #c0c4cc) !important;
    }
  }
}

.art-context-menu__icon {
  margin-right: 8px;
  flex-shrink: 0;
  font-size: 16px;
  color: var(--el-text-color-regular, #606266);
}

.art-context-menu__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--el-text-color-regular, #606266);
}

// Submenu
.art-context-menu__submenu {
  &:hover .art-context-menu__submenu-list {
    display: block;
  }

  &:hover .art-context-menu__arrow {
    transform: rotate(90deg);
  }
}

.art-context-menu__submenu-title {
  display: flex;
  align-items: center;
  width: 100%;
}

.art-context-menu__arrow {
  margin-left: auto;
  margin-right: 0;
  font-size: 14px;
  color: var(--el-text-color-secondary, #909399);
  transition: transform 0.15s;

  &::after {
    content: '▸';
  }
}

.art-context-menu__submenu-list {
  position: absolute;
  left: 100%;
  top: 0;
  z-index: 2001;
  display: none;
  width: max-content;
  min-width: max-content;
  list-style: none;
  background: var(--el-bg-color, #fff);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: var(--context-menu-border-radius);
}

.art-context-menu__submenu-item {
  margin: 0 6px;
}

// Transition animation
.context-menu-enter-active,
.context-menu-leave-active {
  transition: all v-bind('`${props.animationDuration}ms`') ease-out;
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.context-menu-enter-to,
.context-menu-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
