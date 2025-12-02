<script setup lang="ts">
import type { BadgeType } from './Badge.types'
import { createNamespace } from '~/_utils'
import { badgeProps } from './Badge.types'

defineOptions({ name: 'ArtBadge' })

const props = defineProps(badgeProps)

const [className, bem] = createNamespace('badge')

const colors: Record<BadgeType, string> = {
  primary: '#1453FF',
  success: '#0dc986',
  warning: '#ff9900',
  info: '#a1a0a8',
  error: '#FF0003',
}
</script>

<template>
  <div :class="className">
    <span :class="bem('type')" :style="`background-color: ${colors[props.type]}`" />
    <div :class="bem('text')">
      {{ props.text }}
    </div>
  </div>
</template>

<style lang="scss">
@use './Badge.scss' as *;
</style>
