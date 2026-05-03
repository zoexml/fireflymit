import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Banner from './Banner.vue'

const meta: Meta<typeof Banner> = {
  title: 'UI/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '标题' },
    subtitle: { control: 'text', description: '副标题' },
    dark: { control: 'boolean', description: '暗色模式' },
    decoration: { control: 'boolean', description: '是否显示装饰' },
  },
}

export default meta
type Story = StoryObj<typeof Banner>

export const Default: Story = {
  args: {
    title: 'Art Design Pro',
    subtitle: '一款兼具设计美学与高效开发的后台系统',
  },
  decorators: [
    story => ({
      components: { story },
      template: `<div style="overflow: hidden; border-radius: 8px; background: linear-gradient(135deg, #409eff 0%, #337ecc 100%)"><story /></div>`,
    }),
  ],
}

export const CustomColor: Story = {
  args: {
    title: '自定义颜色',
    subtitle: '支持自定义标题、副标题和按钮颜色',
    titleColor: '#333',
    subtitleColor: '#666',
    buttonConfig: {
      show: true,
      text: '立即体验',
      color: '#67c23a',
      textColor: '#fff',
    },
  },
  decorators: [
    story => ({
      components: { story },
      template: `<div style="overflow: hidden; border-radius: 8px; background: #D4F1F7"><story /></div>`,
    }),
  ],
}

export const MeteorEffect: Story = {
  args: {
    title: '流星动画',
    subtitle: '背景带有流星动画装饰效果',
    dark: true,
    meteorConfig: { enabled: true, count: 15 },
  },
  decorators: [
    story => ({
      components: { story },
      template: `<div style="overflow: hidden; border-radius: 8px; background: #1a1a2e"><story /></div>`,
    }),
  ],
}
