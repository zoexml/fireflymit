import antfu from '@antfu/eslint-config'

/** @type {NonNullable<Parameters<typeof antfu>[0]>} */
export default function fireflymit(options = {}) {
  return antfu({
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
    ],
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'vue/attribute-hyphenation': 'off',
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'curly': ['error', 'multi-line'],
      'style/max-statements-per-line': 'off',
      'ts/explicit-function-return-type': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
    ...options,
  })
}
