<script setup lang="ts">
import { DragVerify } from '@fireflymit/ui'
import { ref } from 'vue'

const passed = ref(false)
</script>

<template>
  <div class="drag-verify-demo">
    <DragVerify v-model="passed" />
    <p class="drag-verify-demo__status">
      {{ passed ? '验证通过，modelValue 已变为 true' : '按住滑块向右拖动完成验证' }}
    </p>
  </div>
</template>

<style scoped>
.drag-verify-demo__status {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
