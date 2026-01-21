<script setup lang="ts" generic="TData">
import { computed } from 'vue'
import type { Table } from '@tanstack/vue-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataGridColumnVisibilityProps {
  table: Table<TData>
}

const props = defineProps<DataGridColumnVisibilityProps>()

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()),
)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-[150px]">
      <DropdownMenuLabel class="font-medium">Mostrar/Ocultar Columnas</DropdownMenuLabel>
      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :model-value="column.getIsVisible()"
        @update:model-value="(value) => column.toggleVisibility(!!value)"
        @select="(e) => e.preventDefault()"
      >
        {{ column.columnDef.meta?.headerTitle || column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
