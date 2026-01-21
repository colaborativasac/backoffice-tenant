export interface ApiResponse<T = unknown> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status?: number
}

export interface ValidationErrorResponse {
  message: string
  errors: Record<string, string[]>
}

export interface LaravelPaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
  path: string
  first_page_url?: string
  last_page_url?: string
  next_page_url: string | null
  prev_page_url: string | null
  links?: Array<{
    url: string | null
    label: string
    active: boolean
  }>
}

export interface LaravelRequestParams {
  page: number
  per_page: number
  sort_by?: string
  sort_direction?: 'asc' | 'desc'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters?: Record<string, any>
  search?: string
}
