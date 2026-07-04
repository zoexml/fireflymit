import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
  strict: true,
  scrollBehavior: (_to, _from, _savedPosition) => {
    return { left: 0, top: 0 }
  },
})

export default router
