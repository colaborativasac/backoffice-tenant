<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-vue-next'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child><slot /></DropdownMenuTrigger>
    <DropdownMenuContent class="w-64" side="bottom" align="end">
      <div class="flex flex-col p-3">
        <Empty class="md:px-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Check />
            </EmptyMedia>
            <EmptyTitle class="text-base">¡Estás al día!</EmptyTitle>
            <EmptyDescription class="leading-tight"
              >No tienes notificaciones pendientes</EmptyDescription
            >
          </EmptyHeader>
        </Empty>
      </div>
      <DropdownMenuSeparator />
      <div class="p-2 mt-1 text-center">
        <Button variant="outline" size="sm" class="w-full">Mostrar todas las notificaciones</Button>
        <span class="text-muted-foreground text-xs leading-none"
          >Última actualización hace 20 segundos</span
        >
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
