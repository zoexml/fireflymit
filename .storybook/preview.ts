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
  },
}

export const decorators = [
  (story: () => any) => ({
    components: { story },
    template: '<div style="padding: 20px"><story /></div>',
  }),
]

export default preview
