<script setup lang="ts">
import { SvgIcon } from '@fireflymit/ui'
</script>

<template>
  <div class="svg-icon-demo">
    <span class="svg-icon-demo__item">
      <SvgIcon icon="ep:search" />
      搜索
    </span>
    <span class="svg-icon-demo__item">
      <SvgIcon icon="ri:home-4-line" />
      首页
    </span>
    <span class="svg-icon-demo__item">
      <SvgIcon icon="carbon:settings" />
      设置
    </span>
    <span
      class="svg-icon-demo__item svg-icon-demo__item--large"
      style="color: var(--el-color-primary)"
    >
      <SvgIcon icon="ri:heart-3-fill" />
      24px 主色
    </span>
  </div>
</template>

<style scoped>
.svg-icon-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}

.svg-icon-demo__item {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
}

.svg-icon-demo__item--large {
  font-size: 24px;
}
</style>
