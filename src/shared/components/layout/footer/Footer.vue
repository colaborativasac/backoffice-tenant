<script setup lang="ts">
import { ref } from 'vue'
import { Container } from '@/shared/components/common/container'
const currentYear = ref<number>(new Date().getFullYear())
</script>
<template>
  <footer class="">
    <Container>
      <div
        class="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5"
      >
        <div class="flex order-2 md:order-1 gap-2 font-normal text-sm">
          &copy; {{ currentYear }} SupaDev. All rights reserved.
        </div>
      </div>
    </Container>
  </footer>
</template>
