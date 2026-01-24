export interface Artist {
  image_iconn: string
  name: string
  num_events: number
}

export interface Organizers {
  name: string
  num_events: number
}

export interface Events {
  active: boolean
  color: string
  description: string
  events_count: number
  id: string
  name: string
}
