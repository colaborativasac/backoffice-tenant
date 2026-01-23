<script setup lang="ts">
import { computed } from 'vue'
import { useDataTable } from '.'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import type { AcceptableValue } from 'reka-ui'

interface DataGridPaginationProps {
  sizes?: number[]
  sizesLabel?: string
  sizesDescription?: string
  moreLimit?: number
  more?: boolean
  info?: string
  class?: string
}

const props = withDefaults(defineProps<DataGridPaginationProps>(), {
  sizes: () => [5, 10, 25, 50, 100],
  sizesLabel: 'Show',
  sizesDescription: 'per page',
  moreLimit: 5,
  more: false,
  info: '{from} - {to} of {count}',
})

const { table, recordCount, isLoading } = useDataTable()

const btnBaseClasses = 'size-7 p-0 text-sm'
const btnArrowClasses = `${btnBaseClasses} rtl:transform rtl:rotate-180`

const pageIndex = computed(() => table.getState().pagination.pageIndex)
const pageSize = computed(() => table.getState().pagination.pageSize)
const pageCount = computed(() => table.getPageCount())

const from = computed(() => pageIndex.value * pageSize.value + 1)
const to = computed(() => Math.min((pageIndex.value + 1) * pageSize.value, recordCount))

const paginationInfo = computed(() =>
  props.info
    .replace('{from}', from.value.toString())
    .replace('{to}', to.value.toString())
    .replace('{count}', recordCount.toString()),
)

// Pagination group logic
const currentGroupStart = computed(
  () => Math.floor(pageIndex.value / props.moreLimit) * props.moreLimit,
)
const currentGroupEnd = computed(() =>
  Math.min(currentGroupStart.value + props.moreLimit, pageCount.value),
)

const pageButtons = computed(() => {
  const buttons: number[] = []
  for (let i = currentGroupStart.value; i < currentGroupEnd.value; i++) {
    buttons.push(i)
  }
  return buttons
})

const showEllipsisPrev = computed(() => currentGroupStart.value > 0)
const showEllipsisNext = computed(() => currentGroupEnd.value < pageCount.value)

function goToPage(index: number) {
  if (pageIndex.value !== index) {
    table.setPageIndex(index)
  }
}

function goToPrevGroup() {
  table.setPageIndex(currentGroupStart.value - 1)
}

function goToNextGroup() {
  table.setPageIndex(currentGroupEnd.value)
}

function handlePageSizeChange(value: AcceptableValue) {
  table.setPageSize(Number(value))
}
</script>

<template>
  <div
    data-slot="data-grid-pagination"
    :class="
      cn(
        'flex flex-wrap flex-col sm:flex-row justify-between items-center gap-2.5 py-2.5 sm:py-0 grow',
        props.class,
      )
    "
  >
    <!-- Rows per page -->
    <div class="flex flex-wrap items-center space-x-2.5 pb-2.5 sm:pb-0 order-2 sm:order-1">
      <template v-if="isLoading">
        <Skeleton class="h-8 w-44" />
      </template>
      <template v-else>
        <div class="text-sm text-muted-foreground">Filas por página</div>
        <Select :model-value="`${pageSize}`" @update:model-value="handlePageSizeChange">
          <SelectTrigger class="w-fit h-8">
            <SelectValue :placeholder="`${pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top" class="min-w-[50px]">
            <SelectItem v-for="size in sizes" :key="size" :value="`${size}`">
              {{ size }}
            </SelectItem>
          </SelectContent>
        </Select>
      </template>
    </div>

    <!-- Pagination controls -->
    <div
      class="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-2.5 pt-2.5 sm:pt-0 order-1 sm:order-2"
    >
      <template v-if="isLoading">
        <Skeleton class="h-8 w-60" />
      </template>
      <template v-else>
        <div class="text-sm text-muted-foreground text-nowrap order-2 sm:order-1">
          {{ paginationInfo }}
        </div>
        <div v-if="pageCount > 1" class="flex items-center space-x-1 order-1 sm:order-2">
          <!-- Previous -->
          <Button
            size="sm"
            variant="ghost"
            :class="btnArrowClasses"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            <span class="sr-only">Ir a la página anterior</span>
            <ChevronLeft class="size-4" />
          </Button>

          <!-- Ellipsis Prev -->
          <Button
            v-if="showEllipsisPrev"
            size="sm"
            variant="ghost"
            :class="btnBaseClasses"
            @click="goToPrevGroup"
          >
            ...
          </Button>

          <!-- Page Buttons -->
          <Button
            v-for="page in pageButtons"
            :key="page"
            size="sm"
            variant="ghost"
            :class="
              cn(
                btnBaseClasses,
                'text-muted-foreground',
                pageIndex === page && 'bg-accent text-accent-foreground',
              )
            "
            @click="goToPage(page)"
          >
            {{ page + 1 }}
          </Button>

          <!-- Ellipsis Next -->
          <Button
            v-if="showEllipsisNext"
            size="sm"
            variant="ghost"
            :class="btnBaseClasses"
            @click="goToNextGroup"
          >
            ...
          </Button>

          <!-- Next -->
          <Button
            size="sm"
            variant="ghost"
            :class="btnArrowClasses"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            <span class="sr-only">Ir a la página siguiente</span>
            <ChevronRight class="size-4" />
          </Button>
        </div>
      </template>
    </div>
  </div>
</template>
