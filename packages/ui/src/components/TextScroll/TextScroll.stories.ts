import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TextScroll from './TextScroll.vue'

const meta: Meta<typeof TextScroll> = {
  title: 'UI/TextScroll',
  component: TextScroll,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: '滚动文本' },
    type: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: '类型',
    },
    direction: {
      control: 'select',
      options: ['left', 'right', 'up', 'down'],
      description: '滚动方向',
    },
    speed: { control: 'number', description: '滚动速度' },
    showClose: { control: 'boolean', description: '显示关闭按钮' },
  },
}

export default meta
type Story = StoryObj<typeof TextScroll>

export const Default: Story = {
  args: {
    text: 'Art Design Pro 是一款兼具设计美学与高效开发的后台系统',
    showClose: true,
  },
}

export const Success: Story = {
  args: {
    text: '这是一条成功类型的滚动公告',
    type: 'success',
  },
}

export const Warning: Story = {
  args: {
    text: '这是一条警告类型的滚动公告',
    type: 'warning',
  },
}

export const Danger: Story = {
  args: {
    text: '这是一条危险类型的滚动公告',
    type: 'danger',
  },
}
