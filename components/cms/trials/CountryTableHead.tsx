import React from 'react'
import { TrialSettingCountry } from './TrialSettingCountry'
import useCountryList from './useCountryList'
import { visuallyHidden } from '@mui/utils'
import { TableHead, TableRow, TableCell, TableSortLabel, Box, Checkbox } from '@mui/material'

interface HeadCell {
  id: keyof TrialSettingCountry
  label: string
  width?: number
}

const headCells: HeadCell[] = [
  {
    id: 'label',
    label: 'Country',
    width: 200
  },
  {
    id: 'code',
    label: 'Country Code',
    width: 50
  },
  {
    id: 'enabled',
    label: 'Enabled',
    width: 50
  }
]
const CountryListTableHead = () => {
  const { sortBy, sortOrder, setSort, pagedcountries, selectedCodes, selectAllInCurrentPage } = useCountryList()
  const createSortHandler = (property: HeadCell['id']) => () => {
    setSort(property, -sortOrder)
  }
  const allCheckedInPage = !!selectedCodes.length && pagedcountries.every((c) => selectedCodes.includes(c.code))
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            checked={allCheckedInPage}
            onChange={(e) => {
              console.log(e.target.checked)
              selectAllInCurrentPage(!!e.target.checked)
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          return (
            <TableCell key={headCell.id} sortDirection={sortBy === headCell.id ? order : false}>
              <TableSortLabel
                active={sortBy === headCell.id}
                direction={sortBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {sortBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

export default CountryListTableHead
