import type { StorybookConfig } from '@storybook/vue3-vite'

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const uiSrc = resolve(repoRoot, 'packages/ui/src')

const config: StorybookConfig = {
  stories: [
    '../.storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/hooks/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/utils/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/utils/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],
  framework: getAbsolutePath('@storybook/vue3-vite'),
  docs: {},
  async viteFinal(config) {
    const { default: vue } = await import('@vitejs/plugin-vue')
    const { default: vueJsx } = await import('@vitejs/plugin-vue-jsx')
    config.plugins = config.plugins || []
    config.plugins.push(vue(), vueJsx())
    config.plugins.push(AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: false,
      vueTemplate: true,
    }))
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': uiSrc,
    }
    return config
  },
}

export default config
