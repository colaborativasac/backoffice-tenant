<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'
import { toAbsoluteUrl } from '@/core/helpers'
</script>

<template>
  <main class="flex flex-col items-center justify-center grow bg-center bg-no-repeat">
    <div class="m-5">
      <router-link to="/">
        <img
          :src="toAbsoluteUrl('/media/app/logo-vaope.svg')"
          alt="Vaope Logo"
          class="h-5 w-auto"
        />
      </router-link>
    </div>
    <Card class="w-full max-w-100">
      <CardContent class="p-6">
        <RouterView />
      </CardContent>
    </Card>
  </main>
  <Toaster position="top-center" />
</template>
