export const EVENTS_QUERY_KEYS = {
  all: ['events'] as const,
  list: () => [...EVENTS_QUERY_KEYS.all, 'list'] as const,
  details: (id: string) => [...EVENTS_QUERY_KEYS.all, 'detail', id] as const,
}
