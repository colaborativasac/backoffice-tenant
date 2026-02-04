<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import type { ICellRendererParams } from 'ag-grid-community'
import { computed } from 'vue'

interface Props {
  params: ICellRendererParams
}

const props = defineProps<Props>()

const variant = computed(() => {
  return props.params.value ? 'default' : 'destructive'
})
</script>

<template>
  <Badge :variant="variant">
    {{ props.params.value }}
  </Badge>
</template>
