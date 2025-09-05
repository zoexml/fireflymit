// import antfu from '@antfu/eslint-config'
// import type { Linter } from 'eslint'

// export interface FireflymitOptions extends Parameters<typeof antfu>[0] {}

// /**
//  * Fireflymit ESLint config preset
//  */
// export default function fireflymit(options: FireflymitOptions = {}): Linter.FlatConfig[] {
//   return antfu({
//     // 默认配置
//     type: 'lib',
//     typescript: true,
//     lessOpinionated: true,
//     unocss: true,
//     vue: true,
//     formatters: {
//       css: true,
//       html: true,
//       markdown: 'prettier',
//     },
//     ignores: [
//       '**/node_modules',
//       'pnpm-lock.yaml',
//       'dist*',
//     ],

//     // 默认规则
//     rules: {
//       'no-console': 'off',
//       'node/prefer-global/process': 'off',
//       'vue/attribute-hyphenation': 'off',
//       'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
//       curly: ['error', 'multi-line'],
//       'ts/explicit-function-return-type': 'off',
//       'unused-imports/no-unused-vars': 'off',
//     },

//     // 用户传入的配置可以覆盖
//     ...options,
//   })
// }
