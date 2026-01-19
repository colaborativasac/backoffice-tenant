import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // No refetch automáticamente en focus (puede ser molesto)
      refetchOnWindowFocus: false,

      // Reintentar 1 vez en caso de error
      retry: 1,

      // Tiempo que los datos se consideran frescos (5 minutos)
      staleTime: 1000 * 60 * 5,

      // Tiempo que los datos se mantienen en cache (30 minutos)
      gcTime: 1000 * 60 * 30,

      refetchOnReconnect: true,
    },
    mutations: {
      // No reintentar mutations automáticamente
      retry: false,
    },
  },
})

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
}
