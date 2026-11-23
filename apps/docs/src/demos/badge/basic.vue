<script setup lang="ts">
import { Badge } from '@fireflymit/ui'

const badgeTypes = ['primary', 'success', 'warning', 'info', 'error'] as const
</script>

<template>
  <div class="badge-demo">
    <Badge v-for="type in badgeTypes" :key="type" :type="type" :text="type" />
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
