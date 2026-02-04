export interface User {
  id: number
  name: string
  is_seller: boolean
  product_id: number
  is_validador: boolean
  email: string
  photo_url: string
  created_at: string
  roles: string[]
  role_ids: number[]
  permissions: string[]
}

export interface UserWithPermissions extends User {
  permissions: string[]
  roles: string[]
}
