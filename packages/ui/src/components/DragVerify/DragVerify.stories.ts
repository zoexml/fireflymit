import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { shallowRef, useTemplateRef } from 'vue'
import DragVerify from './DragVerify.vue'

interface DragVerifyExpose {
  reset: () => void
}

const meta: Meta<typeof DragVerify> = {
  title: 'UI/DragVerify',
  component: DragVerify,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '拖拽验证滑块。`width` 支持 `number` 像素值，也支持 `100%`、`20rem` 等 CSS 长度。',
      },
    },
  },
  argTypes: {
    'modelValue': { control: 'boolean', description: '是否验证通过' },
    'width': {
      control: 'text',
      description: '滑块宽度，支持 number 像素值或 CSS 长度字符串',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '250' },
      },
    },
    'height': { control: 'number', description: '滑块高度' },
    'text': { control: 'text', description: '默认提示文案' },
    'successText': { control: 'text', description: '验证成功文案' },
    'background': { control: 'color', description: '默认背景色' },
    'progressBarBg': { control: 'color', description: '进度条背景色' },
    'circle': { control: 'boolean', description: '是否使用圆角胶囊形态' },
    'radius': { control: 'text', description: '圆角' },
    'handlerIcon': { control: 'text', description: '滑块图标' },
    'successIcon': { control: 'text', description: '成功图标' },
    'handlerBg': { control: 'color', description: '滑块按钮背景色' },
    'textSize': { control: 'text', description: '文案字号' },
    'textColor': { control: 'color', description: '默认文案颜色' },
    'border': { control: 'text', description: '边框' },
    'onUpdate:modelValue': { action: 'update:modelValue', description: '验证状态变化时触发' },
    'onHandlerMove': { action: 'handlerMove', description: '开始拖动滑块时触发' },
    'onPassFail': { action: 'passFail', description: '验证失败时触发' },
    'onPassCallback': { action: 'passCallback', description: '验证成功时触发，参数为验证耗时秒数' },
  },
}

export default meta
type Story = StoryObj<typeof DragVerify>

export const Default: Story = {
  args: {
    modelValue: false,
    width: 250,
    height: 40,
    text: '请按住滑块拖动',
    successText: '验证通过',
  },
}

export const ResponsiveWidth: Story = {
  args: {
    modelValue: false,
    width: '100%',
    height: 40,
    text: '拖动以验证',
    successText: '验证通过',
  },
  render: args => ({
    components: { DragVerify },
    setup() {
      const passed = shallowRef(false)
      return { args, passed }
    },
    template: `
      <div style="width: 100%; max-width: 640px; padding: 16px; border: 1px solid var(--el-border-color); border-radius: 8px;">
        <DragVerify v-bind="args" v-model="passed" width="100%" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '`width="100%"` 会跟随父容器宽度变化，适合响应式布局。使用时请确保父容器有明确宽度。',
      },
    },
  },
}

export const FixedWidth: Story = {
  args: {
    modelValue: false,
    width: 320,
    height: 40,
    text: '固定 320px 宽度',
    successText: '验证通过',
  },
}

export const Resettable: Story = {
  render: () => ({
    components: { DragVerify },
    setup() {
      const passed = shallowRef(false)
      const dragVerifyRef = useTemplateRef<DragVerifyExpose>('dragVerifyRef')
      return { dragVerifyRef, passed }
    },
    template: `
      <div style="display: grid; gap: 12px; width: 100%; max-width: 640px;">
        <DragVerify ref="dragVerifyRef" v-model="passed" width="100%" text="拖动以验证" success-text="验证通过" />
        <button type="button" style="width: max-content;" @click="dragVerifyRef?.reset()">重置</button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '通过组件实例暴露的 `reset()` 方法重置验证状态。',
      },
    },
  },
}
