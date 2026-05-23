import type { ObjectDirective } from 'vue'
import { devWarn } from '@fireflymit/utils'

type InputType = 'number' | 'decimal' | 'decimal_2' | 'customize'

interface InputElement extends HTMLElement {
  __inputHandler?: (el: HTMLInputElement) => void
  __inputListener?: EventListener
}

const VALID_TYPES: InputType[] = ['number', 'decimal', 'decimal_2', 'customize']

const triggerEvent = (el: HTMLElement, type: string): void => {
  const event = new Event(type, { bubbles: true, cancelable: true })
  el.dispatchEvent(event)
}

const createHandler = (type: InputType, rule?: RegExp): (el: HTMLInputElement) => void => {
  switch (type) {
    case 'number':
      return (el) => {
        const cleaned = el.value.replace(/\D/, '')
        if (cleaned !== el.value) {
          el.value = cleaned
          triggerEvent(el, 'input')
        }
      }
    case 'decimal':
      return (el) => {
        let cleaned = el.value.replace(/[^\d.]/g, '')
        cleaned = cleaned.replace(/\.{2,}/g, '.')
        cleaned = cleaned.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        if (!cleaned.includes('.') && cleaned !== '') { cleaned = String(Number.parseFloat(cleaned)) }
        if (cleaned.includes('.') && cleaned.length === 1) { cleaned = '' }
        if (cleaned !== el.value) {
          el.value = cleaned
          triggerEvent(el, 'input')
        }
      }
    case 'decimal_2':
      return (el) => {
        let cleaned = el.value.replace(/[^\d.]/g, '')
        cleaned = cleaned.replace(/\.{2,}/g, '.')
        cleaned = cleaned.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        cleaned = cleaned.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        if (!cleaned.includes('.') && cleaned !== '') { cleaned = String(Number.parseFloat(cleaned)) }
        if (cleaned.includes('.') && cleaned.length === 1) { cleaned = '' }
        if (cleaned !== el.value) {
          el.value = cleaned
          triggerEvent(el, 'input')
        }
      }
    case 'customize':
      return (el) => {
        if (rule) {
          const cleaned = el.value.replace(rule, '')
          if (cleaned !== el.value) {
            el.value = cleaned
            triggerEvent(el, 'input')
          }
        }
      }
  }
}

export const vInput: ObjectDirective<InputElement, RegExp | undefined> = {
  mounted(el, binding) {
    const type = binding.arg as InputType | undefined

    if (!type || !VALID_TYPES.includes(type)) {
      devWarn(
        `[v-input] requires a valid type argument: v-input:type="value". `
        + `Valid types: ${VALID_TYPES.join('/')}.`,
      )
      return
    }

    const rule = type === 'customize' ? binding.value : undefined
    const handler = createHandler(type, rule)
    el.__inputHandler = handler

    el.__inputListener = () => handler(el as HTMLInputElement)
    el.addEventListener('input', el.__inputListener)

    // trigger once on mount
    handler(el as HTMLInputElement)
  },

  updated(el, binding) {
    const type = binding.arg as InputType | undefined
    if (!type || !VALID_TYPES.includes(type)) return

    const rule = type === 'customize' ? binding.value : undefined
    el.__inputHandler = createHandler(type, rule)
    el.__inputHandler?.(el as HTMLInputElement)
  },

  unmounted(el) {
    if (el.__inputListener) {
      el.removeEventListener('input', el.__inputListener)
      el.__inputListener = undefined
    }
    el.__inputHandler = undefined
  },
}
