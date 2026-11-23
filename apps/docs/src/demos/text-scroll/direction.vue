<script setup lang="ts">
import { TextScroll } from '@fireflymit/ui'
</script>

<template>
  <div class="text-scroll-direction">
    <TextScroll
      direction="right"
      type="success"
      text="向右滚动，鼠标悬停时暂停。"
      :speed="60"
    >
      <template #icon>
        <span>✅</span>
      </template>
    </TextScroll>

    <TextScroll
      direction="up"
      type="primary"
      height="36px"
      text="向上滚动：direction 支持 left / right / up / down。"
      :speed="50"
    />
  </div>
</template>

<style scoped>
.text-scroll-direction {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
