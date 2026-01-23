import type { Event } from '@/modules/events/models/events.models'
import type { ColumnDef } from '@tanstack/vue-table'

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'title_small',
    header: 'Título',
  },
  {
    accessorKey: 'fecha_evento',
    header: 'Fecha del evento',
  },
  {
    accessorKey: 'price_normal',
    header: 'Precio normal',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'active',
    header: 'Activo',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
  },
]
