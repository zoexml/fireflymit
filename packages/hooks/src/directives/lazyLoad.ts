import type { ObjectDirective } from 'vue'

interface LazyLoadElement extends HTMLImageElement {
  __lazySrc?: string
  __lazyIO?: IntersectionObserver
  __lazyScrollHandler?: () => void
  __lazyCallback?: (el: HTMLImageElement) => void
}

function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let last = 0
  return function (this: any, ...args: any[]) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
  } as T
}

function isElementInViewport(el: HTMLElement): boolean {
  if (typeof el.getBoundingClientRect !== 'function') return true

  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const rect = el.getBoundingClientRect()
  return rect.top < clientHeight
}

function loadImg(el: LazyLoadElement): void {
  if (isElementInViewport(el) && el.__lazySrc) {
    el.src = el.__lazySrc
    el.__lazyCallback?.(el)
  }
}

function observeWithIO(el: LazyLoadElement): void {
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && el.__lazySrc) {
      el.src = el.__lazySrc
      el.__lazyCallback?.(el)
    }
  })
  el.__lazyIO = io
  io.observe(el)
}

function observeWithScroll(el: LazyLoadElement): void {
  const handler = throttle(() => loadImg(el), 250)
  el.__lazyScrollHandler = handler
  // 立即检查一次（元素可能在可视区域内）
  loadImg(el)
  window.addEventListener('scroll', handler, true)
}

export const vLazyLoad: ObjectDirective<
  LazyLoadElement,
  { src: string, callback?: (el: HTMLImageElement) => void }
> = {
  mounted(el, binding) {
    el.__lazySrc = binding.value?.src
    el.__lazyCallback = binding.value?.callback

    // 图片加载失败时显示默认占位图
    el.onerror = () => {
      el.src = '/src/assets/common/error.png'
    }

    if ('IntersectionObserver' in window) {
      observeWithIO(el)
    } else {
      observeWithScroll(el)
    }
  },

  updated(el, binding) {
    el.__lazySrc = binding.value?.src
    el.__lazyCallback = binding.value?.callback
  },

  unmounted(el) {
    if (el.__lazyIO) {
      el.__lazyIO.disconnect()
      el.__lazyIO = undefined
    }
    if (el.__lazyScrollHandler) {
      window.removeEventListener('scroll', el.__lazyScrollHandler, true)
      el.__lazyScrollHandler = undefined
    }
  },
}
