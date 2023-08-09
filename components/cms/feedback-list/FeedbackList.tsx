import {
  Card,
  TableContainer,
  Table,
  TableBody,
  Typography,
  Box,
  TableCell,
  Link
} from '@mui/material'

import { StickyTableCell } from 'components/common/StickyTableCell'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { useFeedbackList } from './FeedbackListProvider'
import FeedbackListPagination from './FeedbackListPagination'
import FeedbackListTableHead from './FeedbackListTableHead'
import NextLink from 'next/link'
const FeedbackList = () => {
  const { items } = useFeedbackList()

  const dateFormat = 'L'
  const NotApplicable = (
    <Typography color="text.secondary" variant="body2">
      N/A
    </Typography>
  )
  return (
    <div>
      <Card>
        <TableContainer sx={{ minWidth: 1050 }}>
          <FeedbackListPagination />
          <Table>
            <FeedbackListTableHead />
            <TableBody>
              {items?.map((item, index) => {
                const isEven = index % 2 === 0
                const maxRating = item.question?.choices?.at(-1)
                const hasInst = item._institution
                return (
                  <StyledTableRow key={item._id}>
                    <StickyTableCell
                      sx={{
                        p: 0,
                        maxWidth: 150,
                        backgroundColor: isEven ? '#fafafa' : 'white'
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRightColor: 'grey.100',
                          borderRightWidth: 2,
                          borderRightStyle: 'solid',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={item.user?.email}
                      >
                        {item.user ? item.user?.email : 'anonymous'}
                      </Box>
                    </StickyTableCell>
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {hasInst ? (
                        <Link
                          component={NextLink}
                          href={`/cms/institutions-list/${item._institution?._id}`}
                        >
                          {item._institution?.name}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 100, color: 'text.secondary' }}>
                      {dayjs(item.createdAt).format(dateFormat)}
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                        minWidth: 150,
                        maxWidth: 180,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={item.question?.question}
                    >
                      {item.question?.question ?? NotApplicable}
                    </TableCell>
                    <TableCell title={item.value}>{item.value ?? ''}</TableCell>
                    <TableCell>{maxRating?.value ?? ''}</TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                        minWidth: 150,
                        maxWidth: 300,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={item.comment}
                    >
                      {item.comment ?? ''}
                    </TableCell>
                    <TableCell title={item.user?.user_type}>
                      {item.user?.user_type ?? 'N/A'}
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
          <FeedbackListPagination />
        </TableContainer>
      </Card>
    </div>
  )
}
export default FeedbackList
