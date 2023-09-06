import {
  ChevronRight,
  ExpandMore,
  Info,
  InfoOutlined
} from '@mui/icons-material'
import {
  Card,
  Stack,
  Typography,
  Button,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  Box,
  Pagination,
  Collapse,
  TableRow,
  TableHead,
  IconButton,
  Tooltip,
  TablePagination,
  Alert,
  CircularProgress,
  TableFooter
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { useRequestsByUserQuery } from 'graphql/cms-queries/triage-queue-list.generated'
import { QueryOperation, TriageQueueInput } from 'graphql/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import RequestDetailsModal from './RequestDetailsModal'
import RequestsTableHead from './RequestsTableHead'
import { data } from 'cheerio/lib/api/attributes'

type Props = {
  institutionID: string
}
const RequestsTable = ({ institutionID }: Props) => {
  const router = useRouter()
  const [detailsId, setDetailsId] = useState('')

  const sort_by = (router.query.sort_by as string) ?? 'last_request_date'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const start = router.query.start
  const end = router.query.end
  const page = parseInt((router.query.page as string) ?? '1')
  const perPage = parseInt((router.query.page_size as string) ?? '10')
  const skip = (page - 1) * perPage
  const input: TriageQueueInput = {
    sort_by,
    sort_order,
    skip,
    limit: perPage,
    startDate: start,
    endDate: end
  }

  const { data, loading, error } = useRequestsByUserQuery({
    variables: {
      input,
      instId: institutionID
    }
  })
  const output = data?.triageQueueRequestsByInstitution
  const requests = output?.triage_requests
  const filterCount = output?.count ?? 0
  const totalRequestsCount = output?.totalRequestCount ?? 0
  const handleChangePage = (event: unknown, newPage: number) => {
    router.push({
      query: {
        ...router.query,
        page: newPage + 1
      }
    })
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    router.push({
      query: {
        ...router.query,
        page_size: +event.target.value,
        page: 1
      }
    })
  }
  // const TableFoot = (

  // )
  return (
    <>
      <Card>
        <Box p={2} pr={1}>
          <Typography variant="h4">Requests by User</Typography>
          <Typography color="text.secondary" variant="caption">
            Showing {totalRequestsCount} requests from {filterCount} users.
          </Typography>
        </Box>
        <Divider />
        <Card>
          {error && (
            <Alert severity="error" sx={{ m: 2 }}>
              {error.message}
            </Alert>
          )}
          {loading && (
            <Stack py={10} alignItems="center">
              <CircularProgress />
              <Typography>Loading</Typography>
            </Stack>
          )}
          {!error && !loading && (
            <TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filterCount}
                page={page - 1}
                rowsPerPage={perPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
              />
              <Table>
                <RequestsTableHead />
                <TableBody sx={{ borderRadius: 2 }}>
                  {requests?.map((request, index) => {
                    const email = request.email
                    const display_name = request.display_name
                    const authorized = email !== 'hidden'
                    const showDetails = detailsId === request._id
                    return (
                      <>
                        <StyledTableRow key={index}>
                          <TableCell>
                            <Tooltip title="See requests">
                              <IconButton
                                disabled={!authorized}
                                onClick={() => {
                                  if (showDetails) {
                                    setDetailsId(null)
                                  } else {
                                    setDetailsId(request._id)
                                  }
                                }}
                              >
                                {!showDetails ? (
                                  <ChevronRight />
                                ) : (
                                  <ExpandMore />
                                )}
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell>{request.requestCount} </TableCell>
                          <TableCell>{email}</TableCell>
                          <TableCell>{display_name}</TableCell>
                          <TableCell>{request.user_type}</TableCell>
                          <TableCell>{request.specialty}</TableCell>
                          <TableCell>
                            {request.last_request_date
                              ? dayjs(request.last_request_date).format(
                                  'MM/DD/YYYY'
                                )
                              : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {request.last_visited
                              ? dayjs(request.last_visited).format('MM/DD/YYYY')
                              : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {request.registered
                              ? dayjs(request.registered).format('MM/DD/YYYY')
                              : 'N/A'}
                          </TableCell>
                          <TableCell>{request.loginCount ?? 'N/A'}</TableCell>
                          <TableCell>{request.articleCount ?? 'N/A'}</TableCell>
                          {/* <TableCell>
                          <Button
                            disabled={!authorized}
                            onClick={() => {
                              if (showDetails) {
                                setDetailsId(null)
                              } else {
                                setDetailsId(request._id)
                              }
                            }}
                          >
                            See Details
                          </Button>
                        </TableCell> */}
                        </StyledTableRow>
                        {showDetails && (
                          <TableRow>
                            <TableCell colSpan={11} padding={'none'}>
                              <Collapse
                                in={showDetails}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Table width="100%">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Request Date</TableCell>
                                      <TableCell>Message</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {[...request.requests]
                                      ?.sort((a, b) => {
                                        return (
                                          new Date(b.created).getTime() -
                                          new Date(a.created).getTime()
                                        )
                                      })
                                      .map((r, i) => {
                                        return (
                                          <StyledTableRow key={i}>
                                            <TableCell>
                                              {request
                                                ? dayjs(r.created).format(
                                                    'MM/DD/YYYY'
                                                  )
                                                : 'N/A'}
                                            </TableCell>
                                            <TableCell>{r.message}</TableCell>
                                          </StyledTableRow>
                                        )
                                      })}
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Card>
    </>
  )
}

export default RequestsTable
