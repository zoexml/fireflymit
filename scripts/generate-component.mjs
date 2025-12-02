#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取组件名称
const componentName = process.argv[2]

if (!componentName) {
  console.error('请提供组件名称: pnpm generate:component ComponentName')
  process.exit(1)
}

// 验证组件名称格式
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('组件名称必须以大写字母开头，只能包含字母和数字')
  process.exit(1)
}

const componentDir = join(__dirname, '../packages/ui/src/components', componentName)
// const prefixed = 'Art'

// 检查组件是否已存在
if (existsSync(componentDir)) {
  console.error(`组件 ${componentName} 已存在`)
  process.exit(1)
}

// 创建组件目录
mkdirSync(componentDir, { recursive: true })

// 组件模板
const vueTemplate = `<script setup lang="ts">
import type { ${componentName}Emits, ${componentName}Props } from './${componentName}.types'
import { createNamespace } from '~/_utils'

defineOptions({ name: 'Art${componentName}' })

const props = defineProps<${componentName}Props>()
const emit = defineEmits<${componentName}Emits>()

const [className, bem] = createNamespace('${componentName.toLowerCase()}')
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>

<style lang="scss">
@use './${componentName}.scss' as *;
</style>
`

const typesTemplate = `export interface ${componentName}Props {
  // 在这里定义组件的 props
}

export interface ${componentName}Emits {
  // 在这里定义组件的 emits
}
`

const scssTemplate = `.art-${componentName.toLowerCase()} {
  // 在这里添加组件样式
}
`

const indexTemplate = `import { withInstall } from '~/_utils'
import _${componentName} from './${componentName}.vue'

export const ${componentName} = withInstall(_${componentName})
export default ${componentName}

export * from './${componentName}.types'

// 添加类型, 可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents {
    Art${componentName}: typeof ${componentName}
  }
}
`

// const testTemplate = `import { describe, it, expect } from 'vitest';
// import { mount } from '@vue/test-utils';
// import ${componentName} from '../${componentName}.vue';
// import type { ${componentName}Props } from '../${componentName}.types';

// describe('${componentName}', () => {
//   it('renders correctly', () => {
//     const wrapper = mount(${componentName});

//     expect(wrapper.classes()).toContain('v-${componentName.toLowerCase()}');
//   });

//   // 在这里添加更多测试用例
// });
// `

// 写入文件
writeFileSync(join(componentDir, `${componentName}.vue`), vueTemplate)
writeFileSync(join(componentDir, `${componentName}.types.ts`), typesTemplate)
writeFileSync(join(componentDir, `${componentName}.scss`), scssTemplate)
writeFileSync(join(componentDir, 'index.ts'), indexTemplate)

// 创建测试目录和文件
// const testDir = join(componentDir, '__tests__')
// mkdirSync(testDir, { recursive: true })
// writeFileSync(join(testDir, `${componentName}.spec.ts`), testTemplate)

// 更新组件导出
const componentsIndexPath = join(__dirname, '../packages/ui/src/components/index.ts')
const componentsIndex = readFileSync(componentsIndexPath, 'utf-8')

const newExport = `export * from './${componentName}'`
const updatedIndex = `${componentsIndex.trim()}\n${newExport}\n`

writeFileSync(componentsIndexPath, updatedIndex)

console.log(`✅ 组件 ${componentName} 创建成功！`)
console.log(`📁 位置: packages/ui/src/components/${componentName}`)
console.log(`📝 请记得在 packages/ui/src/components/installer.ts 中注册新组件`)
