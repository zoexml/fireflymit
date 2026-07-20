import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { camelToKebab, capitalize, isString, randomString } from '@fireflymit/utils'

const meta: Meta = {
  title: '工具/String',
}
export default meta
type Story = StoryObj

export const Demo: Story = {
  render: () => ({
    setup() {
      return {
        a: capitalize('hello world'),
        b: camelToKebab('helloWorld'),
        c: camelToKebab('camelToKebabExample'),
        d1: isString('hello'),
        d2: isString(123),
        e: randomString(16),
      }
    },
    template: `
      <div style="max-width: 700px;">
        <h2 style="font-size:16px;font-weight:600;margin:0 0 4px;">capitalize</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">首字母大写</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">capitalize('hello world') → "{{ a }}"</pre>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">camelToKebab</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">驼峰转短横线</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">camelToKebab('helloWorld') → "{{ b }}"
camelToKebab('camelToKebabExample') → "{{ c }}"</pre>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">isString</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">判断值是否为字符串类型</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">isString('hello') → {{ d1 }}
isString(123) → {{ d2 }}</pre>

        <h2 style="font-size:16px;font-weight:600;margin:20px 0 4px;">randomString</h2>
        <p style="color:#666;font-size:13px;margin:0 0 8px;">生成指定长度的随机字符串（字母+数字）</p>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">randomString(16) → "{{ e }}"</pre>
      </div>
    `,
  }),
}
