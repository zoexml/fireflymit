# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies (pnpm required)
pnpm install

# Development
pnpm dev                    # Run all dev servers via Turbo
pnpm dev:play               # Run playground dev server only
pnpm dev:docs               # Run VitePress docs

# Build
pnpm build                  # Build all packages via Turbo
pnpm build:ui               # Build UI components only
pnpm build:utils            # Build utils only
pnpm build:commitlint       # Build commitlint config

# Lint & Format
pnpm lint                   # ESLint check
pnpm lint:fix               # ESLint auto-fix
pnpm format                 # Prettier format

# Test (in playground package)
pnpm test                   # Run vitest
pnpm test:coverage          # Run with coverage

# Package-specific commands
pnpm <cmd> --filter <package>  # Run cmd for specific package
pnpm dev --filter @fireflymit/ui
```

## Architecture Overview

**Monorepo Structure** (pnpm workspaces + Turborepo)

```
fireflymit/
├── packages/
│   ├── ui/                    # Vue 3 UI component library (Element Plus based)
│   ├── utils/                 # Utility functions library
│   ├── hooks/                 # Vue composables
│   ├── shared/                # Shared code
│   └── lint-configs/          # Shared lint configs (eslint, prettier, stylelint, typescript, commitlint)
├── playground/                # Vue 3 app for testing components
├── docs/                      # VitePress documentation
└── turbo.json                 # Turborepo pipeline config
```

**Tech Stack**

- Vue 3 + TypeScript
- Element Plus (UI foundation)
- UnoCSS (atomic CSS)
- Vitest (testing)
- Vite (build)
- ESLint (antfu config) + Prettier + Stylelint

**Package Exports**

- `@fireflymit/ui` - Main UI component library
- `@fireflymit/utils` - Utility functions (array, date, dom, random, string, tools, url)

**Path Aliases** (from root tsconfig.json)

- `@ffm/*` → `packages/*`
- `@ffm/ui/*` → `packages/ui/src/*`

**Key Conventions**

- All packages use `unbuild` or `vite build` for ESM output
- Components use `.vue` SFC format with TypeScript
- Lint-staged runs ESLint on pre-commit hooks
- Commit messages follow conventional commits (commitlint)
