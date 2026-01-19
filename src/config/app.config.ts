import { env } from '@/lib/env'

export const appConfig = {
  name: env.VITE_APP_NAME || 'Vaope Backoffice',
  env: env.VITE_APP_ENV || 'local',

  base: env.VITE_BASE_URL || '/',
  apiUrl: env.VITE_API_URL || '/api',

  publicRoutes: ['login', 'forgot-password', 'reset-password'],
} as const

export type AppConfig = typeof appConfig
