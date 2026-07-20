import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { copyToClipboard, hideMobile, parseQuery, randomColor } from '@fireflymit/utils'

const meta: Meta = {
  title: '工具/Tools',
}
export default meta
type Story = StoryObj

export const Demo: Story = {
  render: () => ({
    setup() {
      return {
        a: hideMobile('13812345678'),
        c1: randomColor(),
        c2: randomColor(),
        d: JSON.stringify(parseQuery('https://example.com/?name=firefly&page=1&size=20'), null, 2),
        e: JSON.stringify(parseQuery('a=hello&b=world'), null, 2),
      }
    },
    methods: {
      async handleCopy() {
        try {
          await copyToClipboard('Hello from @fireflymit/utils!')
          console.info('复制成功！')
        } catch { console.error('复制失败') }
      },
    },
    template: `
      <div style="max-width: 700px;">
        <h2 style="font-size:16px;font-weight:600;margin:0 0 4px;">hideMobile</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">手机号脱敏，隐藏中间四位</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">hideMobile('13812345678') → "{{ a }}"</pre>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">copyToClipboard</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">将文本复制到剪贴板，返回 Promise</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">await copyToClipboard('Hello World')</pre>
        <button @click="handleCopy" style="margin-top:6px;padding:4px 14px;cursor:pointer;border:1px solid #d0d5dd;border-radius:4px;background:#fff;font-size:13px;">点我复制</button>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">randomColor</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">生成随机十六进制颜色值</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">randomColor() → "{{ c1 }}"
randomColor() → "{{ c2 }}"</pre>
        <div style="display:flex;gap:8px;margin-top:6px;">
          <span :style="{ display:'inline-block',width:28,height:28,borderRadius:4,background:c1,border:'1px solid #ddd' }"></span>
          <span :style="{ display:'inline-block',width:28,height:28,borderRadius:4,background:c2,border:'1px solid #ddd' }"></span>
        </div>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">parseQuery</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">解析 URL 中的查询参数，返回键值对对象</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">parseQuery('https://example.com/?name=firefly&page=1&size=20')
→ {{ d }}

parseQuery('a=hello&b=world')
→ {{ e }}</pre>
      </div>
    `,
  }),
}
