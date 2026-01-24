import type { LucideIcon } from 'lucide-vue-next'

export interface MenuItem {
  title: string
  icon?: LucideIcon
  path?: string
  rootPath?: string
  heading?: string
  children?: MenuChildren[]
  disabled?: boolean
  external?: boolean
  permissions?: string[]
}

export type MenuChildren = Omit<MenuItem, 'children' | 'icon' | 'heading'>

export type MenuConfig = MenuItem[]
