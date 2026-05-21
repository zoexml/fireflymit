import type { ObjectDirective } from 'vue'

type LazyLoadBinding
  = | string
    | {
      src: string
      loading?: string
      error?: string
      callback?: (el: HTMLImageElement) => void
    }

interface LazyLoadElement extends HTMLImageElement {
  __lazySrc?: string
  __lazyLoadedSrc?: string
  __lazyLoadingSrc?: string
  __lazyErrorSrc?: string
  __lazyIO?: IntersectionObserver
  __lazyScrollHandler?: () => void
  __lazyCallback?: (el: HTMLImageElement) => void
}

const throttle = <T extends (...args: unknown[]) => void>(fn: T, delay: number): T => {
  let last = 0
  return ((...args: Parameters<T>) => {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn(...args)
    }
  }) as T
}

const isElementInViewport = (el: HTMLElement): boolean => {
  if (typeof el.getBoundingClientRect !== 'function') return true

  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const rect = el.getBoundingClientRect()
  return rect.top < clientHeight
}

const normalizeBinding = (value?: LazyLoadBinding) => {
  if (typeof value === 'string') {
    return { src: value }
  }

  return value ?? { src: '' }
}

const cleanupObserver = (el: LazyLoadElement): void => {
  if (el.__lazyIO) {
    el.__lazyIO.disconnect()
    el.__lazyIO = undefined
  }

  if (el.__lazyScrollHandler) {
    window.removeEventListener('scroll', el.__lazyScrollHandler, true)
    window.removeEventListener('resize', el.__lazyScrollHandler)
    el.__lazyScrollHandler = undefined
  }
}

const loadImg = (el: LazyLoadElement): void => {
  if (!el.__lazySrc || el.__lazyLoadedSrc === el.__lazySrc) return

  el.src = el.__lazySrc
  el.__lazyLoadedSrc = el.__lazySrc
  cleanupObserver(el)
  el.__lazyCallback?.(el)
}

const loadImgIfVisible = (el: LazyLoadElement): void => {
  if (isElementInViewport(el)) {
    loadImg(el)
  }
}

const observeWithIO = (el: LazyLoadElement): void => {
  const io = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      loadImg(el)
    }
  })
  el.__lazyIO = io
  io.observe(el)
}

const observeWithScroll = (el: LazyLoadElement): void => {
  const handler = throttle(() => loadImgIfVisible(el), 250)
  el.__lazyScrollHandler = handler
  window.addEventListener('scroll', handler, true)
  window.addEventListener('resize', handler)
  handler()
}

const observeElement = (el: LazyLoadElement): void => {
  cleanupObserver(el)

  if (!el.__lazySrc || el.__lazyLoadedSrc === el.__lazySrc) return

  if (el.__lazyLoadingSrc) {
    el.src = el.__lazyLoadingSrc
  }

  if ('IntersectionObserver' in window) {
    observeWithIO(el)
  } else {
    observeWithScroll(el)
  }
}

export const vLazyLoad: ObjectDirective<
  LazyLoadElement,
  LazyLoadBinding
> = {
  mounted(el, binding) {
    const value = normalizeBinding(binding.value)

    el.__lazySrc = value.src
    el.__lazyLoadingSrc = value.loading
    el.__lazyErrorSrc = value.error
    el.__lazyCallback = value.callback

    el.onerror = () => {
      if (el.__lazyErrorSrc && el.src !== el.__lazyErrorSrc) {
        el.src = el.__lazyErrorSrc
      }
    }

    observeElement(el)
  },

  updated(el, binding) {
    const value = normalizeBinding(binding.value)
    const shouldObserve = el.__lazySrc !== value.src

    el.__lazySrc = value.src
    el.__lazyLoadingSrc = value.loading
    el.__lazyErrorSrc = value.error
    el.__lazyCallback = value.callback

    if (shouldObserve) {
      observeElement(el)
    }
  },

  unmounted(el) {
    cleanupObserver(el)
    el.onerror = null
  },
}
