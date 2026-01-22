<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCardContext, cardFooterVariants } from './card'
import { cn } from '@/lib/utils'

interface CardFooterProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<CardFooterProps>()

const { variant } = useCardContext()
</script>

<template>
  <div data-slot="card-footer" :class="cn(cardFooterVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
