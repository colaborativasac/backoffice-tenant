// paginación
export const DEFAULT_PAGE_SIZE = 15
export const PAGE_SIZE_OPTIONS = [10, 15, 25, 50, 100] as const
// tiempos en ms
export const DEBOUNCE_DELAY = 300
export const TOAST_DURATION = 5000
export const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutos

// Formatos
export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'
export const TIME_FORMAT = 'HH:mm'

// validations
export const PASSWORD_MIN_LENGTH = 8
export const NAME_MIN_LENGTH = 2
export const NAME_MAX_LENGTH = 100

// documentos
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
] as const

// estados de formularios
export const FORM_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

// estados
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const

export type Status = (typeof STATUS)[keyof typeof STATUS]

// mensajes estándar
export const MESSAGES = {
  SUCCESS: {
    CREATED: 'Registro creado correctamente',
    UPDATED: 'Registro actualizado correctamente',
    DELETED: 'Registro eliminado correctamente',
    SAVED: 'Cambios guardados correctamente',
  },
  ERROR: {
    GENERIC: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
    NETWORK: 'Error de conexión. Verifica tu internet.',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
    NOT_FOUND: 'El recurso solicitado no existe.',
    VALIDATION: 'Por favor, corrige los errores en el formulario.',
  },
  CONFIRM: {
    DELETE: '¿Estás seguro de eliminar este registro?',
    LOGOUT: '¿Estás seguro de cerrar sesión?',
    UNSAVED: 'Tienes cambios sin guardar. ¿Deseas continuar?',
  },
} as const

// roles de usuario
export const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const STORAGE_KEYS = {
  SIDEBAR_STATE: 'sidebar',
} as const
