import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export default function (plop) {
  // 获取当前文件夹路径
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  // 注册 helper，生成小写 class
  plop.setHelper('lowercase', text => text.toLowerCase())

  plop.setGenerator('component', {
    description: 'Generate a Vue component with types, styles, index, and tests',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入组件名称（以大写字母开头）',
        validate: (value) => {
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return '组件名称必须以大写字母开头，只能包含字母和数字'
          }
          return true
        },
      },
    ],
    actions: (data) => {
      const componentPath = join(
        __dirname,
        'packages/ui/src/components/{{name}}',
      )

      return [
        // 创建 Vue 文件
        {
          type: 'add',
          path: join(componentPath, '{{name}}.vue'),
          templateFile: 'plop-templates/component.vue.hbs',
        },
        // 创建 types 文件
        {
          type: 'add',
          path: join(componentPath, '{{name}}.types.ts'),
          templateFile: 'plop-templates/component.types.hbs',
        },
        // 创建 scss 文件
        {
          type: 'add',
          path: join(componentPath, '{{name}}.scss'),
          templateFile: 'plop-templates/component.scss.hbs',
        },
        // 创建 index 文件
        {
          type: 'add',
          path: join(componentPath, 'index.ts'),
          templateFile: 'plop-templates/component.index.hbs',
        },
        // 创建测试文件
        {
          type: 'add',
          path: join(componentPath, '__tests__', '{{name}}.spec.ts'),
          templateFile: 'plop-templates/component.spec.hbs',
        },
        // 更新 components/index.ts
        {
          type: 'modify',
          path: join(__dirname, 'packages/ui/src/components/index.ts'),
          pattern: /(\/\/ PLOP_EXPORTS)/,
          template: '$1\nexport * from \'./{{name}}\';',
        },
      ]
    },
  })
}
