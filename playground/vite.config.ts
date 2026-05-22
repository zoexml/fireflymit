import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { FireflyMitResolver } from '../packages/ui/src/resolver'

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
      resolvers: [
        ElementPlusResolver(),
        FireflyMitResolver({ prefix: 'F', importStyle: false }),
      ],
      dts: './src/types/auto-import.d.ts',
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        FireflyMitResolver({ prefix: 'F', importStyle: false }),
      ],
      dts: './src/types/components.d.ts',
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolveRoot('./src') },
      { find: '~', replacement: resolveRoot('../packages/ui/src') },
      { find: /^@fireflymit\/ui\/resolver$/, replacement: resolveRoot('../packages/ui/src/resolver.ts') },
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
