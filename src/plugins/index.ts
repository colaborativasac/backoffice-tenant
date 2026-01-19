import type { App } from 'vue'
import { pinia } from '@/stores'
import router from '@/router'
import { setupVueQuery } from './query'

export function registerPlugins(app: App) {
  // 1. Pinia (State Management)
  app.use(pinia)

  // 2. Vue Router
  app.use(router)

  // 3. TanStack Query (Server State)
  setupVueQuery(app)
}

export { queryClient } from '@/config/query.config'
