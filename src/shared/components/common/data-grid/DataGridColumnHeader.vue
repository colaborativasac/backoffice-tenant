<script setup lang="ts" generic="TData extends object, TValue">
import { computed, type VNode } from 'vue'
import type { Column } from '@tanstack/vue-table'
import { useDataGrid } from '.'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ArrowDown,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  ArrowUp,
  Check,
  ChevronsUpDown,
  PinOff,
  Settings2,
} from 'lucide-vue-next'

interface DataGridColumnHeaderProps {
  column: Column<TData, TValue>
  title?: string
  pinnable?: boolean
  visibility?: boolean
}

const props = withDefaults(defineProps<DataGridColumnHeaderProps>(), {
  title: '',
  pinnable: true,
  visibility: false,
})

const slots = defineSlots<{
  icon?: () => VNode
  filter?: () => VNode
}>()

const { isLoading, table, props: gridProps, recordCount } = useDataGrid<TData>()

// Move column function
function moveColumn(direction: 'left' | 'right') {
  const currentOrder = [...table.getState().columnOrder]
  const currentIndex = currentOrder.indexOf(props.column.id)

  if (direction === 'left' && currentIndex > 0) {
    const newOrder = [...currentOrder]
    const [movedColumn] = newOrder.splice(currentIndex, 1)
    newOrder.splice(currentIndex - 1, 0, movedColumn as string)
    table.setColumnOrder(newOrder)
  }

  if (direction === 'right' && currentIndex < currentOrder.length - 1) {
    const newOrder = [...currentOrder]
    const [movedColumn] = newOrder.splice(currentIndex, 1)
    newOrder.splice(currentIndex + 1, 0, movedColumn as string)
    table.setColumnOrder(newOrder)
  }
}

function canMove(direction: 'left' | 'right'): boolean {
  const currentOrder = table.getState().columnOrder
  const currentIndex = currentOrder.indexOf(props.column.id)
  if (direction === 'left') {
    return currentIndex > 0
  } else {
    return currentIndex < currentOrder.length - 1
  }
}

// Sorting handler
function handleSortClick() {
  const isSorted = props.column.getIsSorted()
  if (isSorted === 'asc') {
    props.column.toggleSorting(true)
  } else if (isSorted === 'desc') {
    props.column.clearSorting()
  } else {
    props.column.toggleSorting(false)
  }
}

// Computed for visibility
const hasFilter = computed(() => !!slots.filter)

const showControls = computed(
  () =>
    gridProps.tableLayout?.columnsMovable ||
    (gridProps.tableLayout?.columnsVisibility && props.visibility) ||
    (gridProps.tableLayout?.columnsPinnable && props.column.getCanPin()) ||
    hasFilter.value,
)

const showSortButton = computed(
  () =>
    props.column.getCanSort() ||
    (gridProps.tableLayout?.columnsResizable && props.column.getCanResize()),
)
</script>

<template>
  <!-- Full Controls with Dropdown -->
  <div v-if="showControls" class="flex items-center h-full gap-1.5 justify-between">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          :class="
            cn(
              'text-secondary-foreground rounded-md font-normal -ms-2 px-2 h-7 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground',
            )
          "
          :disabled="isLoading || recordCount === 0"
        >
          <slot name="icon" />
          {{ title }}
          <template v-if="column.getCanSort()">
            <ArrowDown v-if="column.getIsSorted() === 'desc'" class="size-[0.7rem] mt-px" />
            <ArrowUp v-else-if="column.getIsSorted() === 'asc'" class="size-[0.7rem] mt-px" />
            <ChevronsUpDown v-else class="size-[0.7rem] mt-px" />
          </template>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-40" align="start">
        <!-- Filter Slot -->
        <DropdownMenuLabel v-if="hasFilter">
          <slot name="filter" />
        </DropdownMenuLabel>

        <DropdownMenuSeparator
          v-if="hasFilter && (column.getCanSort() || column.getCanPin() || visibility)"
        />

        <!-- Sorting -->
        <template v-if="column.getCanSort()">
          <DropdownMenuItem
            @click="
              column.getIsSorted() === 'asc' ? column.clearSorting() : column.toggleSorting(false)
            "
            :disabled="!column.getCanSort()"
          >
            <ArrowUp class="size-3.5" />
            <span class="grow">Asc</span>
            <Check v-if="column.getIsSorted() === 'asc'" class="size-4 opacity-100 text-primary" />
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="
              column.getIsSorted() === 'desc' ? column.clearSorting() : column.toggleSorting(true)
            "
            :disabled="!column.getCanSort()"
          >
            <ArrowDown class="size-3.5" />
            <span class="grow">Desc</span>
            <Check v-if="column.getIsSorted() === 'desc'" class="size-4 opacity-100 text-primary" />
          </DropdownMenuItem>
        </template>

        <DropdownMenuSeparator
          v-if="
            (hasFilter || column.getCanSort()) &&
            (column.getCanSort() || column.getCanPin() || visibility)
          "
        />

        <!-- Pinning -->
        <template v-if="gridProps.tableLayout?.columnsPinnable && column.getCanPin()">
          <DropdownMenuItem @click="column.pin(column.getIsPinned() === 'left' ? false : 'left')">
            <ArrowLeftToLine class="size-3.5" aria-hidden="true" />
            <span class="grow">Fijar a la izquierda</span>
            <Check v-if="column.getIsPinned() === 'left'" class="size-4 opacity-100 text-primary" />
          </DropdownMenuItem>
          <DropdownMenuItem @click="column.pin(column.getIsPinned() === 'right' ? false : 'right')">
            <ArrowRightToLine class="size-3.5" aria-hidden="true" />
            <span class="grow">Fijar a la derecha</span>
            <Check
              v-if="column.getIsPinned() === 'right'"
              class="size-4 opacity-100 text-primary"
            />
          </DropdownMenuItem>
        </template>

        <!-- Moving -->
        <template v-if="gridProps.tableLayout?.columnsMovable">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            @click="moveColumn('left')"
            :disabled="!canMove('left') || column.getIsPinned() !== false"
          >
            <ArrowLeft class="size-3.5" aria-hidden="true" />
            <span>Mover a la izquierda</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="moveColumn('right')"
            :disabled="!canMove('right') || column.getIsPinned() !== false"
          >
            <ArrowRight class="size-3.5" aria-hidden="true" />
            <span>Mover a la derecha</span>
          </DropdownMenuItem>
        </template>

        <!-- Visibility Sub-menu -->
        <template v-if="gridProps.tableLayout?.columnsVisibility && visibility">
          <DropdownMenuSeparator v-if="column.getCanSort() || column.getCanPin() || hasFilter" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings2 class="size-3.5" />
              <span>Columnas</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  v-for="col in table
                    .getAllColumns()
                    .filter((c) => typeof c.accessorFn !== 'undefined' && c.getCanHide())"
                  :key="col.id"
                  :model-value="col.getIsVisible()"
                  @update:model-value="(value) => col.toggleVisibility(!!value)"
                  @select="(e) => e.preventDefault()"
                  class="capitalize"
                >
                  {{ col.columnDef.meta?.headerTitle || col.id }}
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Unpin Button -->
    <Button
      v-if="gridProps.tableLayout?.columnsPinnable && column.getCanPin() && column.getIsPinned()"
      variant="ghost"
      class="-me-1 size-7 rounded-md"
      @click="column.pin(false)"
      :aria-label="`Unpin ${title} column`"
      :title="`Unpin ${title} column`"
    >
      <PinOff class="size-3.5 opacity-50" aria-hidden="true" />
    </Button>
  </div>

  <!-- Simple Sort Button -->
  <div v-else-if="showSortButton" class="flex items-center h-full">
    <Button
      variant="ghost"
      :class="
        cn(
          'text-secondary-foreground rounded-md font-normal -ms-2 px-2 h-7 hover:bg-secondary data-[state=open]:bg-secondary hover:text-foreground data-[state=open]:text-foreground',
        )
      "
      :disabled="isLoading || recordCount === 0"
      @click="handleSortClick"
    >
      <slot name="icon" />
      {{ title }}
      <template v-if="column.getCanSort()">
        <ArrowDown v-if="column.getIsSorted() === 'desc'" class="size-[0.7rem] mt-px" />
        <ArrowUp v-else-if="column.getIsSorted() === 'asc'" class="size-[0.7rem] mt-px" />
        <ChevronsUpDown v-else class="size-[0.7rem] mt-px" />
      </template>
    </Button>
  </div>

  <!-- Simple Label -->
  <div
    v-else
    :class="
      cn(
        'text-accent-foreground font-normal inline-flex h-full items-center gap-1.5 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5 [&_svg]:opacity-60',
      )
    "
  >
    <slot name="icon" />
    {{ title }}
  </div>
</template>
