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
import {
  DataGridPagination,
  DataGridColumnSelector,
  DataGrid,
} from '@/shared/components/common/data-grid'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import type { GridApi, RowSelectionOptions } from 'ag-grid-community'
import { computed, ref } from 'vue'
import { columns } from '@/modules/events/components/tables/columns/events.columns'
import { useEventsQuery } from '../composables'

const gridApi = ref<GridApi | null>(null)

const { events } = useEventsQuery()

const paginationMeta = computed(() => {
  return {
    currentPage: 1,
    lastPage: 10,
    perPage: 10,
    total: 120,
    from: 1,
    to: 10,
  }
})

const rowSelection = ref<RowSelectionOptions | 'single' | 'multiple'>({
  mode: 'multiRow',
})
</script>
<template>
  <Container variant="fixed">
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
  <Container variant="fixed">
    <Card>
      <CardHeader>
        <CardHeading>
          <CardTitle>Eventos</CardTitle>
        </CardHeading>
        <CardAction>
          <DataGridColumnSelector :grid-api="gridApi" />
        </CardAction>
      </CardHeader>
      <CardTable>
        <DataGrid
          :row-data="events.data.value"
          :column-defs="columns"
          :tooltip-show-delay="0"
          :tooltip-interaction="true"
          tooltip-show-mode="whenTruncated"
          :height="'60vh'"
          :row-selection="rowSelection"
          @ready="(api) => (gridApi = api)"
        />
      </CardTable>
      <CardFooter>
        <DataGridPagination
          :meta="paginationMeta"
          :per-page-options="[10, 15, 20, 25, 50]"
          @page-change="
            (page) => {
              console.log('page change', page)
            }
          "
          @per-page-change="
            (page) => {
              console.log(page)
            }
          "
        />
      </CardFooter>
    </Card>
  </Container>
</template>
