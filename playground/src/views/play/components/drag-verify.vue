<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { shallowRef, useTemplateRef } from 'vue'

interface DragVerifyExpose {
  reset: () => void
}

const adaptivePassed = shallowRef(false)
const fixedPassed = shallowRef(false)

const adaptiveDragVerifyRef = useTemplateRef<DragVerifyExpose>('adaptiveDragVerifyRef')
const fixedDragVerifyRef = useTemplateRef<DragVerifyExpose>('fixedDragVerifyRef')

const handlePass = (seconds: number) => {
  ElMessage.success(`验证通过，用时 ${seconds} 秒`)
}
</script>

<template>
  <div class="max-w-3xl w-full space-y-6">
    <section class="space-y-3">
      <h3 class="text-base font-medium">
        100% 自适应宽度
      </h3>
      <div class="max-w-xl w-full border border-gray-200 rounded-lg p-4 dark:border-gray-700">
        <FDragVerify
          ref="adaptiveDragVerifyRef"
          v-model="adaptivePassed"
          width="100%"
          text="拖动以验证"
          success-text="验证通过"
          @pass-callback="handlePass"
        />
      </div>
      <el-space>
        <el-text size="small">
          状态: {{ adaptivePassed ? '通过' : '未通过' }}
        </el-text>
        <el-button size="small" @click="adaptiveDragVerifyRef?.reset()">
          重置
        </el-button>
      </el-space>
    </section>

    <section class="space-y-3">
      <h3 class="text-base font-medium">
        固定宽度兼容
      </h3>
      <div class="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
        <FDragVerify
          ref="fixedDragVerifyRef"
          v-model="fixedPassed"
          :width="320"
          text="固定 320px 宽度"
          success-text="验证通过"
          @pass-callback="handlePass"
        />
      </div>
      <el-space>
        <el-text size="small">
          状态: {{ fixedPassed ? '通过' : '未通过' }}
        </el-text>
        <el-button size="small" @click="fixedDragVerifyRef?.reset()">
          重置
        </el-button>
      </el-space>
    </section>
  </div>
</template>
