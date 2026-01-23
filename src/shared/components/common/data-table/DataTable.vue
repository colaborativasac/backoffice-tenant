<script setup lang="ts" generic="TData extends object">
import { provide, computed, reactive } from 'vue'
import {
  DATA_TABLE_KEY,
  type DataTableProps,
  type DataTableLayout,
  type DataTableClassNames,
} from '.'

// Props
const props = withDefaults(defineProps<DataTableProps<TData>>(), {
  isLoading: false,
  loadingMode: 'skeleton',
  loadingMessage: 'Cargando...',
  emptyMessage: 'No hay datos disponibles',
  tableLayout: () => ({}),
  tableClassNames: () => ({}),
})

// Default values
const defaultTableLayout: DataTableLayout = {
  dense: false,
  cellBorder: false,
  rowBorder: true,
  rowRounded: false,
  stripped: false,
  headerSticky: false,
  headerBackground: true,
  headerBorder: true,
  width: 'fixed',
  columnsVisibility: false,
  columnsResizable: false,
  columnsPinnable: false,
  columnsMovable: false,
  columnsDraggable: false,
  rowsDraggable: false,
}

const defaultTableClassNames: DataTableClassNames = {
  base: '',
  header: '',
  headerRow: '',
  headerSticky: 'sticky top-0 z-10 bg-background/90 backdrop-blur-sm',
  body: '',
  bodyRow: '',
  footer: '',
  edgeCell: '',
}

// Merged props as computed for reactivity
const mergedTableLayout = computed(() => ({
  ...defaultTableLayout,
  ...props.tableLayout,
}))

const mergedTableClassNames = computed(() => ({
  ...defaultTableClassNames,
  ...props.tableClassNames,
}))

// Create a reactive context object
const context = reactive({
  get props() {
    return {
      ...props,
      tableLayout: mergedTableLayout.value,
      tableClassNames: mergedTableClassNames.value,
    }
  },
  get table() {
    return props.table
  },
  get recordCount() {
    return props.recordCount
  },
  get isLoading() {
    return props.isLoading
  },
})

// Provide context
provide(DATA_TABLE_KEY, context)
</script>

<template>
  <slot />
</template>
