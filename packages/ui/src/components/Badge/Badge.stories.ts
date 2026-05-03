import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './Badge.vue'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'error'],
      description: '徽章类型',
    },
    text: { control: 'text', description: '徽章文本' },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    type: 'primary',
    text: 'primary',
  },
}

export const Success: Story = {
  args: {
    type: 'success',
    text: 'success',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    text: 'warning',
  },
}

export const Info: Story = {
  args: {
    type: 'info',
    text: 'info',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    text: 'error',
  },
}

export const AllTypes: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      const badgeTypes = ['primary', 'success', 'warning', 'info', 'error'] as const
      return { badgeTypes }
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <Badge v-for="type in badgeTypes" :key="type" :type="type" :text="type" />
      </div>
    `,
  }),
}
