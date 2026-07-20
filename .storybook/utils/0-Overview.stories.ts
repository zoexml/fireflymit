import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: '工具/Overview',
}
export default meta
type Story = StoryObj

export const Overview: Story = {
  render: () => ({
    setup() {
      const modules = [
        { name: 'String', fns: ['capitalize', 'camelToKebab', 'isString', 'randomString'] },
        { name: 'Array', fns: ['unique', 'chunk'] },
        { name: 'Date', fns: ['getMonthAndWeek'] },
        { name: 'DOM', fns: ['textIsOverflow', 'hideElement', 'removeTag'] },
        { name: 'Tools', fns: ['hideMobile', 'copyToClipboard', 'randomColor', 'parseQuery'] },
        { name: 'Validate', fns: ['validatePhone', 'validateEmail', 'validateChineseIDCard', 'validateBankCard', '...'] },
        { name: 'Dev', fns: ['devWarn'] },
      ]
      return { modules }
    },
    template: `
      <div style="max-width: 700px;">
        <h1 style="font-size:28px;font-weight:700;margin-bottom:6px;">@fireflymit/utils</h1>
        <p style="color:#666;font-size:14px;margin:0 0 24px;">实用工具函数库，无框架依赖，支持 Tree Shaking。</p>

        <h2 style="font-size:16px;font-weight:600;margin:0 0 12px;">安装</h2>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;margin:0 0 24px;">pnpm add @fireflymit/utils</pre>

        <h2 style="font-size:16px;font-weight:600;margin:0 0 12px;">使用</h2>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;margin:0 0 24px;">import { capitalize, hideMobile, copyToClipboard } from '@fireflymit/utils'

capitalize('hello')           // 'Hello'
hideMobile('13812345678')     // '138****5678'
copyToClipboard('Hello World') // Promise&lt;void&gt;</pre>

        <h2 style="font-size:16px;font-weight:600;margin:0 0 12px;">模块总览</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f6f8fa;text-align:left;">
              <th style="padding:8px 12px;border:1px solid #e5e7eb;">模块</th>
              <th style="padding:8px 12px;border:1px solid #e5e7eb;">函数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in modules" :key="m.name">
              <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">{{ m.name }}</td>
              <td style="padding:8px 12px;border:1px solid #e5e7eb;">
                <code v-for="(fn,i) in m.fns" :key="fn"
                  :style="{ background: i===0?'#f0f5ff':'transparent', padding:'1px 5px', borderRadius:4, fontSize:12, marginRight:'2px' }">
                  {{ fn }}<span v-if="i<m.fns.length-1">, </span>
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
}
