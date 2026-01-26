import { themeQuartz } from 'ag-grid-community'

export const AG_GRID_THEME = themeQuartz.withParams({
  headerRowBorder: {
    style: 'solid',
    width: '1px',
    color: 'var(--border)',
  },
  headerHeight: 40,
  accentColor: 'var(--primary)',

  selectedRowBackgroundColor: 'var(--color-green-50)',

  checkboxUncheckedBackgroundColor: 'var(--transparent)',
  checkboxUncheckedBorderColor: 'var(--input)',
  checkboxBorderRadius: '0.25rem',
  checkboxCheckedBackgroundColor: 'var(--primary)',
  checkboxCheckedBorderColor: 'var(--primary)',
  checkboxIndeterminateBackgroundColor: 'var(--border)',

  focusShadow: '0 0 0 3px oklch(from var(--ring) l c h / 0.5)',

  spacing: 8,

  // cell
  columnBorder: {
    style: 'solid',
    color: 'var(--color-border)',
  },

  // input
  inputInvalidBackgroundColor: 'oklch(from var(--color-input) l c h / 0.3)',
  inputInvalidBorder: 'var(--color-destructive)',
  inputInvalidTextColor: 'var(--color-destructive)',

  // drag and drop
  dragAndDropImageBackgroundColor: 'var(--background)',
})

export const DEFAULT_COL_DEF = {
  sortable: false,
  filter: false,
  resizable: true,
  flex: 1,
  minWidth: 100,
} as const

export const DEFAULT_GRID_OPTIONS = {
  animateRows: true,
  suppressCellFocus: true,
  suppressRowClickSelection: true,
} as const
