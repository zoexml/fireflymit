import type { ObjectDirective } from 'vue'

interface ThrottleElement extends HTMLElement {
  __throttleLastTime?: number
  __throttleHandler?: () => void
}

export const vThrottle: ObjectDirective<ThrottleElement, { callback: () => void, time?: number }> = {
  mounted(el, binding) {
    const { callback, time = 300 } = binding.value || {}

    if (typeof callback !== 'function') {
      console.warn('[v-throttle] directive value must contain a `callback` function')
      return
    }

    el.__throttleHandler = () => {
      const now = Date.now()
      if (!el.__throttleLastTime || now - el.__throttleLastTime > time) {
        el.__throttleLastTime = now
        callback()
      }
    }

    el.addEventListener('click', el.__throttleHandler)
  },

  unmounted(el) {
    if (el.__throttleHandler) {
      el.removeEventListener('click', el.__throttleHandler)
      el.__throttleHandler = undefined
    }
    el.__throttleLastTime = undefined
  },
}
