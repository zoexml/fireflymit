# @fireflymit/scaffold

一键给新项目或已有项目套上 fireflymit 团队工程规范（ESLint / Prettier / TS / Stylelint / Commitlint / Git hooks / Turborepo / VSCode / GitHub Actions）。

## 安装

包内置在 monorepo 里。在仓库根目录直接跑即可：

```bash
pnpm --filter @fireflymit/scaffold firefly --help
```

或者把 bin 暴露到 PATH：

```bash
pnpm --filter @fireflymit/scaffold exec firefly --help
```

如果要从外部项目调用（不推荐目前，bin 入口直接走源码），需要先 build。

## 命令

### `firefly init <target>`

用预设（preset）初始化一个新项目，自动写入 `package.json` 并应用预设里的全部 config，最后跑 `pnpm install`。

```bash
# 交互式选择 preset（默认 vue-monorepo）
firefly init my-app

# 指定 preset，跳过交互
firefly init my-app --preset vue-monorepo --yes

# 指定包名 + preset
firefly init my-app --preset node-lib --name @scope/my-lib --yes
```

### `firefly apply <target>`

往已有项目里增量添加 config，可以选单个、多个、或整个 preset。

```bash
# 应用整个 preset
firefly apply . --preset node-lib --yes

# 应用全部
firefly apply . --all --yes

# 应用指定几个
firefly apply . --config eslint,typescript,git-hooks --yes
```

### `firefly --help` / `firefly --version`

打印帮助 / 版本。

## Preset 列表

| preset         | framework | monorepo | 包含                                                                                                  |
| -------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `vue-monorepo` | vue       | ✅       | eslint + prettier + typescript + stylelint + commitlint + git-hooks + turbo + vscode + github-actions |
| `node-lib`     | node      | ❌       | eslint + prettier + typescript + commitlint + git-hooks + vscode                                      |
| `basic`        | node      | ❌       | eslint + prettier + commitlint + git-hooks                                                            |

## Config 列表

每个 config 对应一个或一组模板文件：

| config id        | 输出                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `eslint`         | `eslint.config.js`                                                                                            |
| `prettier`       | `.prettierrc.json`                                                                                            |
| `typescript`     | `tsconfig.json`（按 preset 切换 extends）                                                                     |
| `stylelint`      | `.stylelintrc.js`（仅 vue-monorepo）                                                                          |
| `commitlint`     | `commitlint.config.js`                                                                                        |
| `git-hooks`      | 合并到 `package.json.simpleGitHooks` / `lint-staged`（monorepo 时用 `pnpm lint-staged`，否则 `eslint --fix`） |
| `turbo`          | `turbo.json`（仅 vue-monorepo）                                                                               |
| `vscode`         | `.vscode/settings.json` + `.vscode/extensions.json`                                                           |
| `github-actions` | `.github/workflows/ci.yml`（仅 vue-monorepo）                                                                 |

## 模板语法

模板文件用 `{{var}}` 占位 + `{{#if var}}…{{/if}}` / `{{#unless var}}…{{/unless}}` 条件块。

```
hello {{projectName | Anonymous}}
{{#if monorepo}}workspaces: ["packages/*"]{{/if}}
```

可用变量：

- `projectName` — 项目名（默认从现有 `package.json.name` 派生）
- `year` — 当前年份
- `monorepo` — 是否 monorepo（bool）
- `framework` — `vue` / `node` / `react`
- `preset` — preset id

## 添加新 preset

1. 在 `templates/<preset>/` 下放模板文件（文件后缀 `.tpl`，渲染时会去掉）
2. 在 `src/utils/presets.js` 的 `PRESETS` 对象里加一条（新 preset 的 framework/monorepo 会被 `resolvePreset()` 用来推断模板目录）
3. 在 `src/utils/presets.js` 的 `CONFIGS` 对象里加新 config id（如有）
4. 在 `src/commands/apply.js` 的 `applyConfig()` 里加对应分支（否则会走 default 分支抛 `CliError`）

## 开发

```bash
pnpm --filter @fireflymit/scaffold test          # vitest
pnpm --filter @fireflymit/scaffold typecheck     # tsc --noEmit
pnpm --filter @fireflymit/scaffold firefly --help
```

## 目录结构

```
packages/scaffold/
├── src/
│   ├── cli.js              # CLI 入口
│   ├── splash.js           # 启动画面
│   ├── version.js          # 版本号读取
│   ├── commands/
│   │   ├── apply.js        # apply 子命令
│   │   └── init.js         # init 子命令
│   └── utils/
│       ├── detect.js       # 项目类型探测
│       ├── presets.js      # preset / config 定义
│       ├── errors.js       # 共享错误类
│       └── templates.js    # 模板渲染
├── templates/
│   ├── vue-monorepo/       # 9 个 .tpl 文件
│   ├── node-lib/           # 5 个 .tpl 文件
│   └── basic/              # 3 个 .tpl 文件
└── __tests__/
    ├── templates.test.js   # 渲染器单元测试
    ├── presets.test.js     # preset 注册表测试
    └── apply.test.js       # 端到端 apply 测试
```
