<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCardContext, cardContentVariants } from './card'
import { cn } from '@/lib/utils'

export interface CardContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<CardContentProps>()
const { variant } = useCardContext()
</script>

<template>
  <div data-slot="card-content" :class="cn(cardContentVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
