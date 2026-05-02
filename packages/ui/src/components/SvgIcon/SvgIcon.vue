<!-- 图标组件 -->
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, useAttrs } from 'vue'
import { createNamespace } from '~/_utils'

defineOptions({ name: 'SvgIcon', inheritAttrs: false })

defineProps<SvgIconProps>()

const [className] = createNamespace('svg-icon')

export interface SvgIconProps {
  /** Iconify icon name */
  icon?: string
}

const attrs = useAttrs()

const bindAttrs = computed<{ class: string, style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}))
</script>

<template>
  <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" :class="className" />
</template>

<style lang="scss" scoped>
.art-svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
