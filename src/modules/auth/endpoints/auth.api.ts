import api, { getCsrfCookie } from '@/config/axios.config'
import type {
  AuthResponse,
  ForgotPasswordData,
  LoginCredentials,
  LogoutResponse,
  ResetPasswordData,
} from '../types/auth.types'
import type { User } from '@/core/types/user.types'

export const authApi = {
  async login(credencials: LoginCredentials): Promise<AuthResponse> {
    await getCsrfCookie()
    const response = await api.post<AuthResponse>('/login', credencials)
    return response.data
  },

  async logout(): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>('/logout')
    return response.data
  },

  /**
   * Obtener usuario autenticado
   */

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/user')
    return response.data
  },

  /*
   * Solicitar restablecimiento de contraseña
   */

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    await getCsrfCookie()
    const response = await api.post<{ message: string }>('/forgot-password', data)
    return response.data
  },

  /**
   * Restablecer contraseña
   */
  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    await getCsrfCookie()
    const response = await api.post<{ message: string }>('/reset-password', data)
    return response.data
  },

  /**
   * Reenviar email de verificación
   */
  async resendVerificationEmail(): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/email/verification-notification')
    return response.data
  },
}
