import type { ObjectDirective } from 'vue'

interface CopyElement extends HTMLElement {
  __copyHandler?: (event: MouseEvent) => void
  __copyValue?: unknown
}

export const vCopy: ObjectDirective<CopyElement> = {
  mounted(el, binding) {
    el.__copyValue = binding.value
    el.__copyHandler = async () => {
      if (!el.__copyValue) return
      const text = typeof el.__copyValue === 'string' ? el.__copyValue : String(el.__copyValue)
      await navigator.clipboard.writeText(text)
    }
    el.addEventListener('click', el.__copyHandler)
  },

  updated(el, binding) {
    el.__copyValue = binding.value
  },

  unmounted(el) {
    if (el.__copyHandler) {
      el.removeEventListener('click', el.__copyHandler)
    }
    el.__copyHandler = undefined
    el.__copyValue = undefined
  },
}
