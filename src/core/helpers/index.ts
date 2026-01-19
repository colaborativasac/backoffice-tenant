import { env } from '@/lib/env'
export { extractValidationErrors } from './form.helpers'

export function toAbsoluteUrl(pathname: string): string {
  const baseUrl = env.VITE_BASE_URL
  if (baseUrl && baseUrl !== '/') {
    return baseUrl + pathname
  } else {
    return pathname
  }
}
