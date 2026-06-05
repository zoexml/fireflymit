<script setup lang="ts">
import type { ShallowRef } from 'vue'

import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { createNamespace } from '~/_utils'
import SvgIcon from '../SvgIcon/SvgIcon.vue'
import { dragVerifyProps } from './DragVerify.types'
import { getDragLimit, getDragTrackWidth, toCssLength } from './DragVerify.utils'

defineOptions({ name: 'DragVerify' })

const props = defineProps(dragVerifyProps)

const emit = defineEmits<{
  (e: 'handlerMove'): void
  (e: 'passFail'): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'passCallback', seconds: number): void
}>()

const [className, bem] = createNamespace('drag-verify')

const isMoving = ref(false)
const x = ref(0)
const isOk = ref(false)
const startTime = ref(0)
const endTime = ref(0)

const dragVerify = useTemplateRef('dragVerify') as ShallowRef<HTMLElement>
const progressBar = useTemplateRef('progressBar') as ShallowRef<HTMLElement>
const handler = useTemplateRef('handler') as ShallowRef<HTMLElement>
const message = useTemplateRef('message') as ShallowRef<HTMLElement>

let resizeObserver: ResizeObserver | null = null

const updateTextAnimationMetrics = () => {
  if (!dragVerify.value) return
  const trackWidth = getDragTrackWidth(props.width, dragVerify.value)
  const halfTrackWidth = Math.floor(trackWidth / 2)
  dragVerify.value.style.setProperty('--width', `${halfTrackWidth}px`)
  dragVerify.value.style.setProperty('--pwidth', `${-halfTrackWidth}px`)
}

const passVerify = () => {
  endTime.value = Date.now()
  emit('update:modelValue', true)
  isMoving.value = false
  if (message.value) {
    message.value.style.setProperty('-webkit-text-fill-color', 'unset')
    message.value.style.animation = 'slide-to-unlock-complete 3s infinite'
  }
  dragVerify.value.style.setProperty('--text-color', 'var(--el-color-white, #fff)')
  const seconds = Math.round(((endTime.value - startTime.value) / 1000) * 100) / 100
  emit('passCallback', seconds)
}

const getPageX = (e: MouseEvent | TouchEvent) => {
  if ('touches' in e && e.touches[0]) return e.touches[0].pageX
  return (e as MouseEvent).pageX
}

const dragStart = (e: MouseEvent | TouchEvent) => {
  if (!props.modelValue) {
    startTime.value = Date.now()
    isMoving.value = true
    x.value = getPageX(e)
  }
  emit('handlerMove')
}

const dragMoving = (e: MouseEvent | TouchEvent) => {
  if (isMoving.value && !props.modelValue) {
    const diffX = getPageX(e) - x.value
    const dragLimit = getDragLimit(props.width, props.height, dragVerify.value)
    if (diffX > 0 && diffX <= dragLimit) {
      handler.value.style.left = `${diffX}px`
      progressBar.value.style.width = `${diffX + props.height / 2}px`
    } else if (diffX > dragLimit) {
      handler.value.style.left = `${dragLimit}px`
      progressBar.value.style.width = `${dragLimit + props.height / 2}px`
      passVerify()
    }
  }
}

const dragFinish = (e: MouseEvent | TouchEvent) => {
  if (isMoving.value && !props.modelValue) {
    const diffX = getPageX(e) - x.value
    const dragLimit = getDragLimit(props.width, props.height, dragVerify.value)
    if (diffX < dragLimit) {
      isOk.value = true
      setTimeout(() => {
        handler.value.style.left = '0'
        progressBar.value.style.width = '0'
        isOk.value = false
      }, 500)
      emit('passFail')
    } else {
      handler.value.style.left = `${dragLimit}px`
      progressBar.value.style.width = `${dragLimit + props.height / 2}px`
      passVerify()
    }
    isMoving.value = false
  }
}

const reset = () => {
  isMoving.value = false
  x.value = 0
  isOk.value = false
  handler.value.style.left = '0'
  progressBar.value.style.width = '0'
  emit('update:modelValue', false)
  dragVerify.value.style.setProperty('--text-color', props.textColor)
  if (message.value) {
    message.value.style.setProperty('-webkit-text-fill-color', 'transparent')
    message.value.style.animation = 'slide-to-unlock 3s infinite'
    message.value.style.color = props.background
  }
}

const handlerStyle = computed(() => ({
  width: `${props.height}px`,
  height: `${props.height}px`,
  background: props.handlerBg,
}))

const messageTip = computed(() => (props.modelValue ? props.successText : props.text))

const dragVerifyStyle = computed(() => ({
  width: toCssLength(props.width),
  height: `${props.height}px`,
  lineHeight: `${props.height}px`,
  background: props.background,
  borderRadius: props.circle ? `${props.height / 2}px` : props.radius,
  border: props.border,
}))

const progressBarStyle = computed(() => ({
  background: props.progressBarBg,
  height: `${props.height}px`,
  borderRadius: props.circle ? `${props.height / 2}px 0 0 ${props.height / 2}px` : props.radius,
}))

const textStyle = computed(() => ({
  height: `${props.height}px`,
  width: toCssLength(props.width),
  fontSize: props.textSize,
}))

defineExpose({ reset })

onMounted(() => {
  dragVerify.value.style.setProperty('--text-color', props.textColor)
  updateTextAnimationMetrics()
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(updateTextAnimationMetrics)
    resizeObserver.observe(dragVerify.value)
  }
})

watch(() => props.width, updateTextAnimationMetrics)

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<template>
  <div
    ref="dragVerify"
    :class="[className]"
    :style="dragVerifyStyle"
    @mousemove="dragMoving"
    @mouseup="dragFinish"
    @mouseleave="dragFinish"
    @touchmove.prevent="dragMoving"
    @touchend="dragFinish"
    @touchcancel="dragFinish"
  >
    <div ref="progressBar" :class="[bem('__progress-bar'), { goFirst2: isOk }]" :style="progressBarStyle" />
    <div ref="message" :class="[bem('__text')]" :style="textStyle">
      <div
        :class="[bem('__text-inner')]"
        :style="{
          color: props.modelValue ? 'var(--el-color-white, #fff)' : props.textColor,
        }"
      >
        <slot name="textBefore" />
        {{ messageTip }}
        <slot name="textAfter" />
      </div>
    </div>

    <div
      ref="handler"
      :class="[bem('__handler'), { goFirst: isOk }]"
      :style="handlerStyle"
      @mousedown="dragStart"
      @touchstart.prevent="dragStart"
    >
      <SvgIcon :icon="props.modelValue ? successIcon : handlerIcon" :class="bem('__handler-icon')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ffm-drag-verify {
  position: relative;
  overflow: hidden;
  user-select: none;
  touch-action: none;

  &__progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
  }

  &__text {
    position: absolute;
    top: 0;
    user-select: none;
    background: linear-gradient(
      to right,
      var(--text-color) 0%,
      var(--text-color) 40%,
      var(--el-color-white, #fff) 50%,
      var(--text-color) 60%,
      var(--text-color) 100%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-size-adjust: none;
    animation: slide-to-unlock 3s infinite;
  }

  &__text-inner {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
  }

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
    color: var(--el-text-color-placeholder, #a8abb2);
  }

  .goFirst {
    left: 0 !important;
    transition: left 0.5s;
  }

  .goFirst2 {
    width: 0 !important;
    transition: width 0.5s;
  }
}
</style>

<style lang="scss">
@keyframes slide-to-unlock {
  0% {
    background-position: var(--pwidth) 0;
  }

  100% {
    background-position: var(--width) 0;
  }
}

@keyframes slide-to-unlock-complete {
  0% {
    background-position: var(--pwidth) 0;
  }

  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
