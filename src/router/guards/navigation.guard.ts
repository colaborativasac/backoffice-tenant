import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores'
import { appConfig } from '@/config/app.config'

export function setupNavigationGuard(router: Router): void {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore()

    if (!authStore.isInitialized) {
      await authStore.checkAuth()
    }

    const requiresAuth = to.meta.requiresAuth
    const requiresGuest = to.meta.requiresGuest
    const requiredPermissions = to.meta.permissions as string[] | undefined

    if (requiresAuth && !authStore.isAuthenticated) {
      return {
        name: 'login',
        query: { redirect: to.fullPath },
      }
    }

    if (requiresGuest && authStore.isAuthenticated) {
      return { name: 'dashboard' }
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      // gestionar permisos
    }

    return true
  })

  router.afterEach((to) => {
    const title = to.meta.title as string | undefined
    document.title = title ? `${title} - ${appConfig.name}` : appConfig.name
  })
}
