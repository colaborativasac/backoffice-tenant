<script setup lang="ts" generic="TData, TValue">
import { computed, type Component } from 'vue'
import type { Column } from '@tanstack/vue-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Check, CirclePlus } from 'lucide-vue-next'

interface FilterOption {
  label: string
  value: string
  icon?: Component
}

interface DataTableColumnFilterProps {
  column?: Column<TData, TValue>
  title?: string
  options: FilterOption[]
}

const props = defineProps<DataTableColumnFilterProps>()

const facets = computed(() => props.column?.getFacetedUniqueValues())

const selectedValues = computed(() => {
  const filterValue = props.column?.getFilterValue() as string[] | undefined
  return new Set(filterValue ?? [])
})

function toggleOption(value: string) {
  const current = new Set(selectedValues.value)
  if (current.has(value)) {
    current.delete(value)
  } else {
    current.add(value)
  }
  const filterValues = Array.from(current)
  props.column?.setFilterValue(filterValues.length ? filterValues : undefined)
}

function clearFilters() {
  props.column?.setFilterValue(undefined)
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm">
        <CirclePlus class="size-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} seleccionados
            </Badge>
            <template v-else>
              <Badge
                v-for="option in options.filter((opt) => selectedValues.has(opt.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-50 p-0" align="start">
      <Command>
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="toggleOption(option.value)"
            >
              <div
                :class="
                  cn(
                    'me-2 flex size-4.5  items-center justify-center rounded-sm border border-border',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'opacity-50 [&_svg]:invisible',
                  )
                "
              >
                <Check class="size-3.5" />
              </div>
              <component
                v-if="option.icon"
                :is="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ms-auto flex h-4 w-4 items-center justify-center tabular-nums font-mono text-xs"
              >
                {{ facets.get(option.value) }}
              </span>
            </CommandItem>
          </CommandGroup>
          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem @select="clearFilters" value="" class="justify-center text-center">
                Limpiar filtros
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
