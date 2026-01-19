<script setup lang="ts">
import { cn } from '@/lib/utils'
import { containerVariants } from '.'
import type { ContainerVariants } from '.'
import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'

interface Props extends PrimitiveProps {
  variant?: ContainerVariants['variant']
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div data-slot="container" :class="cn(containerVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
