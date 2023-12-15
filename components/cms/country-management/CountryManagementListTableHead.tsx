import React from 'react'

import { visuallyHidden } from '@mui/utils'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  Checkbox
} from '@mui/material'
import { Country } from 'graphql/types'
import useCountryManagementList from './useCountryManagementList'

interface HeadCell {
  id: keyof Country
  label: string
  width?: number
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Country',
    width: 200
  },
  {
    id: 'code',
    label: 'Country Code',
    width: 50
  },
  {
    id: 'trialsEnabled',
    label: 'Trials Enabled',
    width: 50
  },
  {
    id: 'articleRestriction',
    label: 'Article Restriction',
    width: 100
  },
  {
    id: 'coefficient',
    label: 'Percentage from Default Price',

    width: 100
  },
  {
    id: 'multiplier',
    label: 'Multiplier',
    width: 100
  }
]
const CountryManagementListTableHead = () => {
  const {
    sortBy,
    sortOrder,
    setSort,
    selected,
    countries,
    selectAllInCurrentPage
  } = useCountryManagementList()
  const createSortHandler = (property: HeadCell['id']) => () => {
    setSort(property, -sortOrder)
  }

  const areAllSelected = countries.every((c) => selected.includes(c.code))
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={areAllSelected}
            onChange={(e) => {
              selectAllInCurrentPage(!areAllSelected)
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          return (
            <TableCell
              key={headCell.id}
              sortDirection={sortBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={sortBy === headCell.id}
                direction={sortBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {sortBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default CountryManagementListTableHead
