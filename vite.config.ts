import path from 'node:path'
import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [

  ],
  resolve: {
    alias: {
      '@fireflymit/ui': path.resolve(__dirname, 'packages/ui/src'),
    },
  },
})
