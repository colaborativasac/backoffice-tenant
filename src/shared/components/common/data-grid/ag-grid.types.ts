import type { LaravelPagination } from '@/core/types/api.types'
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellValueChangedEvent,
  SortChangedEvent,
  PaginationChangedEvent,
  RowClickedEvent,
  RowDoubleClickedEvent,
  SelectionChangedEvent,
  FilterChangedEvent,
  RowDataUpdatedEvent,
  FirstDataRenderedEvent,
} from 'ag-grid-community'

export interface DataGridProps {
  rowData?: unknown[]
  columnDefs?: ColDef[]
  defaultColDef?: ColDef
  loading?: boolean
  height?: string
}

export interface DataGridEmits {
  (e: 'ready', api: GridApi): void
  (e: 'gridReady', params: GridReadyEvent): void
  (e: 'cellValueChanged', params: CellValueChangedEvent): void
  (e: 'sortChanged', params: SortChangedEvent): void
  (e: 'paginationChanged', params: PaginationChangedEvent): void
  (e: 'rowClicked', params: RowClickedEvent): void
  (e: 'rowDoubleClicked', params: RowDoubleClickedEvent): void
  (e: 'selectionChanged', params: SelectionChangedEvent): void
  (e: 'filterChanged', params: FilterChangedEvent): void
  (e: 'rowDataUpdated', params: RowDataUpdatedEvent): void
  (e: 'firstDataRendered', params: FirstDataRenderedEvent): void
}

// Tipo para el expose del componente
export interface DataGridExpose {
  api: GridApi | null
  /** Exportar datos a CSV */
  exportCsv: (fileName?: string) => void
  /** Ajustar columnas al contenido */
  autoSizeColumns: () => void
  /** Ajustar columnas al ancho del grid */
  sizeColumnsToFit: () => void
  /** Deseleccionar todas las filas */
  deselectAll: () => void
  /** Obtener filas seleccionadas */
  getSelectedRows: <T = unknown>() => T[]
  /** Refrescar celdas */
  refreshCells: () => void
}

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  from: number | null
  to: number | null
}

export type PerPageOption = 10 | 15 | 20 | 25 | 50 | 100

export function toPaginationMeta<T>(response: LaravelPagination<T>): PaginationMeta {
  return {
    currentPage: response.current_page,
    lastPage: response.last_page,
    perPage: response.per_page,
    total: response.total,
    from: response.from,
    to: response.to,
  }
}
