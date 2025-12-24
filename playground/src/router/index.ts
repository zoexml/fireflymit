import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/ui',
    name: 'UI',
    meta: {
      title: 'UI 组件',
    },
    component: () => import('@/layouts/container/Ui.vue'),
  },
  {
    path: '/hooks',
    name: 'Hooks',
    meta: {
      title: 'Hooks',
    },
    component: () => import('@/layouts/container/Hooks.vue'),
  },
  {
    path: '/directives',
    name: 'Directives',
    meta: {
      title: 'Directives',
    },
    component: () => import('@/layouts/container/Directives.vue'),
  },
  {
    path: '/utils',
    name: 'Utils',
    meta: {
      title: 'Utils',
    },
    component: () => import('@/layouts/container/Utils.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/ui',
        },
        ...routes,
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/ui',
    },
  ],
})

export default router
