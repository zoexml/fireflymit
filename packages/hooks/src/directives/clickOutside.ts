import type { ObjectDirective } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  __clickOutsideHandler?: (event: MouseEvent) => void
}

export const vClickOutside: ObjectDirective<ClickOutsideElement> = {
  mounted(el, binding) {
    el.__clickOutsideHandler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value?.(event)
      }
    }
    document.addEventListener('click', el.__clickOutsideHandler)
  },

  unmounted(el) {
    if (el.__clickOutsideHandler) {
      document.removeEventListener('click', el.__clickOutsideHandler)
    }
  },
}
