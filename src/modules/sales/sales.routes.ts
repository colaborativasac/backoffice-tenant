import type { RouteRecordRaw } from 'vue-router'

export const salesRoutes: RouteRecordRaw[] = [
  {
    path: '/sales/orders',
    name: 'orders',
    component: () => import('@/modules/sales/pages/Orders.vue'),
    meta: {
      title: 'Pedidos',
    },
  },
  {
    path: '/sales/discount-codes',
    name: 'discount-codes',
    component: () => import('@/modules/sales/pages/DiscountCodes.vue'),
    meta: {
      title: 'Códigos de Descuento',
    },
  },
]
