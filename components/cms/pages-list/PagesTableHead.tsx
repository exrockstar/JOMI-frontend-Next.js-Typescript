import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import { Page } from 'graphql/types'
import { visuallyHidden } from '@mui/utils'
import { usePagesList } from './usePagesList'

interface HeadCell {
  id: keyof Page
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    label: 'Title'
  },
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'slug',
    label: 'Slug'
  },
  {
    id: 'author',
    label: 'Author'
  }
]

const PagesTableHead = () => {
  const { sortBy, sortOrder, setSort } = usePagesList()
  const createSortHandler = (property: HeadCell['id']) => {
    return () => setSort(property, -sortOrder)
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

export default PagesTableHead
