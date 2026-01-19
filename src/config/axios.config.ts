import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '@/core/models/api.models'
import { env } from '@/lib/env'

const api: AxiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // You can add authorization headers or other custom headers here
  // const token = getAuthTokenSomehow()
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status

    if (status === 401) {
      window.location.href = '/auth/login'
    }

    if (status === 403) {
      console.error('Access forbidden: You do not have permission to access this resource.')
    }

    if (status && status >= 500) {
      console.error('Server error: Please try again later.')
    }

    return Promise.reject(error)
  },
)

export async function getCsrfCookie(): Promise<void> {
  await axios.get('/sanctum/csrf-cookie', {
    baseURL: env.VITE_API_URL,
    withCredentials: true,
  })
}

export default api
