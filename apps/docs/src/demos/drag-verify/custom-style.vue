<script setup lang="ts">
import { DragVerify } from '@fireflymit/ui'
import { ref } from 'vue'

const passed = ref(false)
const elapsed = ref<number>()
</script>

<template>
  <div class="drag-verify-style">
    <DragVerify
      v-model="passed"
      :width="320"
      :height="44"
      circle
      background="#0f172a"
      progress-bar-bg="#1453ff"
      handler-bg="#fff"
      text="向右拖动滑块"
      success-text="已验证"
      text-color="#e2e8f0"
      border="none"
      @pass-callback="elapsed = $event"
    >
      <template #textBefore>
        <span>🔒</span>
      </template>
    </DragVerify>
    <p class="drag-verify-style__status">
      {{ passed ? `验证耗时 ${elapsed ?? 0} 秒` : '拖动后通过 passCallback 获取耗时（秒）' }}
    </p>
  </div>
</template>

<style scoped>
.drag-verify-style__status {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
