<!-- 图标组件 -->
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, useAttrs } from 'vue'

defineOptions({ name: 'SvgIcon', inheritAttrs: false })

defineProps<SvgIconProps>()

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
  <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" class="svg-icon" />
</template>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
