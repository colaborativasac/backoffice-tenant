import type { Table } from '@tanstack/vue-table'

export interface DataGridLayout {
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

export interface DataGridClassNames {
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
  tableLayout?: DataGridLayout
  tableClassNames?: DataGridClassNames
}

export interface DataGridContext<TData extends object> {
  props: DataGridProps<TData>
  table: Table<TData>
  recordCount: number
  isLoading: boolean
}
