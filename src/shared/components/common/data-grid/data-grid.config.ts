import type { InjectionKey } from 'vue'
import type { DataGridContext } from './data-grid.models'

// Injection key
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DATA_GRID_KEY = Symbol('data-grid') as InjectionKey<DataGridContext<any>>
