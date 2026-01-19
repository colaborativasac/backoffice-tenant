import { createPinia } from 'pinia'

export const pinia = createPinia()

export { useAuthStore } from '@/modules/auth/auth.stores'
