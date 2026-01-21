import type { Artist } from '@/modules/dashboard/models/dashboard.models'
import type { ColumnDef } from '@tanstack/vue-table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { h } from 'vue'
export const columns: ColumnDef<Artist>[] = [
  {
    accessorKey: 'image_iconn',
    header: '',
    meta: { cellClassName: 'border-sizing' },
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
    size: 40,
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
