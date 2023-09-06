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
                const maxRating = Math.max(
                  ...(item.question?.choices?.map((x) => x.value) ?? [])
                )
                const hasInst = item._institution
                return (
                  <StyledTableRow key={item._id}>
                    <StickyTableCell
                      sx={{
                        p: 0,
                        maxWidth: 200,
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
                        {item.user ? (
                          <Link
                            component={NextLink}
                            href={`/cms/user/${item.user._id}`}
                          >
                            {item.user.email}
                          </Link>
                        ) : (
                          'anonymous'
                        )}
                      </Box>
                    </StickyTableCell>
                    <TableCell>{item.anon_link_id}</TableCell>
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
                    <TableCell>{maxRating ?? ''}</TableCell>
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
