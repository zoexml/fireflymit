import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Play',
    meta: { title: '组件测试' },
    component: () => import('@/views/play/index.vue'),
  },
  {
    path: '/hooks',
    name: 'Hooks',
    meta: { title: 'Hooks' },
    component: () => import('@/views/hooks/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
