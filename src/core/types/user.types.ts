export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  is_seller: boolean
  is_validator: boolean
  photo_url: string
  product_id: number
}

export interface UserWithPermissions extends User {
  permissions: string[]
  roles: string[]
}
