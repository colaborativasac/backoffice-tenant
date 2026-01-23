import type { MenuConfig } from '@/core/models/menu.models'
import { Calendars, ChartNoAxesCombined, Gauge, Users2 } from 'lucide-vue-next'

export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Dashboard',
    icon: Gauge,
    path: '/dashboard',
  },
  {
    title: 'Ventas',
    icon: ChartNoAxesCombined,
    rootPath: '/sales',
    children: [
      {
        title: 'Pedidos',
        path: '/orders',
      },
      {
        title: 'Códigos de descuentos',
        path: '/discount-codes',
      },
      {
        title: 'Conciliaciones',
        path: '/reconciliations',
      },
      {
        title: 'Validar boletos',
        path: '/ticket-validation',
      },
    ],
  },
  {
    title: 'Eventos',
    icon: Calendars,
    rootPath: '/events',
    children: [
      {
        title: 'Eventos',
        path: '/events',
      },
      {
        title: 'Autorizaciones',
        path: '/authorizations',
      },
      {
        title: 'Sliders',
        path: '/sliders',
      },
      {
        title: 'Categorías',
        path: '/categories',
      },
      {
        title: 'Tipo de entradas',
        path: '/ticket-types',
      },
      {
        title: 'Artistas',
        path: '/artists',
      },
      {
        title: 'Ubicaciones',
        path: '/locations',
      },
    ],
  },
  {
    title: 'Clientes',
    path: '/customers',
    icon: Users2,
  },
]
