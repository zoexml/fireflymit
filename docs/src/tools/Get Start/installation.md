# Installation

## 📦 安装

### utils/hooks

::: code-group

```bash [pnpm]
pnpm add @fireflymit/utils
```

```bash [yarn]
yarn add @fireflymit/utils
```

```bash [npm]
npm install @fireflymit/utils
```

:::

## 🤔 常见问题、反馈

问题：如果自己项目中的函数与 `@fireflymit/utils` 内部的函数名称冲突怎么办？
答：这种问题很常见，可以使用 `ES6` 提供的 `as` 关键字来为导入的函数重命名，如下：

```ts
import { cloneDeep as _cloneDeep } from '@fireflymit/utils'

_cloneDeep()
```

[反馈问题、新增需求](https://github.com/Joetoo/fireflymit/issues/new)

## 🔔 温馨提示

本站大部分图片使用`Github`静态资源。如遇加载空白或加载图片失败时，刷新几次即可
