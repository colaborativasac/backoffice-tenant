import api from '@/config/axios.config'
import type { IEventCreateDTO } from '../types/events.types'

export const eventsRepository = () => {
  return {
    async getEvents() {
      return api.get('/events')
    },
    async createEvent(payload: IEventCreateDTO) {
      return api.post('/events', payload)
    },
  }
}
