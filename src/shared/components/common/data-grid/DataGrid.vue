<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale'

import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'
import { AG_GRID_THEME, DEFAULT_COL_DEF, DEFAULT_GRID_OPTIONS } from './data-grid.config'
import type { DataGridProps, DataGridEmits, DataGridExpose } from './ag-grid.types'

const props = withDefaults(defineProps<DataGridProps>(), {
  rowData: () => [],
  columnDefs: () => [],
  defaultColDef: () => ({}),
  loading: false,
  height: '500px',
})

const emit = defineEmits<DataGridEmits>()

const attrs = useAttrs()
// const slots = useSlots()

const gridApi = ref<GridApi | null>(null)

const theme = computed(() => AG_GRID_THEME)
const localeText = computed(() => AG_GRID_LOCALE_ES)

const mergedDefaultColDef = computed<ColDef>(() => ({ ...DEFAULT_COL_DEF, ...props.defaultColDef }))

const gridOptions = computed(() => ({
  ...DEFAULT_GRID_OPTIONS,
  pagination: false,
}))

function onGridReady(params: GridReadyEvent) {
  gridApi.value = params.api
  emit('ready', params.api)
  emit('gridReady', params)
}

function exportCsv(fileName = 'export.csv') {
  gridApi.value?.exportDataAsCsv({ fileName })
}

function autoSizeColumns() {
  gridApi.value?.autoSizeAllColumns()
}

function sizeColumnsToFit() {
  gridApi.value?.sizeColumnsToFit()
}

function deselectAll() {
  gridApi.value?.deselectAll()
}

function getSelectedRows<T = unknown>(): T[] {
  return gridApi.value?.getSelectedRows() ?? []
}

function refreshCells() {
  gridApi.value?.refreshCells()
}

defineExpose<DataGridExpose>({
  api: gridApi.value,
  exportCsv,
  autoSizeColumns,
  sizeColumnsToFit,
  deselectAll,
  getSelectedRows,
  refreshCells,
})
</script>
<template>
  <div class="w-full" :style="{ height }">
    <AgGridVue
      :theme="theme"
      :locale-text="localeText"
      :row-data="rowData"
      :column-defs="columnDefs"
      :default-col-def="mergedDefaultColDef"
      :loading="loading"
      :style="{ height: '100%' }"
      v-bind="{ ...gridOptions, ...attrs }"
      @grid-ready="onGridReady"
      @cell-value-changed="emit('cellValueChanged', $event)"
      @sort-changed="emit('sortChanged', $event)"
      @pagination-changed="emit('paginationChanged', $event)"
      @row-clicked="emit('rowClicked', $event)"
      @row-double-clicked="emit('rowDoubleClicked', $event)"
      @selection-changed="emit('selectionChanged', $event)"
      @filter-changed="emit('filterChanged', $event)"
      @row-data-updated="emit('rowDataUpdated', $event)"
      @first-data-rendered="emit('firstDataRendered', $event)"
    />
  </div>
</template>
