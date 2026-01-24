export interface Event {
  sale_amount: string
  is_contract: boolean
  is_liquidation: boolean
  is_amount_pending_deposit: string
  id: number
  contract_id: number
  parent_id: number
  type_product_id: number
  home_group_id: number
  code: null
  title_small: string
  title_large: string
  meta_description: null
  slug: string
  price_normal: number
  price_online: number
  price_partner: number
  stock: number
  description: string
  conditions: null
  event_info: string
  poster: string
  poster_mobile: null
  cupon_expire_in: number
  sales_deadline: null
  to_deliver: boolean
  delivery_cost: string
  to_coupon: boolean
  active: boolean
  featured: boolean
  promotion: boolean
  deleted_at: null
  created_at: null
  updated_at: string
  shop_id: number
  video_url: null
  video_id: string
  partner_commission: string
  vaope_commission: string
  vaope_commission_type: number
  sale_comission: string
  is_stock: boolean
  fecha_evento: string
  hora_evento: string
  link_grupo_cerrado: null
  address: string
  location_id: number
  croquis: string
  status: number
  can_be_sold: boolean
  correlative_count: number
  group_tickets: number
  add_ticket_image: null
  is_comision_scaled: number
  ticketing_fotter_text: string
  ticketing_fotter_img: null
  ticketing_super_img: string
  payment_flow: string
  is_landing_page: boolean
  max_by_client: number
  show_in_home: number
  is_nameable: boolean
  product_liquidation_operations_count: number
  product_documents_count: number
  master_events: Masterevents
  notes_count: number
  children_allowed: number
  children_age: number
  map_svg: number
  notes_class: string
  code_ico: string
  is_by_zone: number
  notes: Note[]
  productTerms: ProductTerm[]
  userProducts: unknown[]
  shop: Shop
  contract: Contract
}

interface Contract {
  id: number
  shop_id: number
  number: string
  file: string
  reference: string
  date_from: string
  date_to: string
  created_at: string
  updated_at: string
  deleted_at: null
  estado: number
  file_firmado: string
  cpd_porcentaje: string
  cpd_fijo: string
  cpd_minimo: string
  cv_porcentaje: string
  cv_fijo: string
  cv_minimo: string
  cv_adicional_cliente: string
  cv_cortesia: string
  cv_punto_venta: string
  send_on: null
}

interface Shop {
  id: number
  shop_category_id: number
  type_doc: string
  ruc: string
  slug: string
  name: string
  business_name: string
  commission: number
  logo: null
  banner: null
  description: null
  district_id: string
  address: string
  condition: null
  dnifile_path: null
  status: null
  phone: string
  email: string
  email_secondary: null
  website: null
  is_delivery: boolean
  is_show_in_ticket: number
  is_to_collect: number
  latitude: null
  longitude: null
  shapes: unknown[]
  delivery_cost: number
  visa_merchant_id: string
  visa_user: string
  visa_pwd: string
  active: boolean
  deleted_at: null
  created_at: string
  updated_at: string
  opening_hour_from: null
  opening_hour_to: null
  opening_days: null
  banco: string
  tipo_cuenta: string
  numero_cuenta: string
  cci: string
  nombre_representante_legal: string
  dni_representante_legal: string
  facebook_pixel: null
  executive_id: number
  created_by: number
  updated_by: number
  priority: number
  executive: Executive
}

interface Executive {
  id: number
  name: string
  document_type: string
  document_number: string
  email: string
  email_verified_at: null
  two_factor_confirmed_at: null
  api_token: null
  avatar: string
  active: number
  created_at: string
  updated_at: string
  deleted_at: null
  is_seller: boolean
  is_validador: boolean
  is_download_data: boolean
  product_id: number
  lastlogin: string
  app_validation_type: number
  last_app_sync: string
  phone: string
  is_view_validation_report: number
  is_temporal: number
  date_expirate_temporal_user: null
  local_id: number
  photo_url: string
}

interface ProductTerm {
  id: number
  name: string
}

interface Note {
  id: string
  user: string
  code_status: string
  code_status_name: string
  description: string
}

interface Masterevents {
  id: string
  position: number
  name: string
  description: string
  color: string
  active: boolean
  next_status: null
}

export interface EventQueryParams {
  q?: string
  page?: number
  cat?: string
  status?: number
  shop_id?: number
}
