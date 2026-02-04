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
  {
    path: '/events/authorizations',
    name: 'event-authorizations',
    component: () => import('@/modules/events/pages/Authorizations.vue'),
    meta: {
      title: 'Autorizaciones',
    },
  },
]
