import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off', // process is not global in node
    'vue/attribute-hyphenation': 'off', // 属性允许使用驼峰命名
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }], // if-else 格式
    'curly': ['error', 'multi-line'], // 允许单行 if/else 无 {}
    'ts/explicit-function-return-type': 'off', // 允许隐式返回类型
    'unused-imports/no-unused-vars': 'off', // 允许未使用的变量
  },
  typescript: true,
  lessOpinionated: true,
  unocss: true,
  vue: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: [
    '**/node_modules',
    'pnpm-lock.yaml',
    'dist*',
    // ...globs
  ],
})
