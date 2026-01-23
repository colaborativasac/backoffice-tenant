import { inject } from 'vue'
import type { ColumnFiltersState, SortingState, Table } from '@tanstack/vue-table'

// Types
export interface DataTableLayout {
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

export interface DataTableClassNames {
  base?: string
  header?: string
  headerRow?: string
  headerSticky?: string
  body?: string
  bodyRow?: string
  footer?: string
  edgeCell?: string
}

export interface DataTableProps<TData extends object> {
  table: Table<TData>
  recordCount: number
  isLoading?: boolean
  loadingMode?: 'skeleton' | 'spinner'
  loadingMessage?: string
  emptyMessage?: string
  onRowClick?: (row: TData) => void
  tableLayout?: DataTableLayout
  tableClassNames?: DataTableClassNames
}

export interface DataTableContext<TData extends object> {
  props: DataTableProps<TData>
  table: Table<TData>
  recordCount: number
  isLoading: boolean
}

export type DataTableApiFetchParams = {
  pageIndex: number
  pageSize: number
  sorting?: SortingState
  filters?: ColumnFiltersState
  searchQuery?: string
}

export type DataTableApiResponse<T> = {
  data: T[]
  empty: boolean
  pagination: {
    total: number
    page: number
  }
}

export type DataTableRequestParams = {
  pageIndex: number
  pageSize: number
  sorting?: SortingState
  columnFilters?: ColumnFiltersState
}

// Injection key
export const DATA_TABLE_KEY = Symbol('data-table')

export function useDataTable<TData extends object = object>() {
  const context = inject<DataTableContext<TData>>(DATA_TABLE_KEY)

  if (!context) {
    throw new Error('useDataTable must be used within a DataTable component')
  }

  return context
}
