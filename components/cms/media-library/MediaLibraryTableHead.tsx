import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import React from 'react'
import { useMediaLibraryList } from './useMediaLibraryList'
import { visuallyHidden } from '@mui/utils'

interface HeadCell {
  id: string,
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'image',
    label: 'Image'
  },
  {
    id: 'filename',
    label: 'File Name'
  },
  {
    id: 'metadata.title',
    label: 'Title'
  },
  {
    id: 'metadata.description',
    label: 'Description'
  },
  {
    id: 'uploadDate',
    label: 'Upload Date'
  }
]

const MediaLibraryTableHead = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useMediaLibraryList()
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      if (property != 'image') {
        setSortBy(property)
        setSortOrder(-sortOrder)
      }
    }
  return (
    <TableHead>
      <TableRow>
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
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default MediaLibraryTableHead
