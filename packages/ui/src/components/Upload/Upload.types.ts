import type {
  UploadProps as ElUploadProps,
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile,
} from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'

export type UploadListType = 'text' | 'picture' | 'picture-card'

export type UploadRejectReason = 'size' | 'type' | 'custom'

export const uploadProps = {
  /** 上传接口地址 */
  action: { type: String, default: '' },
  /** 上传字段名 */
  name: { type: String, default: 'file' },
  /** 请求头 */
  headers: { type: Object as PropType<ElUploadProps['headers']>, default: undefined },
  /** 附加请求数据 */
  data: { type: [Object, Function] as PropType<ElUploadProps['data']>, default: undefined },
  /** 请求方法 */
  method: { type: String as PropType<UploadRequestOptions['method']>, default: 'post' },
  /** 是否携带 Cookie */
  withCredentials: { type: Boolean, default: false },
  /** 是否支持多选 */
  multiple: { type: Boolean, default: false },
  /** 是否启用拖拽上传 */
  drag: { type: Boolean, default: true },
  /** 原生 accept 属性 */
  accept: { type: String, default: '' },
  /** 允许的文件类型，支持 .png、image/png、image 通配类型 */
  fileTypes: { type: Array as PropType<string[]>, default: () => [] },
  /** 最大上传数量 */
  limit: { type: Number, default: 5 },
  /** 单个文件大小限制，单位 MB；0 表示不限制 */
  maxSize: { type: Number, default: 10 },
  /** 列表展示类型 */
  listType: { type: String as PropType<UploadListType>, default: 'text' },
  /** 是否选择后自动上传 */
  autoUpload: { type: Boolean, default: false },
  /** 是否禁用 */
  disabled: { type: Boolean, default: false },
  /** 是否显示文件列表 */
  showFileList: { type: Boolean, default: true },
  /** 是否显示清空按钮 */
  showClear: { type: Boolean, default: true },
  /** 是否显示失败重试按钮 */
  showRetry: { type: Boolean, default: true },
  /** 超出数量限制时是否替换当前文件 */
  replaceOnExceed: { type: Boolean, default: false },
  /** 上传区标题 */
  title: { type: String, default: '拖拽文件到此处，或点击上传' },
  /** 上传区描述 */
  description: { type: String, default: '' },
  /** 选择文件按钮文案 */
  buttonText: { type: String, default: '选择文件' },
  /** 手动上传按钮文案 */
  submitText: { type: String, default: '开始上传' },
  /** 清空按钮文案 */
  clearText: { type: String, default: '清空' },
  /** 提示文案，为空时根据类型和大小自动生成 */
  tip: { type: String, default: '' },
  /** 自定义上传请求 */
  httpRequest: { type: Function as PropType<ElUploadProps['httpRequest']>, default: undefined },
  /** 上传前钩子 */
  beforeUpload: { type: Function as PropType<ElUploadProps['beforeUpload']>, default: undefined },
  /** 删除前钩子 */
  beforeRemove: { type: Function as PropType<ElUploadProps['beforeRemove']>, default: undefined },
} as const

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export interface UploadEmits {
  change: [file: UploadFile, files: UploadFiles]
  clear: []
  error: [error: Error, file: UploadFile, files: UploadFiles]
  exceed: Parameters<NonNullable<ElUploadProps['onExceed']>>
  preview: [file: UploadFile]
  progress: [event: UploadProgressEvent, file: UploadFile, files: UploadFiles]
  reject: [file: UploadRawFile, reason: UploadRejectReason]
  remove: [file: UploadFile, files: UploadUserFile[]]
  retry: [file: UploadFile]
  success: [response: unknown, file: UploadFile, files: UploadFiles]
}
