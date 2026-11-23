<script setup lang="ts">
import { Badge } from '@fireflymit/ui'
</script>

<template>
  <div class="badge-demo">
    <Badge type="success" text="已完成" />
    <Badge type="warning" text="进行中" />
    <Badge type="error" text="已失败" />
    <Badge type="info" text="已归档" />
  </div>
</template>

<style scoped>
.badge-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
</style>
