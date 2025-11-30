/*
 * @FilePath: vitest.config.ts
 * @Description: 单元测试配置 pnpm i vitest -Dw
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    //       // ui的单元测试
    //       '@yhclt/ui': resolve(__dirname, 'packages/ui/src/index.ts'),
    //       // utils的单元测试
    //       '@yhclt/utils': resolve(__dirname, 'packages/utils/src/index.ts'),
    },
  },
})

// // "test": "vitest test", // 执行测试
// // "coverage": "vitest run --coverage" // 执行测试覆盖率，需要安装 @vitest/coverage-c8
