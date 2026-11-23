<script setup lang="ts">
import { TextScroll } from '@fireflymit/ui'
import { ref } from 'vue'

const visible = ref(true)
const closed = ref(false)

function handleClose() {
  closed.value = true
  visible.value = false
}

function restore() {
  closed.value = false
  visible.value = true
}
</script>

<template>
  <div class="text-scroll-demo">
    <TextScroll
      v-if="visible"
      type="warning"
      text="fireflymit 组件文档已上线：示例与源码同页展示，支持一键复制，欢迎补充更多组件示例。"
      show-close
      @close="handleClose"
    />
    <button v-if="closed" class="text-scroll-demo__restore" type="button" @click="restore">
      恢复滚动条
    </button>
  </div>
</template>

<style scoped>
.text-scroll-demo__restore {
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}
</style>
