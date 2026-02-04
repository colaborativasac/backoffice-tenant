<script setup lang="ts" generic="TData extends object">
import { computed, type CSSProperties } from 'vue'
import { FlexRender, type Column, type Header, type Row, type Cell } from '@tanstack/vue-table'
import { useDataGrid } from '.'
import { cn } from '@/lib/utils'

// Spacing variants using computed classes
const headerCellSpacingClasses = {
  dense: 'px-2.5 h-8',
  default: 'px-4',
}

const bodyCellSpacingClasses = {
  dense: 'px-2.5 py-2',
  default: 'px-4 py-3',
}

// Utility function for pinning styles
function getPinningStyles<T>(column: Column<T>): CSSProperties {
  const isPinned = column.getIsPinned()

  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: `${column.getSize()}px`,
    zIndex: isPinned ? 1 : 0,
  }
}

const { table, isLoading, props: tableProps } = useDataGrid<TData>()

const pagination = computed(() => table.getState().pagination)

const headerCellSpacing = computed(() =>
  tableProps.tableLayout?.dense ? headerCellSpacingClasses.dense : headerCellSpacingClasses.default,
)

const bodyCellSpacing = computed(() =>
  tableProps.tableLayout?.dense ? bodyCellSpacingClasses.dense : bodyCellSpacingClasses.default,
)

// Computed para contenido expandido (optimización)
const expandedColumn = computed(() =>
  table.getAllColumns().find((col) => col.columnDef.meta?.expandedContent),
)

// Helper functions for cell classes
function getHeaderCellClasses(header: Header<TData, unknown>) {
  const { column } = header

  return cn(
    'relative h-10 text-left rtl:text-right align-middle font-normal text-accent-foreground [&:has([role=checkbox])]:pe-0',
    headerCellSpacing.value,
    tableProps.tableLayout?.cellBorder && 'border-e',
    tableProps.tableLayout?.columnsResizable && column.getCanResize() && 'truncate',
    tableProps.tableLayout?.columnsPinnable &&
      column.getCanPin() &&
      '[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-s! [&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 data-pinned:backdrop-blur-sm',
    header.column.columnDef.meta?.headerClassName,
    column.getIndex() === 0 || column.getIndex() === header.headerGroup.headers.length - 1
      ? tableProps.tableClassNames?.edgeCell
      : '',
  )
}

function getHeaderCellStyle(header: Header<TData, unknown>): CSSProperties {
  const { column } = header
  return {
    ...(tableProps.tableLayout?.width === 'fixed' && {
      width: `${header.getSize()}px`,
    }),
    ...(tableProps.tableLayout?.columnsPinnable && column.getCanPin() && getPinningStyles(column)),
  }
}

function getHeaderCellDataAttributes(header: Header<TData, unknown>) {
  const { column } = header
  const isPinned = column.getIsPinned()
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    'data-pinned': isPinned || undefined,
    'data-last-col': isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined,
  }
}

function getBodyCellClasses(cell: Cell<TData, unknown>) {
  const { column, row } = cell
  return cn(
    'align-middle',
    bodyCellSpacing.value,
    tableProps.tableLayout?.cellBorder && 'border-e',
    tableProps.tableLayout?.columnsResizable && column.getCanResize() && 'truncate',
    cell.column.columnDef.meta?.cellClassName,
    tableProps.tableLayout?.columnsPinnable &&
      column.getCanPin() &&
      '[&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s! [&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-sm',
    column.getIndex() === 0 || column.getIndex() === row.getVisibleCells().length - 1
      ? tableProps.tableClassNames?.edgeCell
      : '',
  )
}

function getBodyCellStyle(cell: Cell<TData, unknown>): CSSProperties {
  const { column } = cell
  return {
    ...(tableProps.tableLayout?.columnsPinnable && column.getCanPin() && getPinningStyles(column)),
  }
}

function getBodyCellDataAttributes(cell: Cell<TData, unknown>) {
  const { column } = cell
  const isPinned = column.getIsPinned()
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    'data-pinned': isPinned || undefined,
    'data-last-col': isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined,
  }
}

// Row click handler
function handleRowClick(row: Row<TData>) {
  if (tableProps.onRowClick) {
    tableProps.onRowClick(row.original)
  }
}

// Resize handler
function handleResize(header: Header<TData, unknown>, e: MouseEvent | TouchEvent) {
  const resizeHandler = header.getResizeHandler()
  if (resizeHandler) {
    resizeHandler(e)
  }
}

function handleResetSize(column: Column<TData>) {
  column.resetSize()
}
</script>

<template>
  <table
    data-slot="data-grid-table"
    :class="
      cn(
        'w-full align-middle caption-bottom text-left rtl:text-right text-foreground font-normal text-sm',
        !tableProps.tableLayout?.columnsDraggable && 'border-separate border-spacing-0',
        tableProps.tableLayout?.width === 'fixed' ? 'table-fixed' : 'table-auto',
        tableProps.tableClassNames?.base,
      )
    "
  >
    <!-- Table Header -->
    <thead
      :class="
        cn(
          '[&_tr:last-child]:border-0',
          tableProps.tableClassNames?.header,
          tableProps.tableLayout?.headerSticky && tableProps.tableClassNames?.headerSticky,
        )
      "
    >
      <tr
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
        :class="
          cn(
            'bg-muted/40',
            tableProps.tableLayout?.headerBorder && '[&>th]:border-b',
            tableProps.tableLayout?.cellBorder && '*:last:border-e-0',
            tableProps.tableLayout?.stripped && 'bg-transparent',
            tableProps.tableLayout?.headerBackground === false && 'bg-transparent',
            tableProps.tableClassNames?.headerRow,
          )
        "
      >
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :class="getHeaderCellClasses(header)"
          :style="getHeaderCellStyle(header)"
          v-bind="getHeaderCellDataAttributes(header)"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
          <!-- Resize Handle -->
          <div
            v-if="tableProps.tableLayout?.columnsResizable && header.column.getCanResize()"
            class="absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -end-3 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px"
            @dblclick="handleResetSize(header.column)"
            @mousedown="(e) => handleResize(header, e)"
            @touchstart="(e) => handleResize(header, e)"
          />
        </th>
      </tr>
    </thead>

    <!-- Row Spacer -->
    <tbody
      v-if="tableProps.tableLayout?.stripped || !tableProps.tableLayout?.rowBorder"
      aria-hidden="true"
      class="h-2"
    />

    <!-- Table Body -->
    <tbody
      :class="
        cn(
          '[&_tr:last-child]:border-0',
          tableProps.tableLayout?.rowRounded &&
            '[&_td:first-child]:rounded-s-lg [&_td:last-child]:rounded-e-lg',
          tableProps.tableClassNames?.body,
        )
      "
    >
      <!-- Skeleton Loading -->
      <template v-if="tableProps.loadingMode === 'skeleton' && isLoading && pagination?.pageSize">
        <tr
          v-for="(_, rowIndex) in Array.from({ length: pagination.pageSize })"
          :key="`skeleton-${rowIndex}`"
          :class="
            cn(
              'hover:bg-muted/40 data-[state=selected]:bg-muted/50',
              tableProps.onRowClick && 'cursor-pointer',
              !tableProps.tableLayout?.stripped &&
                tableProps.tableLayout?.rowBorder &&
                'border-b border-border [&:not(:last-child)>td]:border-b',
              tableProps.tableLayout?.cellBorder && '*:last:border-e-0',
              tableProps.tableLayout?.stripped &&
                'odd:bg-muted/90 hover:bg-transparent odd:hover:bg-muted',
              table.options.enableRowSelection && '*:first:relative',
              tableProps.tableClassNames?.bodyRow,
            )
          "
        >
          <td
            v-for="(column, colIndex) in table.getVisibleFlatColumns()"
            :key="`skeleton-cell-${colIndex}`"
            :class="
              cn(
                'align-middle',
                bodyCellSpacing,
                tableProps.tableLayout?.cellBorder && 'border-e',
                tableProps.tableLayout?.columnsResizable && column.getCanResize() && 'truncate',
                column.columnDef.meta?.cellClassName,
              )
            "
          >
            <component
              v-if="column.columnDef.meta?.skeleton"
              :is="column.columnDef.meta.skeleton"
            />
          </td>
        </tr>
      </template>

      <!-- Data Rows -->
      <template v-else-if="table.getRowModel().rows?.length">
        <template v-for="row in table.getRowModel().rows" :key="row.id">
          <tr
            :data-state="row.getIsSelected() ? 'selected' : undefined"
            :class="
              cn(
                'hover:bg-muted/40 data-[state=selected]:bg-muted/50',
                tableProps.onRowClick && 'cursor-pointer',
                !tableProps.tableLayout?.stripped &&
                  tableProps.tableLayout?.rowBorder &&
                  'border-b border-border [&:not(:last-child)>td]:border-b',
                tableProps.tableLayout?.cellBorder && '*:last:border-e-0',
                tableProps.tableLayout?.stripped &&
                  'odd:bg-muted/90 hover:bg-transparent odd:hover:bg-muted',
                table.options.enableRowSelection && '*:first:relative',
                tableProps.tableClassNames?.bodyRow,
              )
            "
            @click="handleRowClick(row)"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :class="cn('tabular-nums', getBodyCellClasses(cell))"
              :style="getBodyCellStyle(cell)"
              v-bind="getBodyCellDataAttributes(cell)"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
          <!-- Expanded Row -->
          <tr
            v-if="row.getIsExpanded() && expandedColumn?.columnDef.meta?.expandedContent"
            :class="cn(tableProps.tableLayout?.rowBorder && '[&:not(:last-child)>td]:border-b')"
          >
            <td :colspan="row.getVisibleCells().length">
              <component :is="expandedColumn.columnDef.meta.expandedContent(row.original)" />
            </td>
            <!-- <td :colspan="row.getVisibleCells().length">
              <component
                v-if="
                  table.getAllColumns().find((col) => col.columnDef.meta?.expandedContent)
                    ?.columnDef.meta?.expandedContent
                "
                :is="
                  table
                    .getAllColumns()
                    .find((col) => col.columnDef.meta?.expandedContent)
                    ?.columnDef.meta?.expandedContent?.(row.original)
                "
              />
            </td> -->
          </tr>
        </template>
      </template>

      <!-- Empty State -->
      <tr v-else>
        <td :colspan="table.getAllColumns().length" class="text-center text-muted-foreground py-6">
          {{ tableProps.emptyMessage || 'No hay datos disponibles' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
