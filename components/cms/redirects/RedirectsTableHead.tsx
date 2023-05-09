import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material"
import { Redirect } from "graphql/types"
import { useRedirectsList } from "./useRedirectsList"
import { visuallyHidden } from '@mui/utils'

interface HeadCell {
    id:
      | keyof Redirect
    label: string
}

const headCells: readonly HeadCell[] = [
    {
        id:'name',
        label:'About'
    },
    {
        id: 'from',
        label: 'From'
    },
    {
        id:'to',
        label: 'To'
    },
    {
        id: 'stats',
        label: 'Clicks'
    },
    {
        id: 'author',
        label: 'Author'
    },
    {
        id: 'type',
        label: 'Type'
    }
]

const RedirectsTableHead = () => {
    const { sortBy, sortOrder, setSortBy, setSortOrder } = useRedirectsList();
    const createSortHandler =
        (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
        setSortBy(property)
        setSortOrder(-sortOrder)
    }
    return (
        <TableHead >
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

export default RedirectsTableHead;