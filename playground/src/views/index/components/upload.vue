<script setup lang="ts">
import type { UploadFile, UploadRawFile, UploadRequestOptions, UploadUserFile } from 'element-plus'
import { Upload as FUpload } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const fileList = ref<UploadUserFile[]>([])
const eventLog = ref('等待上传操作')

const sleep = (time = 160) => new Promise(resolve => setTimeout(resolve, time))

const mockRequest = async (options: UploadRequestOptions) => {
  const total = 6

  for (let current = 1; current <= total; current += 1) {
    await sleep()
    options.onProgress({
      percent: Math.round((current / total) * 100),
    } as ProgressEvent & { percent: number })
  }

  options.onSuccess({
    name: options.file.name,
    url: URL.createObjectURL(options.file),
  })
}

const updateLog = (message: string) => {
  eventLog.value = `${new Date().toLocaleTimeString()} ${message}`
}

const handleChange = (file: UploadFile) => {
  updateLog(`选择：${file.name}`)
}

const handleButtonChange = (file: UploadFile) => {
  updateLog(`按钮选择：${file.name}`)
}

const handleSuccess = (_response: unknown, file: UploadFile) => {
  updateLog(`成功：${file.name}`)
}

const handleRemove = (file: UploadFile) => {
  updateLog(`移除：${file.name}`)
}

const handleReject = (_file: UploadRawFile, reason: string) => {
  updateLog(`拒绝：${reason}`)
}

const handlePreview = (file: UploadFile) => {
  ElMessage.info(file.name)
}
</script>

<template>
  <section class="upload-demo">
    <header class="demo-header">
      <div class="demo-heading">
        <h3 class="demo-title">
          Upload
        </h3>
        <p class="demo-description">
          文件上传、拖拽、进度、失败重试。
        </p>
      </div>
      <el-tag size="small" type="success">
        v-model:file-list
      </el-tag>
    </header>

    <div class="demo-grid">
      <section class="demo-section">
        <h4 class="demo-section__title">
          拖拽上传
        </h4>
        <FUpload
          v-model:file-list="fileList"
          multiple
          auto-upload
          accept=".png,.jpg,.jpeg,.pdf"
          :file-types="['.png', '.jpg', '.jpeg', '.pdf']"
          :limit="3"
          :max-size="5"
          :http-request="mockRequest"
          description="支持图片和 PDF，最多 3 个文件"
          @change="handleChange"
          @success="handleSuccess"
          @remove="handleRemove"
          @reject="handleReject"
          @preview="handlePreview"
        />
      </section>

      <section class="demo-section">
        <h4 class="demo-section__title">
          按钮模式
        </h4>
        <FUpload
          :drag="false"
          :auto-upload="false"
          :limit="1"
          replace-on-exceed
          tip="按钮模式适合业务表单里先选择文件，再统一提交。"
          @change="handleButtonChange"
        />
      </section>
    </div>

    <section class="demo-result">
      <div class="demo-result__header">
        <span>当前文件</span>
        <el-tag size="small" type="info">
          {{ fileList.length }}
        </el-tag>
      </div>
      <pre class="demo-output">{{ JSON.stringify(fileList, null, 2) }}</pre>
      <div class="demo-log">
        {{ eventLog }}
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.upload-demo {
  width: 100%;

  .demo-header {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;

    .demo-heading {
      min-width: 0;

      .demo-title {
        margin: 0;
        color: #111827;
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
      }

      .demo-description {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 13px;
        line-height: 20px;
      }
    }
  }

  .demo-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
    gap: 16px;
  }

  .demo-section {
    min-width: 0;

    &__title {
      margin: 0 0 10px;
      color: #334155;
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
    }
  }

  .demo-result {
    min-height: 160px;
    margin-top: 16px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      color: #334155;
      font-size: 13px;
      font-weight: 600;
      background-color: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .demo-output {
      max-height: 180px;
      margin: 0;
      padding: 14px;
      overflow: auto;
      color: #334155;
      font-size: 12px;
      line-height: 18px;
      background-color: #fff;
    }

    .demo-log {
      padding: 10px 14px;
      color: #64748b;
      font-size: 13px;
      line-height: 20px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
  }
}

@media (width <= 900px) {
  .upload-demo {
    .demo-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
