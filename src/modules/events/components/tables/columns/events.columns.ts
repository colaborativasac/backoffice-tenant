import { ref } from 'vue'
import type { ColDef } from 'ag-grid-community'
import { BadgeCellRenderer } from '..'

export const columns = ref<ColDef[]>([
  {
    field: 'title',
    headerName: 'Título',
    sortable: true,
  },
  {
    field: 'date',
    headerName: 'Fecha',
    sortable: true,
  },
  {
    field: 'amount',
    headerName: 'Monto',
    sortable: true,
  },
  {
    field: 'publish',
    headerName: 'Publicado',
    sortable: true,
    cellRenderer: BadgeCellRenderer,
  },
  {
    field: 'slider',
    headerName: 'En Slider',
    sortable: true,
  },
  {
    field: 'statusLabel',
    headerName: 'Estado',
    sortable: true,
  },
  {
    field: 'executive',
    headerName: 'Ejecutivo',
    sortable: true,
  },
])
