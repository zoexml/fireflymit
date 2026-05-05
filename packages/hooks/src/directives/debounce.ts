import type { ObjectDirective } from 'vue'

interface DebounceElement extends HTMLElement {
  __debounceTimer?: ReturnType<typeof setTimeout> | null
  __debounceHandler?: () => void
}

export const vDebounce: ObjectDirective<DebounceElement, { callback: () => void, time?: number }> = {
  mounted(el, binding) {
    const { callback, time = 300 } = binding.value || {}

    if (typeof callback !== 'function') {
      console.warn('[v-debounce] directive value must contain a `callback` function')
      return
    }

    let timer: ReturnType<typeof setTimeout> | null = null

    el.__debounceHandler = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        callback()
        timer = null
      }, time)
    }

    el.addEventListener('click', el.__debounceHandler)
  },

  unmounted(el) {
    if (el.__debounceHandler) {
      el.removeEventListener('click', el.__debounceHandler)
      el.__debounceHandler = undefined
    }
    if (el.__debounceTimer) {
      clearTimeout(el.__debounceTimer)
      el.__debounceTimer = null
    }
  },
}
