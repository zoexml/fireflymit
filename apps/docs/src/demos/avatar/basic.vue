<script setup lang="ts">
import { Avatar } from '@fireflymit/ui'
import { withBase } from 'vitepress'
</script>

<template>
  <div class="avatar-demo">
    <Avatar name="Firefly" />
    <Avatar name="张伟" />
    <Avatar name="Ada Lovelace" :size="48" />
    <Avatar :src="withBase('/logo.png')" name="fireflymit" shape="circle" :size="64" />
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
