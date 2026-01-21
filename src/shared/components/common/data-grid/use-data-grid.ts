import { inject } from 'vue'
import type { ColumnFiltersState, SortingState, Table } from '@tanstack/vue-table'

// Types
export interface DataGridTableLayout {
  dense?: boolean
  cellBorder?: boolean
  rowBorder?: boolean
  rowRounded?: boolean
  stripped?: boolean
  headerBackground?: boolean
  headerBorder?: boolean
  headerSticky?: boolean
  width?: 'auto' | 'fixed'
  columnsVisibility?: boolean
  columnsResizable?: boolean
  columnsPinnable?: boolean
  columnsMovable?: boolean
  columnsDraggable?: boolean
  rowsDraggable?: boolean
}

export interface DataGridTableClassNames {
  base?: string
  header?: string
  headerRow?: string
  headerSticky?: string
  body?: string
  bodyRow?: string
  footer?: string
  edgeCell?: string
}

export interface DataGridProps<TData extends object> {
  table: Table<TData>
  recordCount: number
  isLoading?: boolean
  loadingMode?: 'skeleton' | 'spinner'
  loadingMessage?: string
  emptyMessage?: string
  onRowClick?: (row: TData) => void
  tableLayout?: DataGridTableLayout
  tableClassNames?: DataGridTableClassNames
}

export interface DataGridContext<TData extends object> {
  props: DataGridProps<TData>
  table: Table<TData>
  recordCount: number
  isLoading: boolean
}

export type DataGridApiFetchParams = {
  pageIndex: number
  pageSize: number
  sorting?: SortingState
  filters?: ColumnFiltersState
  searchQuery?: string
}

export type DataGridApiResponse<T> = {
  data: T[]
  empty: boolean
  pagination: {
    total: number
    page: number
  }
}

export type DataGridRequestParams = {
  pageIndex: number
  pageSize: number
  sorting?: SortingState
  columnFilters?: ColumnFiltersState
}

// Injection key
export const DATA_GRID_KEY = Symbol('data-grid')

export function useDataGrid<TData extends object = object>() {
  const context = inject<DataGridContext<TData>>(DATA_GRID_KEY)

  if (!context) {
    throw new Error('useDataGrid must be used within a DataGrid component')
  }

  return context
}
