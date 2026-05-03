/*
 * @FilePath: vitest.config.ts
 * @Description: 单元测试配置 pnpm i vitest -Dw
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
  },
})

// // "test": "vitest test", // 执行测试
// // "coverage": "vitest run --coverage" // 执行测试覆盖率，需要安装 @vitest/coverage-c8
