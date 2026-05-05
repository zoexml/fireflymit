import type { ObjectDirective } from 'vue'

interface RippleElement extends HTMLElement {
  __rippleHandler?: (event: MouseEvent) => void
  __rippleCleanup?: () => void
}

function createRipple(event: MouseEvent, el: HTMLElement, color?: string) {
  const rect = el.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const ripple = document.createElement('span')
  ripple.style.cssText = [
    'position: absolute',
    'border-radius: 50%',
    'pointer-events: none',
    `width: ${size}px`,
    `height: ${size}px`,
    `left: ${x}px`,
    `top: ${y}px`,
    `background-color: ${color || 'rgba(0, 0, 0, 0.1)'}`,
    'transform: scale(0)',
    'animation: v-ripple 0.6s ease-out',
  ].join(';')

  const container = document.createElement('span')
  container.style.cssText = [
    'position: absolute',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
    'overflow: hidden',
    'border-radius: inherit',
    'pointer-events: none',
  ].join(';')

  container.appendChild(ripple)
  el.appendChild(container)

  ripple.addEventListener('animationend', () => {
    container.remove()
  })
}

const styleId = 'v-ripple-styles'

function ensureStyles() {
  if (document.getElementById(styleId)) return
  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `@keyframes v-ripple{to{transform:scale(2);opacity:0}}`
  document.head.appendChild(style)
}

export const vRipple: ObjectDirective<RippleElement, string | boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) return

    ensureStyles()

    const color = typeof binding.value === 'string' ? binding.value : undefined

    const computed = getComputedStyle(el)
    if (computed.position === 'static') {
      el.style.position = 'relative'
    }

    el.__rippleHandler = (event: MouseEvent) => {
      createRipple(event, el, color)
    }
    el.addEventListener('mousedown', el.__rippleHandler)
  },

  unmounted(el) {
    if (el.__rippleHandler) {
      el.removeEventListener('mousedown', el.__rippleHandler)
    }
    el.__rippleHandler = undefined
  },
}
