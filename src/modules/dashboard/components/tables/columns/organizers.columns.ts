import type { Organizers } from '@/modules/dashboard/types/dashboard.types'
import type { ColumnDef } from '@tanstack/vue-table'

export const columns: ColumnDef<Organizers>[] = [
  {
    header: 'Organizador',
    accessorKey: 'name',
  },
  {
    header: 'Número de eventos',
    accessorKey: 'num_events',
  },
]
