<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  title?: string
  description?: string
}

const props = defineProps<Props>()

const route = useRoute()

const displayTitle = computed(() => {
  return props.title || route.meta.title || ''
})
</script>

<template>
  <h1 class="text-lg font-medium leading-none text-mono">{{ displayTitle }}</h1>
</template>
