import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: '@fireflymit/utils', // 测试名称
          root: './src/views/Utils/__test__', // 测试根目录
          include: ['array.spec.ts'], // 只测这个文件，测全部可以注释掉
        },
      },
    ],
  },
})
