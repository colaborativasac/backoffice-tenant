import { z } from 'zod'

export const envSchema = z.object({
  VITE_BASE_URL: z.string().default('/'),
  VITE_APP_NAME: z.string().default('Vaope Backoffice'),
  VITE_API_URL: z.string().url(),
  VITE_APP_ENV: z.enum(['local', 'development', 'staging', 'production']).default('production'),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  try {
    return envSchema.parse(import.meta.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('\n')

      console.error('❌ Invalid environment variables:\n', missingVars)

      if (import.meta.env.DEV) {
        throw new Error(`Environment validation failed:\n${missingVars}\n\nCheck your .env file.`)
      }
    }
    throw error
  }
}

export const env = validateEnv()
