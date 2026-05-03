import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CardBanner from './CardBanner.vue'

const meta: Meta<typeof CardBanner> = {
  title: 'UI/CardBanner',
  component: CardBanner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CardBanner>

export const Default: Story = {
  args: {
    title: '卡片横幅',
    description: '这是一款卡片样式的横幅组件，支持标题和描述展示',
  },
  decorators: [
    story => ({
      components: { story },
      template: `<div style="border-radius: 12px; background: #f9f9f9; padding: 24px;"><story /></div>`,
    }),
  ],
}

export const WithButtons: Story = {
  args: {
    title: '自定义按钮',
    description: '支持主按钮和取消按钮的配置',
    button: {
      show: true,
      text: '查看详情',
      color: '#67c23a',
      textColor: '#fff',
    },
    cancelButton: {
      show: true,
      text: '稍后再说',
      color: '#f5f5f5',
      textColor: '#666',
    },
  },
  decorators: [
    story => ({
      components: { story },
      template: `<div style="border-radius: 12px; background: #f9f9f9; padding: 24px;"><story /></div>`,
    }),
  ],
}
