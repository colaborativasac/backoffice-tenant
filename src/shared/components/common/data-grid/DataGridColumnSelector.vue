<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import type { ColDef, Column, GridApi } from 'ag-grid-community'
import { computed, ref, watch } from 'vue'
import { Check, Settings2 } from 'lucide-vue-next'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

interface Props {
  gridApi: GridApi | null
  maxHeight?: string
}

interface ColumnItem {
  colId: string
  headerName: string
  visible: boolean
  field?: string
  type?: string | string[]
  pinned?: 'left' | 'right' | null
  lockVisible?: boolean
  order: number
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: '200px',
})
const emit = defineEmits<{
  columnVisibilityChanged: [colId: string, visible: boolean]
  columnOrderChanged: [columns: ColumnItem[]]
  allColumnsVisibilityChanged: [visible: boolean]
}>()

const isOpen = ref(false)
const columns = ref<ColumnItem[]>([])
const searchQuery = ref('')

/*
  Computers
*/
const filteredColumns = computed(() => {
  if (!searchQuery.value.trim()) return columns.value
  const query = searchQuery.value.toLocaleLowerCase()
  return columns.value.filter(
    (col) =>
      col.headerName.toLocaleLowerCase().includes(query) ||
      col.field?.toLocaleLowerCase().includes(query) ||
      col.colId.toLocaleLowerCase().includes(query),
  )
})

const visibleCount = computed(() => columns.value.filter((col) => col.visible).length)

// const allVisible = computed(() => columns.value.every((col) => col.visible))

function loadColumns() {
  if (!props.gridApi) return
  const allColumns = props.gridApi!.getColumns() ?? []
  columns.value = allColumns.map((col: Column, index: number) => {
    const colDef: ColDef = col.getColDef()
    return {
      colId: col.getColId(),
      headerName: colDef.headerName ?? col.getColId(),
      visible: col.isVisible(),
      field: colDef.field,
      type: colDef.type,
      pinned: col.getPinned() ? (col.isPinnedLeft() ? 'left' : 'right') : null,
      lockVisible: colDef.lockVisible ?? false,
      order: index,
    }
  })
}
// visibilidad de una columna
function toggleColumn(colId: string, visible: boolean) {
  console.log('toggleColumn', colId, visible)
  if (!props.gridApi) return
  props.gridApi!.setColumnsVisible([colId], visible)
  const col = columns.value.find((c) => c.colId === colId)
  if (col) {
    col.visible = visible
  }
  emit('columnVisibilityChanged', colId, visible)
}
// mostramos u ocultamos todas las columnas
// function toggleAllColumns(visible: boolean) {
//   if (!props.gridApi) return
//   const colIds = columns.value.filter((col) => !col.lockVisible).map((col) => col.colId)
//   props.gridApi.setColumnsVisible(colIds, visible)
//   emit('allColumnsVisibilityChanged', visible)
// }

watch(
  () => props.gridApi,
  (api) => {
    if (api) {
      loadColumns()
    }
  },
  { immediate: true },
)

watch(isOpen, (open) => {
  if (open && props.gridApi) {
    loadColumns()
  }
})

defineExpose({
  loadColumns,
  open: () => (isOpen.value = true),
  close: () => (isOpen.value = false),
})
</script>
<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button variant="outline">
        <Settings2 />
        Columnas
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 max-w-60">
      <Command>
        <CommandInput placeholder="Buscar columna..." />
        <CommandList>
          <CommandEmpty>No se encontraron columnas.</CommandEmpty>
          <CommandGroup :heading="`Mostrando ${visibleCount} de ${columns.length} columnas`">
            <CommandItem
              v-for="col in filteredColumns"
              :key="col.colId"
              :value="col.colId"
              @select="() => toggleColumn(col.colId, !col.visible)"
              class="flex items-center justify-between gap-2"
            >
              <span class="truncate">{{ col.headerName }}</span>
              <span class="shrink-0 flex items-center justify-center size-4">
                <Check v-if="col.visible" class="size-4 text-primary" />
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
