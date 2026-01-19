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
