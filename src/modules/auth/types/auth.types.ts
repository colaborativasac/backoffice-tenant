export interface User {
  id: number
  name: string
  is_seller: boolean
  product_id: number
  is_validador: boolean
  email: string
  photo_url: string
  created_at: string
  roles: string[]
  role_ids: number[]
  permissions: string[]
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  email: string
  password: string
  password_confirmation: string
  token: string
}

export interface AuthResponse {
  user: User
  message: string
}

export interface LogoutResponse {
  message: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  errors: Record<string, string[]>
}
