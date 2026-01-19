import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'login',
    component: () => import('@/modules/auth/pages/Login.vue'),
    meta: {
      title: 'Iniciar Sesión',
    },
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    component: () => import('@/modules/auth/pages/ForgotPassword.vue'),
    meta: {
      title: 'Recuperar Contraseña',
    },
  },
  {
    path: 'reset-password',
    name: 'reset-password',
    component: () => import('@/modules/auth/pages/ResetPassword.vue'),
    meta: {
      title: 'Restablecer Contraseña',
    },
  },
]
