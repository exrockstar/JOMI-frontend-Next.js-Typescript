import { FilterExpression } from 'graphql/types'
import React from 'react'
import { columnOptions } from './columns'
import { MenuItem, TextField, Select } from '@mui/material'

import { DatePicker } from '@mui/lab'
import { useAnnouncementFilters } from './useAnnouncementFilters'
type Props = {
  expression: FilterExpression
}
const FilterValue = ({ expression }: Props) => {
  const { updateExpression } = useAnnouncementFilters()
  const columnOption = columnOptions.find(
    (c) => expression.columnName === c.columnName
  )
  if (!columnOption) return null
  return (
    <div>
      {(columnOption.type === 'text' || columnOption.type === 'number') && (
        <TextField
          placeholder="Value"
          size="small"
          value={expression.value}
          type={columnOption.type}
          onChange={(e) => {
            const value =
              columnOption.type === 'number'
                ? parseFloat(e.target.value)
                : e.target.value
            console.log(value)
            updateExpression({
              ...expression,
              value: value
            })
          }}
        />
      )}
      {columnOption.type === 'date' && (
        <DatePicker
          label="Date"
          value={expression.value as any}
          onChange={(newValue) => {
            updateExpression({
              ...expression,
              value: newValue
            })
          }}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      )}
      {columnOption.type === 'select' && (
        <Select
          placeholder="Value"
          size="small"
          value={expression.value}
          onChange={(e) => {
            updateExpression({
              ...expression,
              value: e.target.value
            })
          }}
        >
          {columnOption.values?.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      )}
      {columnOption.type === 'boolean' && (
        <Select
          placeholder="Value"
          size="small"
          value={expression.value}
          onChange={(e) => {
            updateExpression({
              ...expression,
              value: e.target.value === 'true'
            })
          }}
        >
          <MenuItem value={'true'}>True</MenuItem>
          <MenuItem value={'false'}>False</MenuItem>
        </Select>
      )}
    </div>
  )
}

export default FilterValue
