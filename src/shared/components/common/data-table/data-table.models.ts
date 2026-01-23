import type { Table } from '@tanstack/vue-table'

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
