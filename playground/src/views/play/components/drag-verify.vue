<script setup lang="ts">
import { DragVerify } from '@fireflymit/ui'
import { ref } from 'vue'

const dragPassed = ref(false)
const dragVerifyRef = ref()
</script>

<template>
  <div class="max-w-lg w-full">
    <div class="p-4">
      <DragVerify ref="dragVerifyRef" v-model="dragPassed" text="拖动以验证" success-text="验证通过" />
    </div>
    <div class="mt-4">
      <el-space>
        <el-text size="small">
          状态: {{ dragPassed ? '通过' : '未通过' }}
        </el-text>
        <el-button size="small" @click="dragVerifyRef?.reset()">
          重置
        </el-button>
      </el-space>
    </div>
  </div>
</template>
