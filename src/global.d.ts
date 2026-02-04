import type { ReouteLocationNormalized } from 'vue-router'
import type { Component, VNode } from 'vue'

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
  interface ColumnMeta<TData extends object, TValue> {
    /** Título para mostrar en visibilidad */
    headerTitle?: string
    /** Clases CSS para la celda del header */
    headerClassName?: string
    /** Clases CSS para las celdas del body */
    cellClassName?: string
    /** Componente skeleton para loading */
    skeleton?: Component
    /** Función que retorna componente para fila expandida */
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
