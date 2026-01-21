import type { ReouteLocationNormalized } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    permissions?: string[]
    roles?: string[]
    title?: string
  }
}

declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerTitle?: string
    headerClassName?: string
    cellClassName?: string
    skeleton?: () => VNode
    expandedContent?: (row: TData) => VNode
  }
}

export type MiddlewareFunction = (
  to: ReouteLocationNormalized,
  from: ReouteLocationNormalized,
) => boolean | string | { name: string } | void

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
