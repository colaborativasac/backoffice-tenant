<script setup lang="ts">
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { columns } from './columns/events.columns'
import { useDataTableLaravel } from '@/shared/components/common/data-table/use-data-table-laravel'
import type { EventQueryParams, Event } from '../../models/events.models'
import { eventsApi } from '../../endpoints/events.api'
import { watch } from 'vue'
import { toast } from 'vue-sonner'
import { CardFooter } from '@/components/ui/card'
import CardTable from '@/components/ui/card/CardTable.vue'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const {
  data,
  isLoading,
  pagination,
  columnFilters,
  recordCount,
  onColumnFiltersChange,
  onPaginationChange,
  error,
} = useDataTableLaravel<Event>({
  fetchFn: async (params: EventQueryParams) => {
    const queryParams = {
      page: params.page || 1,
      q: params.q,
      cat: params.cat,
      status: params.status,
      shop_id: params.shop_id,
    }

    const data = await eventsApi.getEvents(queryParams)
    console.log('Fetched events data:', data)
    console.log('=>', isLoading.value, pagination.value, columnFilters.value, recordCount.value)
    return data
  },
  initialPageSize: 20,
  debounceMs: 400,
})

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  onPaginationChange,
  onColumnFiltersChange,
  manualPagination: true,
  manualFiltering: true,
  state: {
    get pagination() {
      return pagination.value
    },
    get columnFilters() {
      return columnFilters.value
    },
  },
  enableRowSelection: false,
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 50,
    },
  },
})

watch(error, (newError) => {
  if (newError) {
    toast.error(`Error loading events: ${newError.message}`)
  }
})
</script>
<template>
  <DataGrid
    :table="table"
    :record-count="recordCount"
    :is-loading="false"
    loading-mode="skeleton"
    :table-layout="{
      rowBorder: true,
      cellBorder: true,
      headerBackground: true,
      headerBorder: true,
      dense: true,
    }"
  >
    <CardTable>
      <ScrollArea>
        <DataGridTable />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CardTable>
    <CardFooter>
      <DataGridPagination :sizes="[10, 20, 50, 100]" info="{from} - {to} de {count} registros" />
    </CardFooter>
  </DataGrid>
</template>
