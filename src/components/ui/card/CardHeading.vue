<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

export interface CardHeadingProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<CardHeadingProps>()
</script>

<template>
  <div data-slot="card-heading" :class="cn('space-y-1', props.class)">
    <slot />
  </div>
</template>
