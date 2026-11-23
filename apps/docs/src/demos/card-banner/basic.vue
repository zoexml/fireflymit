<script setup lang="ts">
import { CardBanner } from '@fireflymit/ui'
import { withBase } from 'vitepress'
import { ref } from 'vue'

const log = ref('')
</script>

<template>
  <div class="card-banner-demo">
    <CardBanner
      title="确认创建项目？"
      description="创建后将初始化默认目录结构与依赖配置。"
      :image="withBase('/logo.png')"
      height="20rem"
      :cancel-button="{ show: true }"
      :button="{ show: true, text: '立即创建' }"
      @click="log = '触发了 click'"
      @cancel="log = '触发了 cancel'"
    />
    <p class="card-banner-demo__log">
      {{ log || '点击按钮试试' }}
    </p>
  </div>
</template>

<style scoped>
.card-banner-demo {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
}

.card-banner-demo__log {
  padding: 0 16px 12px;
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
