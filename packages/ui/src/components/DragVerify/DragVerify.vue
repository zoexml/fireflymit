<script setup lang="ts">
import type { ShallowRef } from 'vue'

import { createNamespace } from '~/_utils'
import { dragVerifyProps } from './DragVerify.types'

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

const passVerify = () => {
  endTime.value = Date.now()
  emit('update:modelValue', true)
  isMoving.value = false
  if (message.value) {
    message.value.style.setProperty('-webkit-text-fill-color', 'unset')
    message.value.style.animation = 'slideToUnlock2 3s infinite'
  }
  dragVerify.value.style.setProperty('--textColor', '#fff')
  const seconds = Math.round((endTime.value - startTime.value) / 1000 * 100) / 100
  emit('passCallback', seconds)
}

const dragStart = (e: MouseEvent) => {
  if (!props.modelValue) {
    startTime.value = Date.now()
    isMoving.value = true
    x.value = e.pageX
  }
  emit('handlerMove')
}

const dragMoving = (e: MouseEvent) => {
  if (isMoving.value && !props.modelValue) {
    const diffX = e.pageX - x.value
    if (diffX > 0 && diffX <= Number(props.width) - props.height) {
      handler.value.style.left = `${diffX}px`
      progressBar.value.style.width = `${diffX + props.height / 2}px`
    } else if (diffX > Number(props.width) - props.height) {
      handler.value.style.left = `${Number(props.width) - props.height}px`
      progressBar.value.style.width = `${Number(props.width) - props.height / 2}px`
      passVerify()
    }
  }
}

const dragFinish = (e: MouseEvent) => {
  if (isMoving.value && !props.modelValue) {
    const diffX = e.pageX - x.value
    if (diffX < Number(props.width) - props.height) {
      isOk.value = true
      setTimeout(() => {
        handler.value.style.left = '0'
        progressBar.value.style.width = '0'
        isOk.value = false
      }, 500)
      emit('passFail')
    } else {
      handler.value.style.left = `${Number(props.width) - props.height}px`
      progressBar.value.style.width = `${Number(props.width) - props.height / 2}px`
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
  dragVerify.value.style.setProperty('--textColor', props.textColor)
  if (message.value) {
    message.value.style.setProperty('-webkit-text-fill-color', 'transparent')
    message.value.style.animation = 'slideToUnlock 3s infinite'
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
  width: `${props.width}px`,
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
  width: `${props.width}px`,
  fontSize: props.textSize,
}))

defineExpose({ reset })

onMounted(() => {
  dragVerify.value.style.setProperty('--textColor', props.textColor)
  dragVerify.value.style.setProperty('--width', `${Math.floor(Number(props.width) / 2)}px`)
  dragVerify.value.style.setProperty('--pwidth', `${-Math.floor(Number(props.width) / 2)}px`)
})
</script>

<template>
  <div
    ref="dragVerify"
    :class="[className]"
    class="relative select-none overflow-hidden"
    :style="dragVerifyStyle"
    @mousemove="dragMoving"
    @mouseup="dragFinish"
    @mouseleave="dragFinish"
  >
    <div
      ref="progressBar"
      :class="[bem('__progress-bar'), { goFirst2: isOk }]"
      :style="progressBarStyle"
    />
    <div
      ref="message"
      :class="[bem('__text')]"
      class="absolute top-0 select-none"
      :style="textStyle"
    >
      <div
        class="flex items-center justify-center gap-1"
        :style="{
          color: props.modelValue ? '#fff' : props.textColor,
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
      class="absolute left-0 top-0 flex cursor-move items-center justify-center"
      :style="handlerStyle"
      @mousedown="dragStart"
    >
      <SvgIcon
        :icon="props.modelValue ? successIcon : handlerIcon"
        :class="bem('__handler-icon')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.art-drag-verify {
  &__progress-bar {
    position: absolute;
    height: 0;
    width: 0;
  }

  &__text {
    position: absolute;
    top: 0;
    user-select: none;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, var(--textColor)),
      color-stop(0.4, var(--textColor)),
      color-stop(0.5, #fff),
      color-stop(0.6, var(--textColor)),
      color-stop(1, var(--textColor))
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: slideToUnlock 3s infinite;
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
    color: #999;
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
@keyframes slideToUnlock {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--width) 0;
  }
}
@keyframes slideToUnlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
