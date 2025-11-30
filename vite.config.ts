import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [

  ],
  resolve: {
    alias: {
      '@fireflymit/ui': path.resolve(__dirname, 'packages/ui/src'),
      '@fireflymit/utils': path.resolve(__dirname, 'packages/utils/src'),
    },
  },
})
