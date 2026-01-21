<script setup lang="ts" generic="TData">
import type { Row } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface DataGridRowSelectProps {
  row: Row<TData>
  size?: 'sm' | 'default' | 'lg'
}

const props = withDefaults(defineProps<DataGridRowSelectProps>(), {
  size: 'sm',
})
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      :class="
        cn(
          'hidden absolute top-0 bottom-0 start-0 w-0.5 bg-primary',
          row.getIsSelected() && 'block',
        )
      "
    />
    <Checkbox
      :model-value="row.getIsSelected()"
      @update:model-value="(value) => row.toggleSelected(!!value)"
      aria-label="Seleccionar fila"
      :size="props.size"
      :class="cn('align-[inherit]')"
    />
  </div>
</template>
