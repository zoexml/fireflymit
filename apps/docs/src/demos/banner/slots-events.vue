<script setup lang="ts">
import { Banner } from '@fireflymit/ui'
import { ref } from 'vue'

const log = ref('')

function handleClick() {
  log.value = '触发了 click（点击横幅）'
}

function handleButtonClick() {
  log.value = '触发了 buttonClick（点击按钮）'
}
</script>

<template>
  <div class="banner-demo">
    <Banner
      box-style="banner-demo__banner"
      :button-config="{ show: true, text: '默认按钮', color: '#fff', textColor: '#333' }"
      @click="handleClick"
      @button-click="handleButtonClick"
    >
      <template #title>
        标题插槽
      </template>
      <template #subtitle>
        副标题插槽：点击横幅或按钮查看事件
      </template>
      <template #button>
        <span class="banner-demo__button">自定义按钮</span>
      </template>
    </Banner>
    <p class="banner-demo__log">
      {{ log || '点击横幅或按钮试试' }}
    </p>
  </div>
</template>

<style scoped>
.banner-demo__banner {
  background: linear-gradient(120deg, #0f172a, #1453ff);
}

.banner-demo__button {
  display: inline-block;
  padding: 4px 12px;
  color: #1453ff;
  cursor: pointer;
  background: #fff;
  border-radius: 999px;
}

.banner-demo__log {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
