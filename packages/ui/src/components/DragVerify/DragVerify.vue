<script setup lang="ts">
import { createNamespace } from '~/_utils'
import { dragVerifyProps } from './DragVerify.types'

defineOptions({ name: 'DragVerify' })

const props = defineProps(dragVerifyProps)
const emit = defineEmits<{
  (e: 'handlerMove'): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'passCallback'): void
}>()

const [className, bem] = createNamespace('drag-verify')

interface StateType {
  isMoving: boolean
  x: number
  isOk: boolean
}

const state = reactive<StateType>({
  isMoving: false,
  x: 0,
  isOk: false,
})

const { isOk } = toRefs(state)

const dragVerify = ref<HTMLElement>()
const messageRef = ref<HTMLElement>()
const handler = ref<HTMLElement>()
const progressBar = ref<HTMLElement>()

let startX: number
let startY: number
let moveX: number
let moveY: number

const getNumericWidth = (): number => {
  if (typeof props.width === 'string') {
    return dragVerify.value?.offsetWidth || 260
  }
  return props.width as number
}

const getStyleWidth = (): string => {
  if (typeof props.width === 'string') {
    return props.width as string
  }
  return `${props.width}px`
}

const passVerify = () => {
  emit('update:modelValue', true)
  state.isMoving = false
  if (progressBar.value) progressBar.value.style.background = props.completedBg
  if (messageRef.value) {
    messageRef.value.style['-webkit-text-fill-color'] = 'unset'
    messageRef.value.style.animation = 'slidetounlock2 2s cubic-bezier(0, 0.2, 1, 1) infinite'
    messageRef.value.style.color = '#fff'
  }
  emit('passCallback')
}

const onTouchStart = (e: TouchEvent) => {
  startX = e.targetTouches[0].pageX
  startY = e.targetTouches[0].pageY
}

const onTouchMove = (e: TouchEvent) => {
  moveX = e.targetTouches[0].pageX
  moveY = e.targetTouches[0].pageY

  if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
    e.preventDefault()
  }
}

onMounted(() => {
  dragVerify.value?.style.setProperty('--textColor', props.textColor)

  nextTick(() => {
    const numericWidth = getNumericWidth()
    dragVerify.value?.style.setProperty('--width', `${Math.floor(numericWidth / 2)}px`)
    dragVerify.value?.style.setProperty('--pwidth', `${-Math.floor(numericWidth / 2)}px`)
  })

  document.addEventListener('touchstart', onTouchStart)
  document.addEventListener('touchmove', onTouchMove, { passive: false })
})

onBeforeUnmount(() => {
  document.removeEventListener('touchstart', onTouchStart)
  document.removeEventListener('touchmove', onTouchMove)
})

const handlerStyle = computed(() => ({
  left: '0',
  width: `${props.height}px`,
  height: `${props.height}px`,
  background: props.handlerBg,
}))

const dragVerifyStyle = computed(() => ({
  width: getStyleWidth(),
  height: `${props.height}px`,
  lineHeight: `${props.height}px`,
  background: props.background,
  borderRadius: props.circle ? `${props.height / 2}px` : props.radius,
}))

const progressBarStyle = computed(() => ({
  background: props.progressBarBg,
  height: `${props.height}px`,
  borderRadius: props.circle
    ? `${props.height / 2}px 0 0 ${props.height / 2}px`
    : props.radius,
}))

const textStyle = computed(() => ({
  fontSize: props.textSize,
}))

const message = computed(() => {
  return props.modelValue ? props.successText : props.text
})

const dragStart = (e: MouseEvent | TouchEvent) => {
  if (!props.modelValue) {
    state.isMoving = true
    if (handler.value) handler.value.style.transition = 'none'
    const pageX = 'pageX' in e ? e.pageX : (e as TouchEvent).touches[0].pageX
    state.x = pageX - Number.parseInt(handler.value?.style.left.replace('px', '') || '0', 10)
  }
  emit('handlerMove')
}

const dragMoving = (e: MouseEvent | TouchEvent) => {
  if (state.isMoving && !props.modelValue) {
    const numericWidth = getNumericWidth()
    const pageX = 'pageX' in e ? e.pageX : (e as TouchEvent).touches[0].pageX
    const _x = pageX - state.x

    if (_x > 0 && _x <= numericWidth - props.height) {
      if (handler.value) handler.value.style.left = `${_x}px`
      if (progressBar.value) progressBar.value.style.width = `${_x + props.height / 2}px`
    } else if (_x > numericWidth - props.height) {
      if (handler.value) handler.value.style.left = `${numericWidth - props.height}px`
      if (progressBar.value) progressBar.value.style.width = `${numericWidth - props.height / 2}px`
      passVerify()
    }
  }
}

const dragFinish = (e: MouseEvent | TouchEvent) => {
  if (state.isMoving && !props.modelValue) {
    const numericWidth = getNumericWidth()
    const pageX = 'changedTouches' in e ? e.changedTouches[0].pageX : e.pageX
    const _x = pageX - state.x

    if (_x < numericWidth - props.height) {
      state.isOk = true
      if (handler.value) {
        handler.value.style.left = '0'
        handler.value.style.transition = 'all 0.2s'
      }
      if (progressBar.value) progressBar.value.style.width = '0'
      state.isOk = false
    } else {
      if (handler.value) handler.value.style.transition = 'none'
      if (handler.value) handler.value.style.left = `${numericWidth - props.height}px`
      if (progressBar.value) progressBar.value.style.width = `${numericWidth - props.height / 2}px`
      passVerify()
    }
    state.isMoving = false
  }
}

const reset = () => {
  if (handler.value) handler.value.style.left = '0'
  if (progressBar.value) {
    progressBar.value.style.width = '0'
    progressBar.value.style.background = props.progressBarBg
  }
  if (messageRef.value) {
    messageRef.value.style['-webkit-text-fill-color'] = 'transparent'
    messageRef.value.style.animation = 'slidetounlock 2s cubic-bezier(0, 0.2, 1, 1) infinite'
    messageRef.value.style.color = props.background
  }
  emit('update:modelValue', false)
  state.isOk = false
  state.isMoving = false
  state.x = 0
}

defineExpose({ reset })
</script>

<template>
  <div
    ref="dragVerify"
    :class="className"
    :style="dragVerifyStyle"
    @mousemove="dragMoving"
    @mouseup="dragFinish"
    @mouseleave="dragFinish"
    @touchmove="dragMoving"
    @touchend="dragFinish"
  >
    <div
      ref="progressBar"
      :class="[bem('__progress-bar'), { goFirst2: isOk }]"
      :style="progressBarStyle"
    />

    <div ref="messageRef" :class="bem('__text')" :style="textStyle">
      <slot v-if="$slots.textBefore" name="textBefore" />
      {{ message }}
      <slot v-if="$slots.textAfter" name="textAfter" />
    </div>

    <div
      ref="handler"
      :class="[bem('__handler'), { goFirst: isOk }]"
      :style="handlerStyle"
      @mousedown="dragStart"
      @touchstart.prevent="dragStart"
    >
      <span :class="bem('__handler-icon')">{{ modelValue ? '✓' : '→' }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.art-drag-verify {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  border: 1px solid var(--default-border-dashed);

  &__handler {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
  }

  &__handler-icon {
    font-size: 14px;
    color: #999;
  }

  &__progress-bar {
    position: absolute;
    width: 0;
    height: 34px;
  }

  &__text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    user-select: none;
    background: linear-gradient(
      to right,
      var(--textColor) 0%,
      var(--textColor) 40%,
      #fff 50%,
      var(--textColor) 60%,
      var(--textColor) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    animation: slidetounlock 2s cubic-bezier(0, 0.2, 1, 1) infinite;
    -webkit-text-fill-color: transparent;
    text-size-adjust: none;
  }

  &__text * {
    -webkit-text-fill-color: var(--textColor);
  }
}

.goFirst {
  left: 0 !important;
  transition: left 0.5s;
}

.goFirst2 {
  width: 0 !important;
  transition: width 0.5s;
}
</style>

<style lang="scss">
@keyframes slidetounlock {
  0% {
    background-position: var(--pwidth) 0;
  }

  100% {
    background-position: var(--width) 0;
  }
}

@keyframes slidetounlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }

  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
