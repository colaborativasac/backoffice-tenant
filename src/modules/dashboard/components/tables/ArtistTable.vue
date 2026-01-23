<script setup lang="ts">
import { ref, computed } from 'vue'
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { DataTable, DataTableTable } from '@/shared/components/common/data-table'
import { columns } from './columns/artist.columns'
import type { Artist } from '@/modules/dashboard/models/dashboard.models'

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
  state: {},
  enableRowSelection: false,
  initialState: {},
})

const recordCount = computed(() => data.value.length)
</script>
<template>
  <DataTable
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
    <DataTableTable />
  </DataTable>
</template>
