import type { RouteRecordRaw } from 'vue-router'

export const eventsRoutes: RouteRecordRaw[] = [
  {
    path: '/events/events',
    name: 'events',
    component: () => import('@/modules/events/pages/Events.vue'),
    meta: {
      title: 'Eventos',
    },
  },
]
