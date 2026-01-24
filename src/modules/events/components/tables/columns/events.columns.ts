import { ref } from 'vue'
import type { ColDef } from 'ag-grid-community'
import type { Event } from '@/modules/events/types/events.types'
export const columns = ref<ColDef<Event>[]>([
  {
    field: 'sale_amount',
    headerName: 'Venta',
  },
  {
    field: 'poster',
    headerName: 'Poster',
  },
  {
    field: 'id',
    headerName: 'ID',
    editable: true,
  },
  {
    field: 'title_small',
    headerName: 'Título',
    tooltipValueGetter: (params) => params.value,
    minWidth: 250,
  },
  {
    field: 'fecha_evento',
    headerName: 'Fecha',
  },
  {
    field: 'sale_amount',
    headerName: 'Monto',
  },
  {
    field: 'active',
    headerName: 'Publicado',
  },
  {
    field: 'featured',
    headerName: 'Slider',
  },
  {
    field: 'featured',
    headerName: 'Destacar',
  },
  {
    field: 'notes_count',
    headerName: 'Notas',
  },
  {
    headerName: 'Servicios',
  },
  {
    headerName: 'Documentos',
  },
  {
    headerName: 'Conc.',
  },
  {
    headerName: 'Estado',
  },
  {
    headerName: 'Ejecutivo',
  },
  {
    headerName: 'Opciones',
  },
])
