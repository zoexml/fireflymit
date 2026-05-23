import type { ObjectDirective } from 'vue'
import { devWarn } from '@fireflymit/utils'

interface EmojiElement extends HTMLElement {
  __emojiInputEl?: HTMLInputElement | HTMLTextAreaElement | null
  __emojiHandler?: () => void
}

const findInputElement = (parent: HTMLElement): HTMLInputElement | HTMLTextAreaElement | null => {
  const tag = parent.tagName.toLowerCase()
  if (tag === 'input' || tag === 'textarea') {
    return parent as HTMLInputElement | HTMLTextAreaElement
  }
  return parent.querySelector('input, textarea')
}

const triggerInputEvent = (el: HTMLElement): void => {
  const event = new Event('input', { bubbles: true, cancelable: true })
  el.dispatchEvent(event)
}

// 禁止Unicode表情符号和特殊字符（正则规则可根据需求自定义）
const emojiReg = /[^\u4E00-\u9FA5|\da-z\s,.?!，。？！…—&$=()\-+/{}[\]]|\s/gi

export const vEmoji: ObjectDirective<EmojiElement> = {
  mounted(el) {
    const inputElement = findInputElement(el)
    if (!inputElement) {
      devWarn('[v-emoji] directive requires an input or textarea element')
      return
    }

    el.__emojiInputEl = inputElement

    el.__emojiHandler = () => {
      const { value } = inputElement
      const cleaned = value.replace(emojiReg, '')
      if (cleaned !== value) {
        inputElement.value = cleaned
        triggerInputEvent(inputElement)
      }
    }

    inputElement.addEventListener('input', el.__emojiHandler)
  },

  unmounted(el) {
    if (el.__emojiInputEl && el.__emojiHandler) {
      el.__emojiInputEl.removeEventListener('input', el.__emojiHandler)
      el.__emojiInputEl = undefined
      el.__emojiHandler = undefined
    }
  },
}
