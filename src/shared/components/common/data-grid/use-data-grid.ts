import { inject, type InjectionKey, type VNode, type Component } from 'vue'
import type { ColumnFiltersState, SortingState, Table } from '@tanstack/vue-table'

// Types
export interface DataGridLayout {
  /** Reduce el padding de las celdas */
  dense?: boolean
  /** Muestra bordes entre celdas */
  cellBorder?: boolean
  /** Muestra bordes entre filas */
  rowBorder?: boolean
  /** Aplica bordes redondeados a las filas */
  rowRounded?: boolean
  /** Alterna colores de fondo en filas */
  stripped?: boolean
  /** Aplica fondo al header */
  headerBackground?: boolean
  /** Muestra borde inferior en header */
  headerBorder?: boolean
  /** Header fijo al hacer scroll */
  headerSticky?: boolean
  /** Ancho de tabla: 'auto' o 'fixed' */
  width?: 'auto' | 'fixed'
  /** Habilita toggle de visibilidad de columnas */
  columnsVisibility?: boolean
  /** Habilita redimensionado de columnas */
  columnsResizable?: boolean
  /** Habilita fijado de columnas (pin) */
  columnsPinnable?: boolean
  /** Habilita reordenamiento de columnas */
  columnsMovable?: boolean
  /** Habilita drag & drop de columnas */
  columnsDraggable?: boolean
  /** Habilita drag & drop de filas */
  rowsDraggable?: boolean
}

export interface DataGridClassNames {
  /** Clases para la tabla base */
  base?: string
  /** Clases para el thead */
  header?: string
  /** Clases para las filas del header */
  headerRow?: string
  /** Clases cuando el header es sticky */
  headerSticky?: string
  /** Clases para el tbody */
  body?: string
  /** Clases para las filas del body */
  bodyRow?: string
  /** Clases para el tfoot */
  footer?: string
  /** Clases para celdas en los extremos */
  edgeCell?: string
}

// props datagrid
export interface DataGridProps<TData extends object> {
  /** Instancia de TanStack Table */
  table: Table<TData>
  /** Total de registros (para paginación server-side) */
  recordCount: number
  /** Estado de carga */
  isLoading?: boolean
  /** Modo de loading: skeleton o spinner */
  loadingMode?: 'skeleton' | 'spinner'
  /** Mensaje durante carga */
  loadingMessage?: string
  /** Mensaje cuando no hay datos */
  emptyMessage?: string
  /** Callback al hacer click en una fila */
  onRowClick?: (row: TData) => void
  /** Configuración de layout */
  tableLayout?: DataGridLayout
  /** Clases CSS personalizadas */
  tableClassNames?: DataGridClassNames
}

// contexto del datatable
export interface DataGridContext<TData extends object> {
  props: DataGridProps<TData>
  table: Table<TData>
  recordCount: number
  isLoading: boolean
}

// tipos para api y paginación
export interface DataGridApiFetchParams {
  /** Índice de página (0-based) */
  pageIndex: number
  /** Cantidad de registros por página */
  pageSize: number
  /** Estado de ordenamiento */
  sorting?: SortingState
  /** Filtros de columna */
  filters?: ColumnFiltersState
  /** Búsqueda global */
  searchQuery?: string
}

export interface DataGridApiResponse<T> {
  /** Array de datos */
  data: T[]
  /** Indica si no hay resultados */
  empty: boolean
  /** Información de paginación */
  pagination: {
    /** Total de registros */
    total: number
    /** Página actual (1-based desde el servidor) */
    page: number
  }
}

export interface DataGridRequestParams {
  pageIndex: number
  pageSize: number
  sorting?: SortingState
  columnFilters?: ColumnFiltersState
}

// Injection key y composable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DATA_GRID_KEY = Symbol('data-grid') as InjectionKey<DataGridContext<any>>

/**
 * Composable para acceder al contexto del DataGrid
 * Debe usarse dentro de un componente hijo de DataGrid
 *
 * @throws Error si se usa fuera del contexto de DataGrid
 * @returns Contexto del DataGrid con props, table, recordCount e isLoading
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useDataGrid } from '@/components/ui/data-grid'
 *
 * const { table, isLoading, recordCount } = useDataGrid<Usuario>()
 * </script>
 * ```
 */

export function useDataGrid<TData extends object = object>(): DataGridContext<TData> {
  const context = inject<DataGridContext<TData>>(DATA_GRID_KEY)

  if (!context) {
    throw new Error(
      '[DataGrid] useDataGrid debe usarse dentro de un componente DataGrid. ' +
        'Asegúrate de que el componente esté envuelto en <DataGrid>.',
    )
  }

  return context
}
