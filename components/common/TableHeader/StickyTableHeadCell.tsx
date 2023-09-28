import { Box, TableCell, TableSortLabel } from '@mui/material'
import React from 'react'
import { visuallyHidden } from '@mui/utils'
import { StickyTableCell } from '../StickyTableCell'
type Props = {
  id: string
  label: string
  title?: string // description,
  sticky?: boolean
  minWidth?: number
  sortBy: string
  sortOrder: number
  onClick(event: React.MouseEvent<unknown>): void
}
const StickyTableHeadCell = (headCell: Props) => {
  const { sortBy, sortOrder } = headCell
  const order = sortOrder >= 1 ? 'asc' : 'desc'
  return (
    <StickyTableCell backgroundColor={'#efefef'}>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          minWidth: headCell.minWidth,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
        title={headCell.label}
        key={headCell.id}
        sortDirection={sortBy === headCell.id ? order : false}
        align="left"
        component="div"
      >
        <TableSortLabel
          active={sortBy === headCell.id}
          direction={sortBy === headCell.id ? order : 'asc'}
          onClick={headCell.onClick}
        >
          {headCell.label}
          {sortBy === headCell.id ? (
            <Box component="span" sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>
    </StickyTableCell>
  )
}

export default StickyTableHeadCell
