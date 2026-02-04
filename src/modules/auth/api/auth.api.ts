import api, { initCsrf } from '@/config/axios.config'
import type {
  AuthResponse,
  ForgotPasswordData,
  LoginCredentials,
  LogoutResponse,
  RegisterData,
  ResetPasswordData,
} from '../types/auth.types'
import type { User } from '@/core/types/user.types'
import type { ApiResponse } from '@/core/types/api.types'

export const authApi = {
  async login(credencials: LoginCredentials): Promise<User> {
    await initCsrf()
    await api.post<AuthResponse>('/login', credencials)
    return this.getUser()
  },

  async register(credencials: RegisterData): Promise<User> {
    await initCsrf()
    await api.post<AuthResponse>('/register', credencials)
    return this.getUser()
  },

  async logout(): Promise<void> {
    await api.post<LogoutResponse>('/logout')
  },

  /**
   * Obtener usuario autenticado
   */

  async getUser(): Promise<User> {
    const response = await api.get<User>('/user')
    return response.data
  },

  /*
   * Solicitar restablecimiento de contraseña
   */

  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse> {
    await initCsrf()
    const response = await api.post<ApiResponse>('/forgot-password', data)
    return response.data
  },

  /**
   * Restablecer contraseña
   */
  async resetPassword(data: ResetPasswordData): Promise<ApiResponse> {
    await initCsrf()
    const response = await api.post<ApiResponse>('/reset-password', data)
    return response.data
  },

  /**
   * Reenviar email de verificación
   */
  async resendVerificationEmail(): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/email/verification-notification')
    return response.data
  },
}
