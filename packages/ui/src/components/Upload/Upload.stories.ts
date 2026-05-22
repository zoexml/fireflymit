import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { UploadRequestOptions, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
import Upload from './Upload.vue'

const meta: Meta<typeof Upload> = {
  title: 'UI/Upload',
  component: Upload,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text', description: '原生 accept 属性' },
    autoUpload: { control: 'boolean', description: '是否选择后自动上传' },
    drag: { control: 'boolean', description: '是否启用拖拽上传' },
    limit: { control: 'number', description: '最大上传数量' },
    maxSize: { control: 'number', description: '单个文件大小限制，单位 MB' },
    multiple: { control: 'boolean', description: '是否支持多选' },
  },
}

export default meta
type Story = StoryObj<typeof Upload>

const mockRequest = async (options: UploadRequestOptions) => {
  const total = 5

  for (let current = 1; current <= total; current += 1) {
    await new Promise(resolve => setTimeout(resolve, 160))
    options.onProgress({
      percent: Math.round((current / total) * 100),
    } as ProgressEvent & { percent: number })
  }

  options.onSuccess({ url: URL.createObjectURL(options.file) })
}

export const Basic: Story = {
  render: args => ({
    components: { Upload },
    setup() {
      const fileList = ref<UploadUserFile[]>([])

      return { args, fileList, mockRequest }
    },
    template: `
      <Upload
        v-model:file-list="fileList"
        v-bind="args"
        :http-request="mockRequest"
      />
    `,
  }),
  args: {
    multiple: true,
    accept: '.png,.jpg,.jpeg,.pdf',
    maxSize: 5,
    limit: 3,
    description: '支持图片和 PDF 文件',
  },
}

export const ButtonMode: Story = {
  render: args => ({
    components: { Upload },
    setup() {
      const fileList = ref<UploadUserFile[]>([])

      return { args, fileList }
    },
    template: `
      <Upload
        v-model:file-list="fileList"
        v-bind="args"
      />
    `,
  }),
  args: {
    drag: false,
    multiple: true,
    autoUpload: false,
    showClear: true,
    tip: '选择文件后可由业务侧统一提交',
  },
}
