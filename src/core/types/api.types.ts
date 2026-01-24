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

export interface LaravelPaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface LaravelPagination<T = unknown> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: LaravelPaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}
