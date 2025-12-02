<script setup lang="ts">
import { ref } from 'vue'
// import { VDialog } from '~/@mylib/ui'

// console.log(VDialog)
const open = ref(false)
</script>

<template>
  <a-space>
    <VDialog v-model:open="open">
      <div>弹窗测试2222</div>
    </VDialog>
    <a-button @click="open = true">
      弹窗
    </a-button>
  </a-space>
</template>
