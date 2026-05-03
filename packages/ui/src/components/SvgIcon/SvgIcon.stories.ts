import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SvgIcon from './SvgIcon.vue'

const meta: Meta<typeof SvgIcon> = {
  title: 'UI/SvgIcon',
  component: SvgIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text', description: 'Iconify 图标名称' },
  },
}

export default meta
type Story = StoryObj<typeof SvgIcon>

export const Default: Story = {
  args: {
    icon: 'ri:home-line',
  },
}

export const RemixIcons: Story = {
  args: {
    icon: 'ri:github-fill',
  },
}
