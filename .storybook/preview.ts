/// <reference types="vite/client" />
import type { Preview } from '@storybook/vue3-vite'
import 'element-plus/dist/index.css'
import '@fireflymit/ui/dist/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a: { title: string }, b: { title: string }) => {
        const order = ['指南', 'UI', '工具']
        const aGroup = order.findIndex(o => a.title.startsWith(o))
        const bGroup = order.findIndex(o => b.title.startsWith(o))
        if (aGroup !== -1 && bGroup !== -1) return aGroup - bGroup
        if (aGroup !== -1) return -1
        if (bGroup !== -1) return 1
        if (a.title.startsWith('工具/') && b.title.startsWith('工具/')) {
          if (a.title.includes('总览')) return -1
          if (b.title.includes('总览')) return 1
        }
        return a.title.localeCompare(b.title)
      },
    },
  },
}

export const decorators = [
  (story: () => any) => ({
    components: { story },
    template: '<div style="padding: 20px"><story /></div>',
  }),
]

export default preview
