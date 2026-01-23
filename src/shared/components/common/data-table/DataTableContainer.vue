<script setup lang="ts">
import { cn } from '@/lib/utils'

interface DataTableContainerProps {
  border?: boolean
  rounded?: boolean
  class?: string
}

const props = withDefaults(defineProps<DataTableContainerProps>(), {
  border: true,
  rounded: true,
})
</script>

<template>
  <div
    data-slot="data-grid"
    :class="
      cn(
        'grid w-full scrollable-x-auto',
        border && 'border border-border',
        rounded && 'rounded-lg',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
