import type { MenuConfig } from '@/core/models/menu.models'
import { ChartNoAxesCombined, Gauge, Users2 } from 'lucide-vue-next'

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
        path: '/sales/orders',
      },
      {
        title: 'Códigos de descuentos',
        path: '/sales/discount-codes',
      },
      {
        title: 'Conciliaciones',
        path: '/sales/reconciliations',
      },
      {
        title: 'Validar boletos',
        path: '/sales/ticket-validation',
      },
    ],
  },
  {
    title: 'Clientes',
    path: '/customers',
    icon: Users2,
  },
]
