<script setup lang="ts">
import type {
  UploadProps as ElUploadProps,
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadRawFile,
  UploadUserFile,
} from 'element-plus'
import type { UploadEmits, UploadRejectReason } from './Upload.types'
import { ElButton, ElMessage, ElProgress, ElUpload, genFileId } from 'element-plus'
import { computed, useTemplateRef } from 'vue'
import { createNamespace } from '~/_utils'
import SvgIcon from '../SvgIcon/SvgIcon.vue'
import { STATUS_ICON_MAP, STATUS_TEXT_MAP } from './Upload.constants'
import { uploadProps } from './Upload.types'

defineOptions({ name: 'Upload', inheritAttrs: false })

const props = defineProps(uploadProps)
const emit = defineEmits<UploadEmits>()

const fileList = defineModel<UploadUserFile[]>('fileList', { default: () => [] })

const [className, bem] = createNamespace('upload')
const uploadInstance = useTemplateRef<UploadInstance>('uploadRef')

const uploadAction = computed(() => props.action || '#')
const canUploadToServer = computed(() => Boolean(props.action || props.httpRequest))
const actualAutoUpload = computed(() => props.autoUpload && canUploadToServer.value)
const hasFiles = computed(() => fileList.value.length > 0)
const showManualSubmit = computed(() => !actualAutoUpload.value && canUploadToServer.value)
const normalizedAcceptTypes = computed(() => {
  const acceptTypes = props.accept
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)

  return [...new Set([...props.fileTypes, ...acceptTypes].map(item => item.toLowerCase()))]
})

const formatFileSize = (size?: number) => {
  if (!size) return ''

  if (size < 1024) return `${size}B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`
  return `${(size / 1024 / 1024).toFixed(1)}MB`
}

const fileTypeText = computed(() => {
  if (!normalizedAcceptTypes.value.length) return '任意格式'
  return normalizedAcceptTypes.value.join('、')
})

const maxSizeText = computed(() => {
  if (!props.maxSize) return ''
  return `单个文件不超过 ${formatFileSize(props.maxSize * 1024 * 1024)}`
})

const tipText = computed(() => {
  if (props.tip) return props.tip

  const tips = [`支持 ${fileTypeText.value}`]
  if (maxSizeText.value) tips.push(maxSizeText.value)
  if (props.limit) tips.push(`最多 ${props.limit} 个`)

  return tips.join('，')
})

const getFileExtension = (fileName: string) => {
  const index = fileName.lastIndexOf('.')
  return index === -1 ? '' : fileName.slice(index).toLowerCase()
}

const isAllowedFileType = (rawFile: UploadRawFile) => {
  if (!normalizedAcceptTypes.value.length) return true

  const extension = getFileExtension(rawFile.name)
  const mimeType = rawFile.type.toLowerCase()

  return normalizedAcceptTypes.value.some((type) => {
    if (type.startsWith('.')) return extension === type
    if (type.endsWith('/*')) return mimeType.startsWith(type.slice(0, -1))
    return mimeType === type || extension === `.${type}`
  })
}

const rejectFile = (rawFile: UploadRawFile, reason: UploadRejectReason, message: string) => {
  ElMessage.warning(message)
  emit('reject', rawFile, reason)
}

const validateFile = (rawFile: UploadRawFile) => {
  if (props.maxSize > 0 && rawFile.size / 1024 / 1024 > props.maxSize) {
    rejectFile(rawFile, 'size', `文件大小不能超过 ${props.maxSize}MB`)
    return false
  }

  if (!isAllowedFileType(rawFile)) {
    rejectFile(rawFile, 'type', `仅支持 ${fileTypeText.value} 格式`)
    return false
  }

  return true
}

const handleBeforeUpload: ElUploadProps['beforeUpload'] = async (rawFile) => {
  if (!validateFile(rawFile)) return false

  if (!props.beforeUpload) return true

  const result = await props.beforeUpload(rawFile)
  if (result === false) {
    emit('reject', rawFile, 'custom')
  }

  return result
}

const handleChange: ElUploadProps['onChange'] = (file, files) => {
  if (!actualAutoUpload.value && file.raw && !validateFile(file.raw)) {
    fileList.value = files.filter(item => item.uid !== file.uid)
    return
  }

  emit('change', file, files)
}

const handleSuccess: ElUploadProps['onSuccess'] = (response, file, files) => {
  emit('success', response, file, files)
}

const handleError: ElUploadProps['onError'] = (error, file, files) => {
  emit('error', error, file, files)
}

const handleProgress: ElUploadProps['onProgress'] = (event, file, files) => {
  emit('progress', event, file, files)
}

const handlePreview = (file: UploadFile) => {
  emit('preview', file)
}

const removeFileFromList = (file: UploadFile) => {
  fileList.value = fileList.value.filter(item => item.uid !== file.uid)
  emit('remove', file, fileList.value)
}

const handleRemoveFile = async (file: UploadFile) => {
  if (props.disabled) return

  if (props.beforeRemove) {
    const canRemove = await props.beforeRemove(file, fileList.value as UploadFiles)
    if (canRemove === false) return
  }

  uploadInstance.value?.abort(file)
  removeFileFromList(file)
}

const handleExceed: ElUploadProps['onExceed'] = (files, uploadFiles) => {
  if (props.replaceOnExceed) {
    uploadInstance.value?.clearFiles()
    files.slice(0, props.limit || files.length).forEach((file) => {
      const rawFile = file as UploadRawFile
      rawFile.uid = genFileId()
      uploadInstance.value?.handleStart(rawFile)
    })

    if (actualAutoUpload.value) {
      uploadInstance.value?.submit()
    }

    emit('exceed', files, uploadFiles)
    return
  }

  ElMessage.warning(`最多上传 ${props.limit} 个文件`)
  emit('exceed', files, uploadFiles)
}

const retryFile = (file: UploadFile) => {
  if (!file.raw || props.disabled) return

  const rawFile = file.raw as UploadRawFile
  rawFile.uid = genFileId()
  removeFileFromList(file)
  uploadInstance.value?.handleStart(rawFile)

  if (actualAutoUpload.value) {
    uploadInstance.value?.submit()
  }

  emit('retry', file)
}

const submit = () => {
  uploadInstance.value?.submit()
}

const clearFiles = () => {
  uploadInstance.value?.clearFiles()
  fileList.value = []
  emit('clear')
}

const getStatusText = (file: UploadUserFile) => {
  return file.status ? STATUS_TEXT_MAP[file.status] : '已选择'
}

const getStatusIcon = (file: UploadUserFile) => {
  return file.status ? STATUS_ICON_MAP[file.status] : 'ri:file-line'
}

defineExpose({
  abort: (file?: UploadFile) => uploadInstance.value?.abort(file),
  clearFiles,
  ref: uploadInstance,
  submit,
})
</script>

<template>
  <section
    :class="[
      className,
      bem(listType),
      {
        'is-disabled': disabled,
        'is-drag': drag,
      },
    ]"
  >
    <ElUpload
      ref="uploadRef"
      v-model:file-list="fileList"
      :action="uploadAction"
      :name="name"
      :headers="headers"
      :data="data"
      :method="method"
      :with-credentials="withCredentials"
      :multiple="multiple"
      :drag="drag"
      :accept="accept"
      :limit="limit"
      :disabled="disabled"
      :auto-upload="actualAutoUpload"
      :http-request="httpRequest"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      v-bind="$attrs"
    >
      <slot name="trigger" :disabled="disabled">
        <div v-if="drag" :class="bem('__dropzone')">
          <SvgIcon icon="ri:upload-cloud-2-line" :class="bem('__dropzone-icon')" />
          <div :class="bem('__dropzone-title')">
            {{ title }}
          </div>
          <div v-if="description" :class="bem('__dropzone-description')">
            {{ description }}
          </div>
          <ElButton type="primary" plain :disabled="disabled">
            <SvgIcon icon="ri:add-line" />
            {{ buttonText }}
          </ElButton>
        </div>

        <ElButton v-else type="primary" :disabled="disabled">
          <SvgIcon icon="ri:upload-2-line" />
          {{ buttonText }}
        </ElButton>
      </slot>

      <template #tip>
        <slot name="tip" :tip="tipText">
          <div v-if="tipText" :class="bem('__tip')">
            {{ tipText }}
          </div>
        </slot>
      </template>
    </ElUpload>

    <div v-if="showManualSubmit || showClear" :class="bem('__actions')">
      <ElButton v-if="showManualSubmit" type="primary" :disabled="disabled || !hasFiles" @click="submit">
        <SvgIcon icon="ri:upload-cloud-line" />
        {{ submitText }}
      </ElButton>
      <ElButton v-if="showClear" :disabled="disabled || !hasFiles" @click="clearFiles">
        <SvgIcon icon="ri:delete-bin-line" />
        {{ clearText }}
      </ElButton>
    </div>

    <ul v-if="showFileList && hasFiles" :class="bem('__list')">
      <li v-for="file in fileList" :key="file.uid || file.name" :class="[bem('__file'), bem(`__file-${file.status || 'ready'}`)]">
        <slot name="file" :file="file" :remove="handleRemoveFile" :retry="retryFile">
          <div :class="bem('__file-main')">
            <SvgIcon :icon="getStatusIcon(file)" :class="bem('__file-icon')" />
            <button type="button" :class="bem('__file-name')" @click="handlePreview(file as UploadFile)">
              {{ file.name }}
            </button>
            <span :class="bem('__file-meta')">
              {{ formatFileSize(file.size) || getStatusText(file) }}
            </span>
          </div>

          <ElProgress
            v-if="file.status === 'uploading'"
            :percentage="Math.round(file.percentage || 0)"
            :stroke-width="4"
            :show-text="false"
          />

          <div :class="bem('__file-actions')">
            <ElButton
              v-if="showRetry && file.status === 'fail'"
              type="primary"
              link
              :disabled="disabled"
              @click="retryFile(file as UploadFile)"
            >
              重试
            </ElButton>
            <ElButton type="danger" link :disabled="disabled" @click="handleRemoveFile(file as UploadFile)">
              移除
            </ElButton>
          </div>
        </slot>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.ffm-upload {
  display: flex;
  flex-direction: column;
  gap: 12px;

  :deep(.el-upload) {
    width: 100%;
  }

  :deep(.el-upload-dragger) {
    width: 100%;
    padding: 0;
    background-color: transparent;
    border: 0;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.64;
  }

  &__dropzone {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    min-height: 168px;
    padding: 24px;
    text-align: center;
    background-color: var(--el-fill-color-lighter, #fafafa);
    border: 1px dashed var(--el-border-color, #dcdfe6);
    border-radius: var(--custom-radius, 6px);
    transition:
      border-color var(--el-transition-duration-fast, 0.2s),
      background-color var(--el-transition-duration-fast, 0.2s);

    &:hover {
      background-color: var(--el-color-primary-light-9, #ecf5ff);
      border-color: var(--el-color-primary, #409eff);
    }
  }

  &__dropzone-icon {
    width: 36px;
    height: 36px;
    color: var(--el-color-primary, #409eff);
  }

  &__dropzone-title {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
    color: var(--el-text-color-primary, #303133);
  }

  &__dropzone-description,
  &__tip {
    font-size: 13px;
    line-height: 20px;
    color: var(--el-text-color-secondary, #909399);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__file {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 12px;
    align-items: center;
    padding: 10px 12px;
    background-color: var(--el-fill-color-blank, #fff);
    border: 1px solid var(--el-border-color-lighter, #ebeef5);
    border-radius: var(--custom-radius, 6px);

    .el-progress {
      grid-column: 1 / -1;
    }
  }

  &__file-success {
    border-color: var(--el-color-success-light-7, #b3e19d);
  }

  &__file-fail {
    border-color: var(--el-color-danger-light-7, #fab6b6);
  }

  &__file-main {
    display: flex;
    min-width: 0;
    gap: 8px;
    align-items: center;
  }

  &__file-icon {
    flex: 0 0 auto;
    color: var(--el-text-color-secondary, #909399);
  }

  &__file-name {
    min-width: 0;
    padding: 0;
    overflow: hidden;
    font: inherit;
    color: var(--el-text-color-primary, #303133);
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    background: transparent;
    border: 0;

    &:hover {
      color: var(--el-color-primary, #409eff);
    }
  }

  &__file-meta {
    flex: 0 0 auto;
    font-size: 12px;
    color: var(--el-text-color-secondary, #909399);
  }

  &__file-actions {
    display: flex;
    flex: 0 0 auto;
    gap: 6px;
    align-items: center;
  }
}

@media (width <= 768px) {
  .ffm-upload {
    &__dropzone {
      min-height: 144px;
      padding: 18px;
    }

    &__file {
      grid-template-columns: 1fr;
    }

    &__file-actions {
      justify-content: flex-end;
    }
  }
}
</style>
