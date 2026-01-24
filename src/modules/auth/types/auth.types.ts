import type { User } from '@/core/types/user.types'

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
