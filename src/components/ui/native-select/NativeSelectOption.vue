<!-- @fallthroughAttributes true -->
<!-- @strictTemplates true -->

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  value?: string | number
  selected?: boolean
}>()
</script>

<template>
  <option
    data-slot="native-select-option"
    :class="cn('bg-popover text-popover-foreground', props.class)"
    :value="props.value"
    :selected="props.selected"
  >
    <slot />
  </option>
</template>
