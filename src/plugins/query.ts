import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryPluginOptions } from '@/config/query.config'

export function setupVueQuery(app: App) {
  app.use(VueQueryPlugin, vueQueryPluginOptions)
}

export { queryClient } from '@/config/query.config'
