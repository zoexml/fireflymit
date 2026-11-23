<script setup lang="ts">
import type { UploadUserFile } from 'element-plus'
import { Upload } from '@fireflymit/ui'
import { ref } from 'vue'

const files = ref<UploadUserFile[]>([])
</script>

<template>
  <div class="upload-demo">
    <Upload
      v-model:file-list="files"
      :file-types="['image/*', '.pdf']"
      :max-size="5"
      :limit="3"
      description="仅演示本地选择与列表，不会发起上传请求"
    />
    <p class="upload-demo__info">
      已选择 {{ files.length }} 个文件
    </p>
  </div>
</template>

<style scoped>
.upload-demo__info {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
