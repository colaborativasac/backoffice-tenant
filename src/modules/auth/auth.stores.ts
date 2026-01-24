import type { User } from '@/core/types/user.types'
import { queryClient } from '@/plugins'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { authApi } from './endpoints/auth.api'
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const isInitialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  async function logout(): Promise<void> {
    isLoading.value = true
    try {
      // close session
    } finally {
      isLoading.value = false
    }
  }

  async function checkAuth(): Promise<void> {
    if (isInitialized.value) return
    isLoading.value = true
    try {
      // user.value = await authApi.getCurrentUser()
      user.value = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        email_verified_at: '2023-01-01T00:00:00Z',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        is_seller: true,
        is_validator: false,
        photo_url: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        product_id: 0,
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
    isInitialized,
    isAuthenticated,

    logout,
    checkAuth,
    clearAuth,
  }
})
