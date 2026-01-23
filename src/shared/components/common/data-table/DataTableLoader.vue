<script setup lang="ts">
import { useDataTable } from '.'

const { props: tableProps } = useDataTable()
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div
      class="text-muted-foreground bg-card flex items-center gap-2 px-4 py-2 font-medium leading-none text-sm border shadow-sm rounded-md"
    >
      <svg
        class="animate-spin -ml-1 h-5 w-5 text-muted-foreground"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {{ tableProps.loadingMessage || 'Cargando...' }}
    </div>
  </div>
</template>
