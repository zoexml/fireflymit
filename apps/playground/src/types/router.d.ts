declare module 'virtual:meta-layouts' {
  import type { RouteRecordRaw } from 'vue-router'

  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}

declare module 'vue-router/auto-routes' {
  import type { RouteRecordRaw } from 'vue-router'

  export const routes: RouteRecordRaw[]
}

declare module 'vue-router/auto' {
  export { createRouter, createWebHistory } from 'vue-router'
}
