<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

const route = useRoute()

const LayoutComponent = computed(() => {
  return route.meta.layoutComponent || BlankLayout
})

onMounted(() => {
  // añadir el script que intentará recuperar la sesión del usuario
  console.log('App mounted')
})
</script>

<template>
  <component :is="LayoutComponent">
    <RouterView />
  </component>
</template>
