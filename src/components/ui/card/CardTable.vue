<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCardContext, cardTableVariants } from './card'
import { cn } from '@/lib/utils'

export interface CardTableProps {
  class?: HTMLAttributes['class']
}
const props = defineProps<CardTableProps>()

const { variant } = useCardContext()
</script>

<template>
  <div data-slot="card-table" :class="cn(cardTableVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
