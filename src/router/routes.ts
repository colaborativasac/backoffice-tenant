import { authRoutes } from '@/modules/auth/auth.routes'
import { dashboardRoutes } from '@/modules/dashboard/dashboard.routes'
import { salesRoutes } from '@/modules/sales/sales.routes'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: { requiresGuest: true },
    children: authRoutes,
  },
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      ...dashboardRoutes,
      ...salesRoutes,
    ],
  },
  {
    path: '/error',
    component: () => import('@/layouts/ErrorLayout.vue'),
    children: [
      {
        path: '400',
        name: 'error-400',
        component: () => import('@/shared/components/errors/Error400.vue'),
        meta: { title: 'Error 400 - Solicitud Incorrecta' },
      },
      {
        path: '500',
        name: 'error-500',
        component: () => import('@/shared/components/errors/Error500.vue'),
        meta: { title: 'Error 500 - Error Interno del Servidor' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/400',
  },
]

export default routes
