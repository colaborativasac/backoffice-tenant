<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useCardContext, cardHeaderVariants } from './card'

interface CardHeaderProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<CardHeaderProps>()
const { variant } = useCardContext()
</script>

<template>
  <div data-slot="card-header" :class="cn(cardHeaderVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
