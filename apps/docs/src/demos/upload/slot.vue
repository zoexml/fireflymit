<script setup lang="ts">
import type { UploadUserFile } from 'element-plus'
import { Upload } from '@fireflymit/ui'
import { ref } from 'vue'

const files = ref<UploadUserFile[]>([])
</script>

<template>
  <div class="upload-slot-demo">
    <Upload
      v-model:file-list="files"
      :drag="false"
      :show-clear="false"
      accept="image/*"
      tip="通过 trigger 插槽自定义选择入口"
    >
      <template #trigger="{ disabled }">
        <button class="upload-slot-demo__trigger" type="button" :disabled="disabled">
          📎 选择图片
        </button>
      </template>
    </Upload>
  </div>
</template>

<style scoped>
.upload-slot-demo__trigger {
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
}

.upload-slot-demo__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
