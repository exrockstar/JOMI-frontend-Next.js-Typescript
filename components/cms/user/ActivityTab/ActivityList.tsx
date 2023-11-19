import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { useListInput } from 'components/hooks/useListInput'
import dayjs from 'dayjs'
import { useAccessesByUserIdQuery } from 'graphql/cms-queries/user-accesses.generated'
import { ActivityType } from 'graphql/types'
import React from 'react'
import TimeWatched from './TimeWatched'
import _ from 'lodash'

type Props = {
  userId: string
  userAnonID: string
}

const ActivityList = ({ userId, userAnonID }: Props) => {
  const state = useListInput({
    page: 1,
    sort_by: 'created',
    sort_order: -1,
    page_size: 10
  })
  const { data, loading, error } = useAccessesByUserIdQuery({
    variables: {
      input: {
        userID: userId,
        anon_link_id: userAnonID,
        limit: state.pageSize,
        skip: (state.page - 1) * state.pageSize,
        sort_by: state.sortBy,
        sort_order: state.sortOrder
      }
    }
  })

  const logs = data?.accessesByUserId?.events
  const count = data?.accessesByUserId?.count
  const LoadingOrError = (
    <Stack alignItems="center" justifyContent="center" height="90vh">
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
    </Stack>
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    state.setPage(newPage + 1)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    state.setPageSize(+event.target.value)
  }

  return (
    <>
      {!data ? (
        LoadingOrError
      ) : (
        <Card>
          <TableContainer sx={{ minWidth: 1050 }}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={count}
              page={state.page - 1}
              rowsPerPage={state.pageSize}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              showLastButton={true}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Created</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Access Type</TableCell>
                  <TableCell>Matched by</TableCell>
                  <TableCell>Institution</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Article Title</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>User Agent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs?.map((activity, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <TableCell sx={{ maxWidth: 150 }}>
                        {dayjs(activity.created).format(
                          'MM/DD/YYYY - HH:mm:ss'
                        )}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 150 }}>
                        {activity.activity}
                        {activity.activity === ActivityType.VideoBlock && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={0.5}
                            sx={{ display: 'block' }}
                          >
                            {activity.block_type}
                          </Typography>
                        )}
                        {activity.activity === ActivityType.VideoPlay && (
                          <TimeWatched time_watched={activity.time_watched} />
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {_.startCase(activity.accessType ?? 'Unknown')}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {_.startCase(activity.matchedBy ?? 'Unknown')}
                      </TableCell>

                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {activity.institution ? (
                          <Link
                            href={`/cms/institutions-list/${activity.institution?._id}`}
                          >
                            {activity.institution?.name}
                          </Link>
                        ) : (
                          'Unknown'
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {activity.orderId ? (
                          <Link href={`/cms/orders/${activity.orderId}`}>
                            {activity.orderId}
                          </Link>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {activity.article_title ?? 'N/A'}
                      </TableCell>
                      <TableCell>{activity.ip_address_str}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={activity.user_agent}
                      >
                        {activity.user_agent}
                      </TableCell>
                    </StyledTableRow>
                  )
                })}
                {!logs?.length && (
                  <StyledTableRow>
                    <TableCell colSpan={5}>No activity logs for user</TableCell>
                  </StyledTableRow>
                )}
                {loading && (
                  <StyledTableRow>
                    <TableCell colSpan={5}>
                      <Stack alignItems="center" my={4}>
                        <CircularProgress /> Loading
                      </Stack>
                    </TableCell>
                  </StyledTableRow>
                )}
                {error && (
                  <StyledTableRow>
                    <TableCell colSpan={5}>
                      <Alert severity="error">{error.message}</Alert>
                    </TableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>
  )
}

export default ActivityList
