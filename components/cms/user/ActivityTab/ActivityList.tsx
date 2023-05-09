import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { useAccessesByUserIdQuery } from 'graphql/cms-queries/user-accesses.generated'
import { ActivityType } from 'graphql/types'
import React from 'react'

type Props = {
  userId: string
  userAnonID: string
}

const ActivityList = ({ userId, userAnonID }: Props) => {
  const { data, loading, error } = useAccessesByUserIdQuery({
    variables: {
      input: {
        userID: userId,
        anon_link_id: userAnonID
      }
    }
  })

  const logs = data?.accessesByUserId
  const LoadingOrError = (
    <Stack alignItems="center" justifyContent="center" height="90vh">
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
    </Stack>
  )
  return (
    <>
      {!data ? (
        LoadingOrError
      ) : (
        <Card>
          <TableContainer sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No. </TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Article Title</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>User Agent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs?.map((activity, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <TableCell>{index}</TableCell>
                      <TableCell>
                        {dayjs(activity.created).format(
                          'MM/DD/YYYY - HH:mm:ss A'
                        )}
                      </TableCell>
                      <TableCell sx={{ display: 'flex' }}>
                        {activity.activity}
                        {activity.activity === ActivityType.VideoPlay && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={0.5}
                          >
                            {activity.time_watched > 0
                              ? `(${activity.time_watched}s)`
                              : ''}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 480, whiteSpace: 'pre-wrap' }}>
                        {activity.article_title ?? 'N/A'}
                      </TableCell>
                      <TableCell>{activity.ip_address_str}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          title={activity.user_agent}
                          maxWidth="300px"
                          whiteSpace="nowrap"
                        >
                          {activity.user_agent}
                        </Typography>
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
