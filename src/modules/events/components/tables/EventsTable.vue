<script setup lang="ts">
import { DataGrid, DataGridPagination } from '@/shared/components/common/data-grid'
import { columns } from './columns/events.columns'
import { data } from '@/modules/events/config/data.config'
import type { RowSelectionOptions } from 'ag-grid-community'
import { ref } from 'vue'

const rowSelection = ref<RowSelectionOptions | 'single' | 'multiple'>({
  mode: 'multiRow',
})
</script>
<template>
  <div>
    <DataGrid
      :row-data="data"
      :column-defs="columns"
      :tooltip-show-delay="0"
      :tooltip-hide-delay="55000"
      :tooltip-interaction="true"
      tooltip-show-mode="whenTruncated"
      :height="'60vh'"
      :row-selection="rowSelection"
    />
    <DataGridPagination
      :meta="{
        currentPage: 4,
        perPage: 10,
        total: 120,
        from: 1,
        to: 10,
        lastPage: Math.ceil(120 / 10),
      }"
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
  </div>
</template>
