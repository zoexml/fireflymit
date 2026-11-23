<script setup lang="ts">
import { Avatar } from '@fireflymit/ui'
</script>

<template>
  <div class="avatar-demo">
    <Avatar name="方形" shape="square" :size="48" />
    <Avatar name="圆形" shape="circle" :size="48" />
    <Avatar name="Small" :size="32" />
    <Avatar name="Large" :size="64" />
    <Avatar name="自定义底色" :size="48" background-color="#1453ff" shape="circle" />
  </div>
</template>

<style scoped>
.avatar-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
</style>
