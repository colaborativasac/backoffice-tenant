import type { Artist } from '@/modules/dashboard/types/dashboard.types'
import type { ColumnDef } from '@tanstack/vue-table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { h } from 'vue'

export const columns: ColumnDef<Artist>[] = [
  {
    accessorKey: 'image_iconn',
    header: '',
    cell: ({ row }) => {
      return h(
        Avatar,
        { size: 'sm' },
        {
          default: () => [
            h(AvatarImage, {
              src: '',
              alt: row.original.name,
            }),
            h(AvatarFallback, {}, () => row.original.name.charAt(0)),
          ],
        },
      )
    },
    size: 64,
    meta: {
      cellClassName: '',
    },
  },
  {
    accessorKey: 'name',
    header: 'Artista',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'num_events',
    header: 'Número de eventos',
    cell: (info) => info.getValue(),
  },
]
