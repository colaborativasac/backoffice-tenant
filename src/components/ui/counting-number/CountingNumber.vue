<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { motion, useInView, useMotionValue, animate } from 'motion-v'
import { cn } from '@/lib/utils'

export interface CountingNumberProps {
  from?: number
  to?: number
  duration?: number // seconds
  delay?: number // ms
  class?: string
  startOnView?: boolean
  once?: boolean
  format?: (value: number) => string
}

const props = withDefaults(defineProps<CountingNumberProps>(), {
  from: 0,
  to: 100,
  duration: 2,
  delay: 0,
  startOnView: true,
  once: false,
})

const emit = defineEmits<{
  complete: []
}>()

const numberRef = ref<HTMLElement>()
const isInView = useInView(numberRef, {
  once: props.once,
})
const hasAnimated = ref(false)
const display = ref(props.from)
const motionValue = useMotionValue(props.from)

let timeoutId: ReturnType<typeof setTimeout> | null = null
let animationControls: ReturnType<typeof animate> | null = null

const shouldStart = computed(() => {
  return !props.startOnView || (isInView.value && (!props.once || !hasAnimated.value))
})

watch(shouldStart, (newValue) => {
  if (!newValue) return

  hasAnimated.value = true

  timeoutId = setTimeout(() => {
    animationControls = animate(motionValue, props.to, {
      duration: props.duration,
      onUpdate: (v) => {
        display.value = v
      },
      onComplete: () => {
        emit('complete')
      },
    })
  }, props.delay)
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
  if (animationControls) animationControls.stop()
})

const formattedValue = computed(() => {
  return props.format ? props.format(display.value) : Math.round(display.value)
})
</script>

<template>
  <motion.span ref="numberRef" :class="cn('inline-block tabular-nums', props.class)">
    {{ formattedValue }}
  </motion.span>
</template>
