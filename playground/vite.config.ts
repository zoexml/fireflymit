import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const root = import.meta.dirname
const resolveRoot = (path: string) => resolve(root, path)

const workspacePackages = ['hooks', 'utils', 'ui'] as const
const workspaceAliases = workspacePackages.map(packageName => ({
  find: new RegExp(`^@fireflymit/${packageName}$`),
  replacement: resolveRoot(`../packages/${packageName}/src/index.ts`),
}))

export default defineConfig({
  plugins: [
    Unocss(),
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      dts: './src/types/auto-import.d.ts',
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolveRoot('./src') },
      { find: '~', replacement: resolveRoot('../packages/ui/src') },
      ...workspaceAliases,
    ],
  },
  server: {
    port: 4444,
  },
  optimizeDeps: {
    include: ['vue', 'element-plus'],
  },
})
