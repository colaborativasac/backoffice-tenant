<script setup lang="ts">
import { ref, computed } from 'vue'
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  ExpandedState,
} from '@tanstack/vue-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useVueTable,
} from '@tanstack/vue-table'
import { valueUpdater } from '@/lib/utils'
import { DataGrid, DataGridTable } from '@/shared/components/common/data-grid'
import { columns } from './columns/artist.columns'
import type { Artist } from '@/modules/dashboard/models/dashboard.models'

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<RowSelectionState>({})
const expanded = ref<ExpandedState>({})
const globalFilter = ref('')

const data = ref<Artist[]>([
  {
    name: 'Surandino',
    image_iconn: '2990-LANDING_SURANDINO (1).jpg',
    num_events: 5,
  },
  {
    name: 'Corazón Serrano',
    image_iconn: '6507-ICONO-LANDING_CORAZON-SERRANO.jpg',
    num_events: 4,
  },
  {
    name: 'Armonia 10 de Piura',
    image_iconn: '9785-ICONO-LANDING_ARMONIA.jpg',
    num_events: 4,
  },
  {
    name: 'Agua Marina',
    image_iconn: '1419-ICONO-LANDING_AGUA-MARINA (1).jpg',
    num_events: 3,
  },
  {
    name: 'Barrio Fino',
    image_iconn: '4221-LANDING_BARRIO-FINO.jpg',
    num_events: 2,
  },
  {
    name: 'Marisol',
    image_iconn: '2403-LANDING_MARISOL (1).jpg',
    num_events: 2,
  },
  {
    name: 'Caribeños de Guadalupe',
    image_iconn: '4485-ICONO-LANDING_CARIBEÑOS.jpg',
    num_events: 2,
  },
  {
    name: 'Ayrampito',
    image_iconn: '6045-LANDING_AYRAMPITO (1).jpg',
    num_events: 2,
  },
  {
    name: 'JP El Chamaco',
    image_iconn: '7701-LANDING_JP-EL-CHAMACO.jpg',
    num_events: 2,
  },
  {
    name: 'Cachudas pero Conchudas',
    image_iconn: '8152-LANDING_CACHUDAS.jpg',
    num_events: 2,
  },
])
const isLoading = ref(false)

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilter),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value
    },
    get globalFilter() {
      return globalFilter.value
    },
  },
  enableRowSelection: true,
  initialState: {
    pagination: {
      pageSize: 5,
    },
  },
})

const recordCount = computed(() => data.value.length)
</script>
<template>
  <DataGrid
    :table="table"
    :record-count="recordCount"
    :is-loading="isLoading"
    loading-mode="skeleton"
    :table-layout="{
      rowBorder: true,
      cellBorder: true,
      headerBackground: true,
      headerBorder: true,
      columnsPinnable: true,
    }"
  >
    <DataGridTable />
  </DataGrid>
</template>
