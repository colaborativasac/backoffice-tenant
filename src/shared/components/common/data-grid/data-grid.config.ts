import { themeQuartz } from 'ag-grid-community'

export const AG_GRID_THEME = themeQuartz.withParams({
  headerRowBorder: {
    style: 'solid',
    width: '1px',
    color: 'var(--border)',
  },
  headerHeight: '2.5rem',

  selectedRowBackgroundColor: 'var(--color-green-50)',

  checkboxUncheckedBackgroundColor: 'var(--background)',
  checkboxUncheckedBorderColor: 'var(--color-border)',
  checkboxBorderRadius: '.375rem',
  checkboxCheckedBackgroundColor: 'var(--color-primary)',
  checkboxCheckedBorderColor: 'var(--color-border)',
  checkboxIndeterminateBackgroundColor: 'var(--color-muted-foreground)',

  // focusShadow: '0 0 0 1px var(--color-border)',

  spacing: 6,
})
