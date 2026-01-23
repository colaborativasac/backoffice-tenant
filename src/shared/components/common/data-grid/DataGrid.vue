<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale'

import type {
  ColDef,
  GridOptions,
  GridApi,
  GridReadyEvent,
  CellChangedEvent,
  SortChangedEvent,
  PaginationChangedEvent,
} from 'ag-grid-community'
import { AG_GRID_THEME } from './data-grid.config'

interface DataGridProps extends GridOptions {
  defaultColDef?: ColDef
}

const props = withDefaults(defineProps<DataGridProps>(), {
  rowData: () => [],
  defaultColDef: () => ({}),
  loading: false,
  loadingMessage: 'Cargando...',
})

const emit = defineEmits<{
  'grid-ready': [params: GridReadyEvent]
  'cell-value-changed': [params: CellChangedEvent]
  'sort-changed': [params: SortChangedEvent]
  'pagination-changed': [params: PaginationChangedEvent]
}>()

const attrs = useAttrs()
// const slots = useSlots()

const gridApi = ref<GridApi | null>(null)

const theme = computed(() => AG_GRID_THEME)
const localeText = computed(() => AG_GRID_LOCALE_ES)

const mergedDefaultColDef = computed<ColDef>(() => {
  return {
    sortable: false,
    filter: false,
    resizable: false,
    flex: 1,
    minWidth: 100,
    ...props.defaultColDef,
  }
})

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api
  emit('grid-ready', params)
}

defineExpose({
  gridApi,
  getApi: () => gridApi.value,
})
</script>
<template>
  <div class="h-[60vh] w-full">
    <AgGridVue
      :theme="theme"
      :localeText="localeText"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="mergedDefaultColDef"
      v-bind="attrs"
      :style="{ height: '100%' }"
      @grid-ready="onGridReady"
      @cell-value-changed="emit('cell-value-changed', $event)"
      @sort-changed="emit('sort-changed', $event)"
      @pagination-changed="emit('pagination-changed', $event)"
    />
  </div>
</template>
