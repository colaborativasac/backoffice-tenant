import type { InjectionKey } from 'vue'
import type { DataTableContext } from './data-table.models'

// Injection key
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DATA_TABLE_KEY = Symbol('data-table') as InjectionKey<DataTableContext<any>>
