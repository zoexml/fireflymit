import type { ObjectDirective } from 'vue'

interface LongpressElement extends HTMLElement {
  __longpressTimer?: ReturnType<typeof setTimeout> | null
  __longpressDuration?: number
  __longpressHandler?: (e: MouseEvent | TouchEvent) => void
  __longpressCancel?: () => void
}

export const vLongpress: ObjectDirective<LongpressElement, () => void> = {
  mounted(el, binding) {
    const cb = binding.value
    el.__longpressDuration = Number(binding.arg) || 3000

    if (typeof cb !== 'function') {
      console.warn('[v-longpress] directive must receive a callback function')
      return
    }

    let timer: ReturnType<typeof setTimeout> | null = null

    el.__longpressHandler = (e: MouseEvent | TouchEvent) => {
      // 排除右键点击
      if (e instanceof MouseEvent && e.button !== 0) return
      e.preventDefault()
      if (timer === null) {
        timer = setTimeout(() => {
          cb()
          timer = null
        }, el.__longpressDuration)
      }
    }

    el.__longpressCancel = () => {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    }

    el.addEventListener('mousedown', el.__longpressHandler)
    el.addEventListener('touchstart', el.__longpressHandler)
    el.addEventListener('click', el.__longpressCancel)
    el.addEventListener('mouseout', el.__longpressCancel)
    el.addEventListener('touchend', el.__longpressCancel)
    el.addEventListener('touchcancel', el.__longpressCancel)
  },

  updated(el, binding) {
    el.__longpressDuration = Number(binding.arg) || 3000
  },

  unmounted(el) {
    if (el.__longpressHandler) {
      el.removeEventListener('mousedown', el.__longpressHandler)
      el.removeEventListener('touchstart', el.__longpressHandler)
    }
    if (el.__longpressCancel) {
      el.removeEventListener('click', el.__longpressCancel)
      el.removeEventListener('mouseout', el.__longpressCancel)
      el.removeEventListener('touchend', el.__longpressCancel)
      el.removeEventListener('touchcancel', el.__longpressCancel)
    }
    el.__longpressHandler = undefined
    el.__longpressCancel = undefined
  },
}
