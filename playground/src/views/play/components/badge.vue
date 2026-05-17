<script setup lang="ts">
const badgeTypes = ['primary', 'success', 'warning', 'info', 'error'] as const
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <FBadge v-for="type in badgeTypes" :key="type" :type="type" :text="type" />
  </div>
</template>
