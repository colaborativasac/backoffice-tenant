<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { NotificationsDropdownMenu, UserDropdownMenu } from '@/shared/components/common/topbar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores'
import { Bell, BrushCleaning, Send } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const { user } = useAuthStore()

const generateFallbackInitials = (name: string | undefined) => {
  if (!name) return 'NN'
  const names = name.split(' ')
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join('')
  return initials.slice(0, 2)
}
</script>
<template>
  <header
    class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
  >
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
      <div class="ml-auto flex items-center gap-3">
        <TooltipProvider class="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" size="icon-sm">
                <BrushCleaning />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Limpiar caché</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" size="icon-sm">
                <Send />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sincronizar Whatsapp</p>
            </TooltipContent>
          </Tooltip>
          <NotificationsDropdownMenu>
            <Button variant="outline" size="icon-sm" class="relative">
              <Bell />
              <span
                class="-top-1 -right-1 absolute size-3 rounded-full border-2 border-background bg-green-500"
              />
            </Button>
          </NotificationsDropdownMenu>
        </TooltipProvider>
        <UserDropdownMenu>
          <Avatar>
            <AvatarImage src="https://github.com/victormarcas.png" />
            <AvatarFallback>{{ generateFallbackInitials(user?.name) }}</AvatarFallback>
          </Avatar>
        </UserDropdownMenu>
      </div>
    </div>
  </header>
</template>
