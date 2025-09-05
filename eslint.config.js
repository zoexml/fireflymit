import antfu from '@antfu/eslint-config'

export default antfu({
  // Type of the project. 'lib' for libraries, the default is 'app'
  type: 'lib',
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    semi: false,
    jsx: true,
  },
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off', // process is not global in node
    'vue/attribute-hyphenation': 'off', // 属性允许使用驼峰命名
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }], // if-else 格式
    'curly': ['error', 'multi-line'], // 允许单行 if/else 无 {}
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
