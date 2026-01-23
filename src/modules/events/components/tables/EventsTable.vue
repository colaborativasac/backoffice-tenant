<script setup lang="ts">
import { DataGrid } from '@/shared/components/common/data-grid'
import { columns } from './columns/events.columns'
import { data } from '@/modules/events/config/data.config'
</script>
<template>
  <DataGrid
    :row-data="data"
    :column-defs="columns"
    :tooltip-show-delay="0"
    tooltip-show-mode="whenTruncated"
  />
</template>
