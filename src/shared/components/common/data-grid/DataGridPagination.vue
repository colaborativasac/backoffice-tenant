<script setup lang="ts">
import { computed } from 'vue'
import {
  Pagination,
  PaginationFirst,
  PaginationNext,
  PaginationLast,
  PaginationEllipsis,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { PaginationMeta, PerPageOption } from './ag-grid.types'
import type { AcceptableValue } from 'reka-ui'
import { Label } from '@/components/ui/label'
import {
  ChevronFirstIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronLastIcon,
} from 'lucide-vue-next'

interface Props {
  /** Meta de paginación (de Laravel) */
  meta: PaginationMeta
  /** Opciones de items por página */
  perPageOptions?: PerPageOption[]
  /** Mostrar selector de items por página */
  showPerPageSelector?: boolean
  /** Mostrar información de registros */
  showInfo?: boolean
  /** Número de páginas visibles a cada lado */
  siblingCount?: number
  /** Deshabilitado (durante carga) */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  perPageOptions: () => [10, 15, 20, 25, 50],
  showPerPageSelector: true,
  showInfo: true,
  siblingCount: 1,
  disabled: false,
})

const emit = defineEmits<{
  pageChange: [page: number]
  perPageChange: [perPage: PerPageOption]
}>()

const infoText = computed(() => {
  const { from, to, total } = props.meta
  if (from === null || to === null) {
    return `Mostrando 0 de ${total} resultados`
  }
  return `Mostrando ${from}-${to} de ${total} resultados`
})

// handlers
function handlePageChange(page: number) {
  if (page !== props.meta.currentPage && !props.disabled) {
    emit('pageChange', page)
  }
}

function handlePerPageChange(value: AcceptableValue) {
  const perPage = Number(value) as PerPageOption
  if (perPage !== props.meta.perPage) {
    emit('perPageChange', perPage)
  }
}
</script>
<template>
  <div
    class="flex w-full flex-wrap items-center justify-between gap-6 max-sm:justify-center px-4 py-3"
  >
    <div class="flex shrink-0 items-center gap-3">
      <Label v-if="showInfo" htmlFor="{id}">Filas por página</Label>
      <Select
        v-if="showPerPageSelector"
        :model-value="String(meta.perPage)"
        :disabled="disabled"
        @update:model-value="handlePerPageChange"
        defaultValue="10"
      >
        <SelectTrigger id="{id}" class="w-fit whitespace-nowrap">
          <SelectValue placeholder="Selecciona el número de resultados" />
        </SelectTrigger>
        <SelectContent
          class="[&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto"
        >
          <SelectItem v-for="option in perPageOptions" :key="option" :value="String(option)">{{
            option
          }}</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div
      class="text-muted-foreground flex grow items-center justify-end whitespace-nowrap max-sm:justify-center"
    >
      <p class="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
        {{ infoText }}
      </p>
    </div>
    <Pagination
      v-slot="{ page }"
      :total="meta.total"
      :items-per-page="meta.perPage"
      :sibling-count="siblingCount"
      :default-page="meta.currentPage"
      :page="meta.currentPage"
      class="w-fit max-sm:mx-0"
      show-edges
      @update:page="handlePageChange"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationFirst>
          <ChevronFirstIcon class="size-4" />
        </PaginationFirst>
        <PaginationPrevious>
          <ChevronLeftIcon class="size-4" />
        </PaginationPrevious>
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
            :disabled="disabled"
            :aria-current="item.value === page ? 'page' : undefined"
          />
          <PaginationEllipsis v-else :index="index" />
        </template>
        <PaginationNext>
          <ChevronRightIcon class="size-4" />
        </PaginationNext>
        <PaginationLast>
          <ChevronLastIcon class="size-4" />
        </PaginationLast>
      </PaginationContent>
    </Pagination>
  </div>
</template>
