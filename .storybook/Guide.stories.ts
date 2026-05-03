import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: '指南/快速开始',
}

export default meta
type Story = StoryObj

export const Guide: Story = {
  render: () => ({
    template: `
      <div style="max-width: 800px; line-height: 1.7;">
        <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 24px;">快速开始</h1>
        <p style="font-size: 16px; color: #666; margin-bottom: 32px;">
          @fireflymit 是一套基于 Vue 3 + Element Plus 的组件库和工具库，提供高质量的 UI 组件和实用工具函数。
        </p>

        <h2 style="font-size: 24px; font-weight: 600; margin: 32px 0 16px;">安装</h2>
        <h3 style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">前提条件</h3>
        <ul style="margin-bottom: 16px;">
          <li>Node.js >= 22</li>
          <li>Vue 3.x</li>
          <li>Element Plus >= 2.11.4</li>
        </ul>

        <h3 style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">安装 UI 组件库</h3>
        <pre style="background: #f6f8fa; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 14px;">pnpm add @fireflymit/ui element-plus</pre>

        <h3 style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">安装工具库</h3>
        <pre style="background: #f6f8fa; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 14px;">pnpm add @fireflymit/utils</pre>

        <h2 style="font-size: 24px; font-weight: 600; margin: 32px 0 16px;">使用</h2>
        <h3 style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">注册</h3>
        <p style="margin: 16px 0;">在 <code style="background: #f6f8fa; padding: 2px 6px; border-radius: 4px;">main.ts</code> 中注册：</p>
        <pre style="background: #f6f8fa; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 14px;">import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@fireflymit/ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')</pre>

        <h3 style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">引入组件</h3>
        <pre style="background: #f6f8fa; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 14px;">&lt;script setup lang="ts"&gt;
import { Badge, CountTo, SvgIcon } from '@fireflymit/ui'
&lt;/script&gt;

&lt;template&gt;
  &lt;Badge type="primary" text="primary" /&gt;
  &lt;CountTo :target="1000" :duration="2000" /&gt;
  &lt;SvgIcon icon="ri:home-line" /&gt;
&lt;/template&gt;</pre>

        <h3 style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">使用工具函数</h3>
        <pre style="background: #f6f8fa; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 14px;">import { capitalize, hideMobile, copyToClipboard } from '@fireflymit/utils'

capitalize('hello') // 'Hello'
hideMobile('13812345678') // '138****5678'
copyToClipboard('Hello World') // Promise&lt;void&gt;</pre>
      </div>
    `,
  }),
}
