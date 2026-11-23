<script setup lang="ts">
import { CountTo } from '@fireflymit/ui'
import { ref } from 'vue'

const status = ref('等待动画开始')
</script>

<template>
  <div class="count-to-demo">
    <div class="count-to-demo__row">
      <CountTo
        :target="2026"
        :duration="1500"
        class="count-to-demo__value"
        @started="status = '动画开始'"
        @finished="status = '动画结束'"
      />
      <span>次提交</span>
    </div>
    <p class="count-to-demo__status">
      {{ status }}
    </p>
  </div>
</template>

<style scoped>
.count-to-demo__row {
  display: flex;
  gap: 8px;
  align-items: baseline;
  font-size: 14px;
}

.count-to-demo__value {
  font-size: 32px;
  font-weight: 600;
  color: var(--el-color-primary);
}

.count-to-demo__status {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
