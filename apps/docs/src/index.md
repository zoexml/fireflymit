---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: fireflymit
titleTemplate: 物料库

hero:
  name: 'fireflymit'
  text: '前端物料库'
  tagline: Vue 3 组件 + 指令 + Hooks + 工具函数
  image:
    src: /logo.png
    alt: fireflymit
  actions:
    - theme: brand
      text: 快速开始
      link: /tools/start/installation
    - theme: alt
      text: 指令
      link: /tools/hooks/directives
    - theme: alt
      text: Hooks
      link: /tools/hooks/hooks
    - theme: alt
      text: 🧩 组件预览
      link: https://fireflymit.vercel.app

features:
  - icon: 🧩
    title: UI 组件
    details: 基于 Element Plus 封装的 Vue 3 组件库，支持全局注册和按需引入。
    link: https://zoexml.github.io/fireflymit/ui/
  - icon: ⚡
    title: 自定义指令
    details: 内置 9 个实用指令 — v-copy、v-ripple、v-lazy-load、v-input 等。
    link: /tools/hooks/directives
  - icon: 🪝
    title: Hooks
    details: Vue 3 组合式函数 — useLockScroll、useChildren、useCompRef。
    link: /tools/hooks/
  - icon: 🔧
    title: 工具函数
    details: 轻量级工具函数库 — 数组、日期、DOM、字符串处理，支持 Tree Shaking。
  - icon: 📦
    title: 一站安装
    details: 只需安装 @fireflymit/ui，即可使用所有组件、指令、Hooks 和工具函数。
  - icon: 🛠️
    title: TypeScript 支持
    details: 完整的类型声明，基于 Vite + Rolldown 构建，ESM + CJS 双格式输出。
---
