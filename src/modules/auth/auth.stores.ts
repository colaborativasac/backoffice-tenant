import type { User } from '@/core/types/user.types'
import { queryClient } from '@/plugins'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authApi } from './api/auth.api'
import type {
  ForgotPasswordData,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
} from './types/auth.types'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/core/types/api.types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const errors = ref<Record<string, string[]>>({})
  const message = ref<string | null>(null)
  const isInitialized = ref(false)

  // getters
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')
  const userRoles = computed(() => user.value?.roles || [])
  const userPermissions = computed(() => user.value?.permissions || [])
  const isSeller = computed(() => user.value?.is_seller || false)
  const isValidator = computed(() => user.value?.is_validador || false)

  const handleError = (error: unknown): void => {
    const axiosError = error as AxiosError<ApiErrorResponse>
    if (axiosError.response?.data?.errors) {
      errors.value = axiosError.response.data.errors
    } else if (axiosError.response?.data?.message) {
      errors.value = { general: [axiosError.response.data.message] }
    } else {
      errors.value = { general: ['Ha ocurrido un error inesperado'] }
    }
  }

  const clearErrors = (): void => {
    errors.value = {}
    message.value = null
  }

  // Actions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    clearErrors()
    try {
      user.value = await authApi.login(credentials)
      return true
    } catch (error) {
      handleError(error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    isLoading.value = true
    clearErrors()
    try {
      user.value = await authApi.register(data)
      return true
    } catch (error) {
      handleError(error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    isLoading.value = true
    try {
      await authApi.logout()
    } catch {
      // manejar error si es necesario
    } finally {
      user.value = null
      isLoading.value = false
    }
  }

  const forgotPassword = async (data: ForgotPasswordData): Promise<boolean> => {
    isLoading.value = true
    clearErrors()
    try {
      const response = await authApi.forgotPassword(data)
      message.value = response.message || 'Instrucciones enviadas a su correo electrónico.'
      return true
    } catch (error) {
      handleError(error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (data: ResetPasswordData): Promise<boolean> => {
    isLoading.value = true
    clearErrors()
    try {
      const response = await authApi.resetPassword(data)
      message.value = response.message || 'Contraseña restablecida correctamente'
      return true
    } catch (error) {
      handleError(error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function checkAuth(): Promise<void> {
    if (isInitialized.value) return
    isLoading.value = true
    try {
      // user.value = await authApi.getUser()
      user.value = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        created_at: '2023-01-01T00:00:00Z',
        is_seller: true,
        is_validador: false,
        photo_url: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        product_id: 0,
        roles: [],
        role_ids: [],
        permissions: [],
      }
    } catch {
      user.value = null
    } finally {
      isLoading.value = false
      isInitialized.value = true
    }
  }

  function clearAuth(): void {
    user.value = null
    queryClient.clear()
  }

  return {
    user,
    isLoading,
    errors,
    message,

    // getters
    isInitialized,
    isAuthenticated,
    userName,
    userEmail,
    userRoles,
    userPermissions,
    isSeller,
    isValidator,

    // actions
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    checkAuth,
    clearAuth,
    clearErrors,
  }
})
