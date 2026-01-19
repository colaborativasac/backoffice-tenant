<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/core/composables'
import { Moon } from 'lucide-vue-next'
import { Switch } from '@/components/ui/switch'

const { user, logout } = useAuthStore()
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child><slot /></DropdownMenuTrigger>
    <DropdownMenuContent class="w-64" side="bottom" align="end">
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center gap-2">
          <img
            src="https://github.com/victormarcas.png"
            class="size-9 rounded-full border-2 border-green-500 shrink-0"
            alt=""
          />
          <div class="flex flex-col">
            <span class="text-sm font-medium leading-none text-mono">{{ user?.name }}</span>
            <span class="text-xs leading-none text-muted-foreground">{{ user?.email }}</span>
            <Badge size="xs" class="mt-1">Super administrador</Badge>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem as-child>
        <router-link to="/profile">Perfil</router-link>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <router-link to="/security">Seguridad</router-link>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <router-link to="/members-and-roles">Miembros y roles</router-link>
      </DropdownMenuItem>
      <DropdownMenuItem
        class="flex items-center gap-2"
        @select="(event: any) => event.preventDefault()"
      >
        <Moon />
        <div class="flex items-center gap-2 justify-between grow">
          Dark Mode
          <Switch v-model="isDark" @update:checked="toggleTheme" />
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <div class="p-2 mt-1">
        <Button variant="outline" size="sm" @click="logout" class="w-full">Cerrar sesión</Button>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
