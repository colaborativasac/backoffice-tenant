<script setup lang="ts">
import { Container } from '@/shared/components/common/container'
import {
  Toolbar,
  ToolbarHeading,
  ToolbarActions,
  ToolbarTitle,
  ToolbarDescription,
} from '@/shared/components/common/toolbar'
import {
  Card,
  CardTitle,
  CardHeader,
  CardHeading,
  CardTable,
  CardFooter,
  CardAction,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import {
  DataGrid,
  DataGridTable,
  DataGridColumnHeader,
  DataGridContainer,
} from '@/shared/components/common/data-grid'
import { computed, h, ref } from 'vue'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import { mockEventsData } from '../mock'
import { valueUpdater } from '@/lib/utils'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

// import { useEventsQuery } from '../composables'

// const { events } = useEventsQuery()
const data = ref(mockEventsData)

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) =>
      h(DataGridColumnHeader, {
        column,
        title: 'Título',
      }),
    enableSorting: true,
    meta: {
      cellClassName: '',
    },
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
  },
  {
    accessorKey: 'amount',
    header: 'Monto',
  },
  {
    accessorKey: 'publish',
    header: 'Publicado',
  },
  {
    accessorKey: 'slider',
    header: 'En Slider',
  },
  {
    accessorKey: 'statusLabel',
    header: 'Estado',
  },
  {
    accessorKey: 'executive',
    header: 'Ejecutivo',
  },
]

const isLoading = ref(false)
const recordCount = computed(() => data.value.length)

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value
    },
  },
  enableRowSelection: false,
  columnResizeMode: 'onChange',
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
})
</script>
<template>
  <Container>
    <Toolbar>
      <ToolbarHeading>
        <ToolbarTitle />
        <ToolbarDescription>Manage your events efficiently</ToolbarDescription>
      </ToolbarHeading>
      <ToolbarActions>
        <Button>
          <Plus />
          Crear Evento
        </Button>
      </ToolbarActions>
    </Toolbar>
  </Container>
  <Container>
    <DataGrid
      :table="table"
      :record-count="recordCount"
      :is-loading="isLoading"
      loading-mode="skeleton"
      :table-layout="{
        rowBorder: true,
        cellBorder: true,
        headerBackground: true,
        headerBorder: true,
        columnsResizable: true,
        columnsPinnable: true,
      }"
    >
      <Card>
        <CardHeader>
          <CardHeading>
            <CardTitle>Autorizaciones</CardTitle>
          </CardHeading>
          <CardAction></CardAction>
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridContainer :rounded="false" :border="false">
              <DataGridTable />
            </DataGridContainer>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter> </CardFooter>
      </Card>
    </DataGrid>
  </Container>
</template>
