<script setup lang="ts">
import { Banner } from '@fireflymit/ui'
</script>

<template>
  <Banner
    title="fireflymit 前端物料库"
    subtitle="Vue 3 组件 + 指令 + Hooks + 工具函数"
    box-style="banner-demo"
    :button-config="{ show: true, text: '开始使用', color: '#fff', textColor: '#1453ff' }"
  />
</template>

<style scoped>
.banner-demo {
  background: linear-gradient(120deg, #1453ff, #7c4dff);
}
</style>
