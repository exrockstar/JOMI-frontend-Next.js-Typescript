import { Add, Delete } from '@mui/icons-material'
import { DatePicker } from '@mui/lab'
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  IconButton
} from '@mui/material'
import dayjs from 'dayjs'
import { ColumnFilter, QueryOperation, StatusType } from 'graphql/types'
import React, { useState } from 'react'
import { ColumnOption } from './ColumnOption'

type Props = {
  columnOptions: ColumnOption[]
  filters: ColumnFilter[]
  onSubmit(filters: ColumnFilter[]): void
}

const FilterDrawer = ({ columnOptions, filters, onSubmit }: Props) => {
  const [filtersLocal, setFiltersLocal] = useState<ColumnFilter[]>([...filters])

  const handleOperationChange = (index: number, operation: string) => {
    const newFilter = filtersLocal.map((filter, i) => {
      if (i === index) {
        return {
          ...filter,
          operation: operation as QueryOperation
        }
      }
      return filter
    })
    setFiltersLocal(newFilter)
  }
  const handleColumnChange = (index: number, columnName: string) => {
    const newFilter = filtersLocal.map((filter, i) => {
      if (i === index) {
        const columnOption = columnOptions.find(
          (options) => columnName === options.columnName
        )
        const operations = columnOption.operations
        const operation = operations.includes(filter.operation)
          ? filter.operation
          : operations[0]

        return {
          ...filter,
          columnName,
          operation
        }
      }
      return filter
    })
    setFiltersLocal(newFilter)
  }

  const handleValueChange = (
    index: number,
    value: string | number | boolean
  ) => {
    const newFilter =
      filtersLocal.map((filter, i) => {
        if (i === index) {
          return {
            ...filter,
            value
          }
        }
        return filter
      }) ?? []

    setFiltersLocal(newFilter)
  }

  const removeFilter = (index: number) => {
    const newFilters = filtersLocal.filter((filter, i) => i !== index) ?? []
    setFiltersLocal([...newFilters])
  }

  console.log(filtersLocal)
  return (
    <Box
      width={{ xs: '80vw', md: 600 }}
      p={2}
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(filtersLocal)
      }}
    >
      <Typography variant="overline">Add/Remove Filters</Typography>
      <Divider sx={{ my: 2 }} />
      {filtersLocal.map((filter, index) => {
        const columnOption = columnOptions.find(
          (option) => filter.columnName === option.columnName
        )
        if (!columnOption) return
        return (
          <Stack
            key={filter.columnName + index}
            direction="row"
            spacing={2}
            my={2}
          >
            <Select
              value={filter.columnName}
              size="small"
              onChange={(e) => handleColumnChange(index, e.target.value)}
            >
              {columnOptions.map(({ columnName, label }) => (
                <MenuItem key={columnName} value={columnName}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={filter.operation}
              size="small"
              onChange={(event) =>
                handleOperationChange(index, event.target.value)
              }
            >
              {columnOption?.operations.map((operation) => {
                return (
                  <MenuItem value={operation} key={operation}>
                    {operation == 'greater_than_or_equal' ? '>=' 
                      : operation == 'less_than_or_equal' ? '<=' 
                      : operation }
                  </MenuItem>
                )
              })}
            </Select>
            {(columnOption.type === 'text' ||
              columnOption.type === 'number') && (
              <TextField
                placeholder="Value"
                size="small"
                value={filter.value}
                type={columnOption.type}
                onChange={(e) => {
                  const val =
                    columnOption.type === 'number'
                      ? parseFloat(e.target.value)
                      : e.target.value
                  handleValueChange(index, val)
                }}
              />
            )}
            {columnOption.type === 'date' && (
              <DatePicker
                label="Date"
                value={filter.value ?? dayjs()}
                onChange={(newValue) => {
                  handleValueChange(index, newValue)
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            )}
            {columnOption.type === 'select' && (
              <Select
                placeholder="Value"
                size="small"
                value={filter.value}
                onChange={(e) => handleValueChange(index, e.target.value)}
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
                value={filter.value}
                onChange={(e) =>
                  handleValueChange(index, e.target.value === 'true')
                }
              >
                <MenuItem value={'true'}>True</MenuItem>
                <MenuItem value={'false'}>False</MenuItem>
              </Select>
            )}
            <IconButton color="error" onClick={() => removeFilter(index)}>
              <Delete />
            </IconButton>
          </Stack>
        )
      })}
      <Stack py={2} mt={2} spacing={2}>
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() => {
            setFiltersLocal([
              ...filtersLocal,
              {
                value: '',
                columnName: columnOptions[0].columnName,
                operation: columnOptions[0].operations[0]
              }
            ])
          }}
        >
          {' '}
          Add Filter
        </Button>
        <Button variant="contained" fullWidth type="submit">
          GO
        </Button>
      </Stack>
    </Box>
  )
}

export default FilterDrawer
