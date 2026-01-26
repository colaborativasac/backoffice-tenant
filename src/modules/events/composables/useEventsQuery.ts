import { useQuery } from '@tanstack/vue-query'
import { EVENTS_QUERY_KEYS } from '../config/query.config'
import { eventsRepository } from '../repositories/events.repository'
import type { IEvent } from '../types/events.types'

export const useEventsQuery = () => {
  const events = useQuery<IEvent[]>({
    queryKey: EVENTS_QUERY_KEYS.list(),
    queryFn: async () => {
      const requestEvents = eventsRepository()
      const response = await requestEvents.getEvents()
      return response.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    events: {
      ...events,
      data: events.data ?? [],
    },
  }
}
