import { QueryOperation } from 'graphql/types'

export type ColumnOption = {
  columnName: string
  type: 'date' | 'select' | 'text' | 'autocomplete' | 'boolean' | 'number'
  label: string
  operations: QueryOperation[]
  values?: string[]
}
