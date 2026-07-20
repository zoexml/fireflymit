import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { getMonthAndWeek } from '@fireflymit/utils'

const meta: Meta = {
  title: '工具/Date',
}
export default meta
type Story = StoryObj

export const Demo: Story = {
  render: () => ({
    setup() {
      return { a: JSON.stringify(getMonthAndWeek('2026-07-20')) }
    },
    template: `
      <div style="max-width: 700px;">
        <h2 style="font-size:16px;font-weight:600;margin:0 0 4px;">getMonthAndWeek</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">根据日期字符串计算该日期在当月的第几周（周一为每周第一天）</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">getMonthAndWeek('2026-07-20') → {{ a }}</pre>
      </div>
    `,
  }),
}
