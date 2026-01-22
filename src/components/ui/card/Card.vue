<script setup lang="ts">
import { provide, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { CardContextKey, cardVariants } from './card'

interface CardProps {
  variant?: 'default' | 'accent'
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
})

provide(CardContextKey, {
  variant: props.variant,
})
</script>

<template>
  <div data-slot="card" :class="cn(cardVariants({ variant: props.variant }), props.class)">
    <slot />
  </div>
</template>
