<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from '@/shared/components/layout/sidebar'
import { Header } from '@/shared/components/layout/header'
import { STORAGE_KEYS } from '@/lib'
import { Footer } from '@/shared/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <SidebarProvider
    :storage-key="STORAGE_KEYS.SIDEBAR_STATE"
    :style="{
      '--sidebar-width': 'calc(var(--spacing) * 64)',
      '--header-height': 'calc(var(--spacing) * 12)',
    }"
  >
    <Sidebar />
    <SidebarInset>
      <Header />
      <div class="grow pt-5">
        <RouterView />
      </div>
      <Footer />
    </SidebarInset>
  </SidebarProvider>
  <Toaster position="top-center" />
</template>
