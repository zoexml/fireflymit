import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { chunk, unique } from '@fireflymit/utils'

const meta: Meta = {
  title: '工具/Array',
}
export default meta
type Story = StoryObj

export const Demo: Story = {
  render: () => ({
    setup() {
      return {
        a: JSON.stringify(unique([1, 2, 2, 3, 3, 3, 4])),
        b: JSON.stringify(chunk([1, 2, 3, 4, 5, 6, 7], 3)),
      }
    },
    template: `
      <div style="max-width: 700px;">
        <h2 style="font-size:16px;font-weight:600;margin:0 0 4px;">unique</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">数组去重，使用 Set 实现</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">unique([1, 2, 2, 3, 3, 3, 4]) → {{ a }}</pre>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">chunk</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">将数组按指定大小分块</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">chunk([1, 2, 3, 4, 5, 6, 7], 3) → {{ b }}</pre>
      </div>
    `,
  }),
}
