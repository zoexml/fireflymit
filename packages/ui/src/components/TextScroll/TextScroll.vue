<!-- 文字滚动 -->
<script setup lang="ts">
import type { TextScrollTheme } from './TextScroll.types'
import {
  useDebounceFn,
  useElementHover,
  useElementSize,
  useRafFn,
  useTimeoutFn,
} from '@vueuse/core'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { textScrollProps } from './TextScroll.types'

defineOptions({ name: 'TextScroll' })

const props = defineProps(textScrollProps)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}

const containerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const isReady = ref(false)

const currentPosition = ref(0)
const textSize = ref(0)
const containerSize = ref(0)
const shouldClone = ref(false)

const isHorizontal = computed(() => props.direction === 'left' || props.direction === 'right')
const isReverse = computed(() => props.direction === 'right' || props.direction === 'down')

// 监听容器尺寸变化
const { width: containerWidth, height: containerHeight } = useElementSize(containerRef)

// 检测鼠标悬停
const isHovered = useElementHover(containerRef)

// 是否应该暂停动画
const isPaused = computed(() => {
  if (!props.alwaysScroll && textSize.value <= containerSize.value) {
    return true
  }
  return props.pauseOnHover && isHovered.value
})

// 主题颜色 CSS 变量
const themeColors: Record<TextScrollTheme, { text: string, border: string }> = {
  theme: { text: 'var(--el-color-primary)', border: 'var(--el-color-primary)' },
  primary: { text: 'var(--el-color-primary)', border: 'var(--el-color-primary)' },
  secondary: { text: 'var(--el-color-info)', border: 'var(--el-color-info)' },
  error: { text: 'var(--el-color-danger)', border: 'var(--el-color-danger)' },
  info: { text: 'var(--el-color-info)', border: 'var(--el-color-info)' },
  success: { text: 'var(--el-color-success)', border: 'var(--el-color-success)' },
  warning: { text: 'var(--el-color-warning)', border: 'var(--el-color-warning)' },
  danger: { text: 'var(--el-color-danger)', border: 'var(--el-color-danger)' },
}

const themeColor = computed(() => themeColors[props.type] || themeColors.theme)

// 背景色（侧边栏区域）
const bgColor = computed(() => {
  const baseColor = themeColor.value.text
  return `color-mix(in srgb, ${baseColor} 10%, var(--el-bg-color, #fff))`
})

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  backgroundColor: bgColor.value,
  borderColor: themeColor.value.border,
}))

const contentClass = computed(() => {
  if (!isHorizontal.value) {
    return 'art-text-scroll__content--vertical'
  }
  return ''
})

const contentStyle = computed(() => {
  const transform = isHorizontal.value
    ? `translateX(${currentPosition.value}px)`
    : `translateY(${currentPosition.value}px)`

  return {
    transform,
    willChange: 'transform',
  }
})

// 克隆元素的间距
const cloneSpacing = computed(() => {
  const spacing = '2em'
  return isHorizontal.value ? { marginLeft: spacing } : { marginTop: spacing }
})

const measureSizes = () => {
  if (!containerRef.value || !textRef.value) return

  const text = textRef.value

  if (isHorizontal.value) {
    containerSize.value = containerWidth.value
    textSize.value = text.offsetWidth
  } else {
    containerSize.value = containerHeight.value
    textSize.value = text.offsetHeight
  }

  const isOverflow = textSize.value > containerSize.value
  shouldClone.value = isOverflow

  // 居中显示
  currentPosition.value = (containerSize.value - textSize.value) / 2

  if (!isReady.value) {
    isReady.value = true
  }
}

// 防抖测量
const debouncedMeasure = useDebounceFn(measureSizes, 150)

let lastTimestamp = 0

// RAF 动画循环
const { pause, resume } = useRafFn(
  ({ timestamp }) => {
    if (!lastTimestamp) lastTimestamp = timestamp

    if (!isPaused.value) {
      const delta = (timestamp - lastTimestamp) / 1000
      const distance = props.speed * delta
      const spacing = textSize.value * 0.1

      currentPosition.value += isReverse.value ? distance : -distance

      // 循环边界检测
      if (isReverse.value) {
        if (currentPosition.value > containerSize.value) {
          currentPosition.value = -(textSize.value + spacing)
        }
      } else {
        if (currentPosition.value < -(textSize.value + spacing)) {
          currentPosition.value = containerSize.value
        }
      }
    }

    lastTimestamp = timestamp
  },
  { immediate: false },
)

const handleContentClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'A') {
    e.stopPropagation()
  }
}

// 监听容器尺寸变化
watch([containerWidth, containerHeight], () => {
  debouncedMeasure()
})

// 监听属性变化
watch(
  () => [props.direction, props.speed, props.text],
  () => {
    measureSizes()
    lastTimestamp = 0
  },
)

// 延迟启动
const { start: startMeasure } = useTimeoutFn(() => {
  measureSizes()
  resume()
}, 100)

onMounted(() => {
  startMeasure()
})

onBeforeUnmount(() => {
  pause()
})
</script>

<template>
  <div
    ref="containerRef"
    class="art-text-scroll"
    :style="containerStyle"
  >
    <div class="art-text-scroll__side art-text-scroll__side--left" :style="{ backgroundColor: bgColor }">
      <slot name="icon">
        <span class="art-text-scroll__icon">📢</span>
      </slot>
    </div>

    <div
      ref="contentRef"
      class="art-text-scroll__content"
      :class="[contentClass, { 'art-text-scroll__content--ready': isReady }]"
      :style="contentStyle"
      @click="handleContentClick"
    >
      <!-- 原始内容 -->
      <span ref="textRef" class="art-text-scroll__text">
        <slot>
          <span v-html="text" />
        </slot>
      </span>
      <!-- 克隆内容用于无缝循环 -->
      <span v-if="shouldClone" class="art-text-scroll__clone" :style="cloneSpacing">
        <slot>
          <span v-html="text" />
        </slot>
      </span>
    </div>

    <div
      v-if="showClose"
      class="art-text-scroll__side art-text-scroll__side--right"
      :style="{ backgroundColor: bgColor }"
      @click="handleClose"
    >
      <slot name="close-icon">
        <span class="art-text-scroll__close-icon">×</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.art-text-scroll {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid;
  font-size: 14px;
  border-radius: 8px;
}

.art-text-scroll__side {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 100%;
  z-index: 10;
  cursor: pointer;
  transition: background-color 0.2s;

  &--left {
    left: 0;
  }

  &--right {
    right: 0;
  }
}

.art-text-scroll__icon {
  font-size: 18px;
  line-height: 1;
}

.art-text-scroll__close-icon {
  font-size: 18px;
  line-height: 1;
  color: var(--el-text-color-regular, #606266);
}

.art-text-scroll__content {
  flex: 1;
  white-space: nowrap;
  display: inline-block;
  padding: 0 36px;
  transition: opacity 0.6s;
  opacity: 0;

  &--ready {
    opacity: 1;
  }

  &--vertical {
    display: flex;
    flex-direction: column;
  }

  :deep(a) {
    color: var(--el-color-danger, #f56c6c);

    &:hover {
      text-decoration: underline;
      color: var(--el-color-danger, #f56c6c);
      opacity: 0.8;
    }
  }
}

.art-text-scroll__text {
  display: inline-block;
}

.art-text-scroll__clone {
  display: inline-block;
}
</style>
