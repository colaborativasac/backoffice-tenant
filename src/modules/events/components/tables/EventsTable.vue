<script setup lang="ts">
import { DataGrid, DataGridPagination } from '@/shared/components/common/data-grid'
import { columns } from './columns/events.columns'
import { data } from '@/modules/events/config/data.config'
</script>
<template>
  <div>
    <DataGrid
      :row-data="data"
      :column-defs="columns"
      :tooltip-show-delay="0"
      tooltip-show-mode="whenTruncated"
      :height="'60vh'"
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
