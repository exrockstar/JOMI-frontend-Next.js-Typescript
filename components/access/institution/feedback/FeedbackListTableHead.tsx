import { Feedback, Institution, Order, User } from 'graphql/types'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { useInstitutionFeedbackList } from './useInstitutionFeedbackList'

interface HeadCell {
  id:
    | keyof Feedback
    | `user.${keyof User}`
    | `question.question`
    | `question.maxRating`
  sticky?: boolean
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'user.email',
    label: 'User Email',
    sticky: true
  },
  {
    id: 'createdAt',
    label: 'Date'
  },
  // {
  //   id: 'updatedAt',
  //   label: 'Updated Date'
  // },
  {
    id: 'question.question',
    label: 'Question'
  },
  {
    id: 'value',
    label: 'Rating'
  },
  {
    id: 'question.maxRating',
    label: 'Max Rating'
  },
  {
    id: 'comment',
    label: 'Comment'
  },

  {
    id: 'user.user_type',
    label: 'User Type'
  }
]

const FeedbackListTableHead = () => {
  const { sortBy, sortOrder, setSort } = useInstitutionFeedbackList()
  const createSortHandler =
    (property: HeadCell['id']) => (event: React.MouseEvent<unknown>) => {
      setSort(property, -sortOrder)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const order = sortOrder >= 1 ? 'asc' : 'desc'
          const content = (
            <TableCell
              sortDirection={sortBy === headCell.id ? order : false}
              component={headCell.sticky ? 'div' : 'th'}
              key={headCell.id}
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

          return headCell.sticky ? (
            <StickyTableCell
              key={headCell.id}
              component="th"
              sx={{ p: 0, maxWidth: 150 }}
              backgroundColor={'#efefef'}
            >
              {content}
            </StickyTableCell>
          ) : (
            content
          )
        })}
      </TableRow>
    </TableHead>
  )
}
export default FeedbackListTableHead
