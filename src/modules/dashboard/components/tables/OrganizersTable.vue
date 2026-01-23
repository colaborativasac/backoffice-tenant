<script setup lang="ts">
import { ref, computed } from 'vue'
import { getCoreRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table'
import { DataGrid, DataGridTable } from '@/shared/components/common/data-grid'
import { columns } from './columns/organizers.columns'
import type { Organizers } from '../../models/dashboard.models'

const data = ref<Organizers[]>([
  {
    name: 'Corazón Serrano',
    num_events: 4,
  },
  {
    name: 'Armonia 10 de Piura',
    num_events: 4,
  },
  {
    name: 'Agua Marina',
    num_events: 3,
  },
  {
    name: 'Barrio Fino',
    num_events: 2,
  },
  {
    name: 'Marisol',
    num_events: 2,
  },
])

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: {},
  enableRowSelection: false,
  initialState: {},
})

const recordCount = computed(() => data.value.length)
const isLoading = ref(false)
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
    }"
  >
    <DataGridTable />
  </DataGrid>
</template>
