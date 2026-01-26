export interface IEvent {
  id: string
  title_small: string
  title_large: string
  slug: string
  price_normal: number
  price_online: number
  price_partner: number
  stock: number
  description: string
  event_info: string
  fecha_evento: string
  hora_evento: string
  address: string
  location_id: number
  shop_id: number
  created_at: string
  updated_at: string
}

export interface IEventCreateDTO {
  title_small: string
  title_large: string
  slug: string
  price_normal: number
  price_online: number
  price_partner: number
  stock: number
  description: string
  event_info: string
  fecha_evento: string
  hora_evento: string
  address: string
  location_id: number
  shop_id: number
}
