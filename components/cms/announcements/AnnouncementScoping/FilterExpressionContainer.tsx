import { Add, Delete } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { Operators } from 'graphql/types'
import React, { useState } from 'react'
import { FilterExpression } from 'graphql/types'
import { useAnnouncementFilters } from './useAnnouncementFilters'
import { nanoid } from 'nanoid'
import { columnOptions } from './columns'
import FilterValue from './FilterValue'
const operators = Object.entries(Operators)
const booleanOperators = operators.filter((entry) => {
  const [key, value] = entry
  return [Operators.And, Operators.Or].includes(value)
})
const comparisonOperators = operators.filter((entry) => {
  const [key, value] = entry
  return ![Operators.And, Operators.Or].includes(value)
})

type Props = {
  expression: FilterExpression
}
const FilterExpressionContainer = ({ expression }: Props) => {
  const { addChild, deleteExpression, updateExpression, filters } =
    useAnnouncementFilters()
  // TODO: Implement column names, enable disable buttons
  // TODO: Implement update/save
  const isBooleanOperator = [Operators.And, Operators.Or].includes(
    expression.operator
  )
  return (
    <Box display="flex" gap={2} sx={{ pl: expression.level * 2, my: 1 }}>
      <FormControl>
        <InputLabel id="operator-select-label">Operator</InputLabel>
        <Select
          size="small"
          label="Operator"
          labelId="operator-select-label"
          sx={{ minWidth: 100 }}
          value={expression.operator}
          onChange={(e) =>
            updateExpression({
              ...expression,
              operator: e.target.value as Operators
            })
          }
        >
          <Divider sx={{ fontSize: 12, my: 2 }}>Boolean Operators</Divider>
          {booleanOperators.map((entry) => {
            const [key, value] = entry
            return (
              <MenuItem value={value} key={key}>
                {value}
              </MenuItem>
            )
          })}
          <Divider sx={{ fontSize: 12, my: 2 }}>Comparison Operators</Divider>
          {comparisonOperators.map((entry) => {
            const [key, value] = entry
            return (
              <MenuItem value={value} key={key}>
                {value}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {!isBooleanOperator && (
        <Box display="flex" gap={2}>
          <FormControl>
            <InputLabel id="column-select-label">Column</InputLabel>
            <Select
              size="small"
              label="Column"
              labelId="column-select-label"
              value={expression.columnName}
              onChange={(e) => {
                updateExpression({
                  ...expression,
                  columnName: e.target.value
                })
              }}
            >
              {columnOptions.map((col, i) => {
                return (
                  <MenuItem value={col.columnName} key={i}>
                    {col.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FilterValue expression={expression} />
        </Box>
      )}
      {isBooleanOperator && (
        <Button
          startIcon={<Add />}
          onClick={() => {
            addChild({
              id: filters.length + 1 + '',
              parentId: expression.id,
              level: expression.level + 1,
              operator: Operators.Contains,
              columnName: 'user.user_type',
              value: ''
            })
          }}
        >
          Add Child
        </Button>
      )}
      <Button
        startIcon={<Delete />}
        onClick={() => {
          deleteExpression(expression)
        }}
        color="error"
      >
        Delete
      </Button>
    </Box>
  )
}

export default FilterExpressionContainer
