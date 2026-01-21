<script setup lang="ts">
import { computed } from 'vue'
import { useDataGrid } from '.'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface DataGridRowSelectAllProps {
  size?: 'sm' | 'default' | 'lg'
}

const props = withDefaults(defineProps<DataGridRowSelectAllProps>(), {
  size: 'sm',
})

const { table, recordCount, isLoading } = useDataGrid()

const isAllSelected = computed(() => table.getIsAllPageRowsSelected())
const isSomeSelected = computed(() => table.getIsSomePageRowsSelected())

const modelValue = computed(() => {
  if (isAllSelected.value) return true
  if (isSomeSelected.value) return 'indeterminate'
  return false
})

function handleChange(value: boolean | 'indeterminate') {
  table.toggleAllPageRowsSelected(value === true)
}
</script>

<template>
  <Checkbox
    :model-value="modelValue"
    @update:model-value="handleChange"
    :disabled="isLoading || recordCount === 0"
    aria-label="Seleccionar todo"
    :size="props.size"
    :class="cn('align-[inherit]')"
  />
</template>
