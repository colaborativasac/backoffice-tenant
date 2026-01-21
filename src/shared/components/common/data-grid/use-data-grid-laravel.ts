import { ref, computed, watch, type Ref } from 'vue'
import type { ColumnFiltersState, SortingState, PaginationState } from '@tanstack/vue-table'
import type { LaravelPaginatedResponse, LaravelRequestParams } from '@/core/models/api.models'

export interface UseDataGridLaravelOptions<T> {
  /** Function to fetch data from API */
  fetchFn: (params: LaravelRequestParams) => Promise<LaravelPaginatedResponse<T>>
  /** Initial page size */
  initialPageSize?: number
  /** Initial page index (0-based for TanStack, converted to 1-based for Laravel) */
  initialPageIndex?: number
  /** Debounce time for filters/search in ms */
  debounceMs?: number
  /** Transform data after fetching */
  transform?: (data: T[]) => T[]
}

export function useDataGridLaravel<T extends object>(options: UseDataGridLaravelOptions<T>) {
  const {
    fetchFn,
    initialPageSize = 20,
    initialPageIndex = 0,
    debounceMs = 300,
    transform,
  } = options

  const data = ref<T[]>([]) as Ref<T[]>
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const pagination = ref<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  })

  const laravelMeta = ref<Omit<LaravelPaginatedResponse<T>, 'data'> | null>(null)

  const sorting = ref<SortingState>([])

  const columnFilters = ref<ColumnFiltersState>([])

  const searchQuery = ref('')

  const recordCount = computed(() => laravelMeta.value?.total ?? 0)

  const pageCount = computed(() => laravelMeta.value?.last_page ?? 1)

  const currentPage = computed(() => laravelMeta.value?.current_page ?? 1)

  const hasNextPage = computed(() => laravelMeta.value?.next_page_url !== null)

  const hasPrevPage = computed(() => laravelMeta.value?.prev_page_url !== null)

  function buildRequestParams(): LaravelRequestParams {
    const params: LaravelRequestParams = {
      page: pagination.value.pageIndex + 1, // Convert 0-based to 1-based
      per_page: pagination.value.pageSize,
    }

    // Add sorting
    if (sorting.value.length > 0) {
      const [firstSort] = sorting.value
      params.sort_by = firstSort?.id
      params.sort_direction = firstSort?.desc ? 'desc' : 'asc'
    }

    // Add search
    if (searchQuery.value) {
      params.search = searchQuery.value
    }

    // Add filters
    if (columnFilters.value.length > 0) {
      params.filters = columnFilters.value.reduce(
        (acc, filter) => {
          acc[filter.id] = filter.value
          return acc
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as Record<string, any>,
      )
    }

    return params
  }

  async function fetchData() {
    isLoading.value = true
    error.value = null

    try {
      const params = buildRequestParams()
      const response = await fetchFn(params)

      // Extract data and meta
      const { data: responseData, ...meta } = response

      data.value = transform ? transform(responseData) : responseData
      laravelMeta.value = meta
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to fetch data')
      console.error('DataGrid Laravel fetch error:', e)
    } finally {
      isLoading.value = false
    }
  }

  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  function debouncedFetch() {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(fetchData, debounceMs)
  }

  function onPaginationChange(
    updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState),
  ) {
    const newValue =
      typeof updaterOrValue === 'function' ? updaterOrValue(pagination.value) : updaterOrValue
    pagination.value = newValue
  }

  function onSortingChange(updaterOrValue: SortingState | ((old: SortingState) => SortingState)) {
    const newValue =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
    sorting.value = newValue
    // Reset to first page when sorting changes
    pagination.value = { ...pagination.value, pageIndex: 0 }
  }

  function onColumnFiltersChange(
    updaterOrValue: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState),
  ) {
    const newValue =
      typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters.value) : updaterOrValue
    columnFilters.value = newValue
    // Reset to first page when filters change
    pagination.value = { ...pagination.value, pageIndex: 0 }
  }

  function onSearchChange(value: string) {
    searchQuery.value = value
    // Reset to first page when search changes
    pagination.value = { ...pagination.value, pageIndex: 0 }
  }

  function refresh() {
    return fetchData()
  }

  function reset() {
    pagination.value = { pageIndex: initialPageIndex, pageSize: initialPageSize }
    sorting.value = []
    columnFilters.value = []
    searchQuery.value = ''
    return fetchData()
  }

  // Watched table state changes
  watch(pagination, () => fetchData(), { deep: true })
  watch(sorting, () => fetchData(), { deep: true })
  watch(columnFilters, () => debouncedFetch(), { deep: true })
  watch(searchQuery, () => debouncedFetch())

  // Initial fetch
  fetchData()

  return {
    // Data
    data,
    isLoading,
    error,

    // Pagination
    pagination,
    recordCount,
    pageCount,
    currentPage,
    hasNextPage,
    hasPrevPage,

    // Sorting
    sorting,

    // Filters
    columnFilters,
    searchQuery,

    // Laravel meta
    laravelMeta,

    // Handlers (for TanStack Table)
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onSearchChange,

    // Actions
    refresh,
    reset,
  }
}

export function createLaravelTableOptions<T extends object>(
  laravelState: ReturnType<typeof useDataGridLaravel<T>>,
) {
  return {
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: laravelState.pageCount.value,
    onPaginationChange: laravelState.onPaginationChange,
    onSortingChange: laravelState.onSortingChange,
    onColumnFiltersChange: laravelState.onColumnFiltersChange,
    state: {
      get pagination() {
        return laravelState.pagination.value
      },
      get sorting() {
        return laravelState.sorting.value
      },
      get columnFilters() {
        return laravelState.columnFilters.value
      },
    },
  }
}
