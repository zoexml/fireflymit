import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { removeTag } from '@fireflymit/utils'

const meta: Meta = {
  title: '工具/DOM',
}
export default meta
type Story = StoryObj

export const Demo: Story = {
  render: () => ({
    setup() {
      return { a: removeTag('<p>Hello <strong>World</strong></p>') }
    },
    template: `
      <div style="max-width: 700px;">
        <h2 style="font-size:16px;font-weight:600;margin:0 0 4px;">textIsOverflow</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">检查 DOM 元素中的文本是否溢出容器</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">textIsOverflow(element) → boolean</pre>
        <div style="width:200px;overflow:hidden;white-space:nowrap;border:1px solid #ddd;padding:8px;margin:8px 0;border-radius:4px;">
          这是一段很长很长很长很长很长很长很长很长很长的文本
        </div>
        <p style="color:#888;font-size:12px;margin:0 0 16px;">↑ 超出灰色边框则返回 true</p>

        <h2 style="font-size:16px;font-weight:600;margin:0 0 4px;">hideElement</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">隐藏 HTML 元素。第二个参数控制是否移出文档流</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">hideElement(el)        // visibility: hidden（保留占位）
hideElement(el, true) // display: none（移出文档流）</pre>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">removeTag</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">去除字符串中的 HTML 标签，返回纯文本</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">removeTag('&lt;p&gt;Hello &lt;strong&gt;World&lt;/strong&gt;&lt;/p&gt;') → "{{ a }}"</pre>
      </div>
    `,
  }),
}
