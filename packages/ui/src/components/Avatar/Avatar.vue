<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '~/_utils'
import { avatarProps } from './Avatar.types'

defineOptions({ name: 'Avatar' })

const props = defineProps(avatarProps)

const [className, bem] = createNamespace('avatar')

/** 头像圆角 */
const borderRadius = computed(() => (props.shape === 'circle' ? '50%' : '6px'))

/** 字体大小 */
const fontSize = computed(() => props.size * 0.4)

/** 字母正则 */
const letterRegex = /[a-z]/i

/** 获取文字头像内容 */
const getAvatarText = (name?: string) => {
  if (!name) return '?'
  const first = name.trim().charAt(0)
  return letterRegex.test(first) ? first.toUpperCase() : first
}

const avatarColor = computed(() => {
  const name = props.name || ''
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
    hash |= 0
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 55%, 52%)`
})
</script>

<template>
  <div :class="className" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- 有头像显示图片 -->
    <img v-if="src" :src="src" :alt="name" :class="bem('img')">

    <!-- 无头像显示首字/首字母 -->
    <div
      v-else
      :class="bem('placeholder')"
      :style="{
        backgroundColor: backgroundColor || avatarColor,
        fontSize: `${fontSize}px`,
        borderRadius,
      }"
    >
      {{ getAvatarText(name) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ffm-avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &--img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: 600;
    color: var(--el-color-white, #fff);
    text-transform: uppercase;
    user-select: none;
  }
}
</style>
