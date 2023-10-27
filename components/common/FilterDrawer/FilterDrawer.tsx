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
import dayjs, { Dayjs } from 'dayjs'
import { ColumnFilter, QueryOperation, StatusType } from 'graphql/types'
import React, { useState } from 'react'
import { ColumnOption } from './ColumnOption'
import CustomDatePicker from '../CustomDatePicker'

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
        const resetValue = [
          QueryOperation.IsNull.toString(),
          QueryOperation.IsNullOrEmpty.toString(),
          QueryOperation.IsNotNull.toString(),
          QueryOperation.IsNotNullOrEmpty.toString()
        ].includes(operation)

        return {
          ...filter,
          operation: operation as QueryOperation,
          value: resetValue ? '' : filter.value
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
        const columnNames = columnOptions.map((o) => o.columnName)
        const toSubmit = filtersLocal.filter((f) =>
          columnNames.includes(f.columnName)
        )
        onSubmit(toSubmit)
      }}
    >
      <Typography variant="overline">Add/Remove Filters</Typography>
      <Divider sx={{ my: 2 }} />
      {filtersLocal.map((filter, index) => {
        const columnOption = columnOptions.find(
          (option) => filter.columnName === option.columnName
        )
        if (!columnOption) return
        const hideInput = [
          QueryOperation.IsNull,
          QueryOperation.IsNullOrEmpty,
          QueryOperation.IsNotNull,
          QueryOperation.IsNotNullOrEmpty
        ].includes(filter.operation)
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
              {columnOptions.map(({ columnName, label, type }) => {
                if (type === 'divider') {
                  return <Divider sx={{ fontSize: 12, my: 2 }}>{label}</Divider>
                }
                return (
                  <MenuItem key={columnName} value={columnName}>
                    {label}
                  </MenuItem>
                )
              })}
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
                    {operation == 'greater_than_or_equal'
                      ? '>='
                      : operation == 'less_than_or_equal'
                      ? '<='
                      : operation}
                  </MenuItem>
                )
              })}
            </Select>
            {!hideInput ? (
              <>
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
                  <CustomDatePicker
                    defaultLabel="Date filter"
                    value={filter.value}
                    onChange={(val?: Dayjs) => {
                      handleValueChange(index, val.format('MM-DD-YYYY'))
                    }}
                  />
                )}
                {columnOption.type === 'select' && (
                  <Select
                    placeholder="Value"
                    size="small"
                    value={filter.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  >
                    {columnOption.values?.map((value, i) => (
                      <MenuItem key={value} value={value}>
                        {columnOption.labels?.at(i) ?? value}
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
              </>
            ) : null}
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
