import { ChevronRight, ExpandMore } from '@mui/icons-material'
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
  Tooltip
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { useRequestsByUserQuery } from 'graphql/cms-queries/triage-queue-list.generated'
import { QueryOperation, TriageQueueInput } from 'graphql/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import RequestDetailsModal from './RequestDetailsModal'
import RequestsTableHead from './RequestsTableHead'

type Props = {
  institutionID: string
}
const RequestsTable = ({ institutionID }: Props) => {
  const router = useRouter()
  const [detailsId, setDetailsId] = useState('')

  const sort_by = (router.query.sort_by as string) ?? 'last_request_date'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const page = parseInt((router.query.page as string) ?? '1')
  const perPage = 10
  const skip = (page - 1) * perPage
  const input: TriageQueueInput = {
    sort_by,
    sort_order,
    skip,
    limit: perPage
  }

  const { data } = useRequestsByUserQuery({
    variables: {
      input,
      instId: institutionID
    }
  })
  const output = data?.triageQueueRequestsByInstitution
  const requests = output?.triage_requests
  const filterCount = output?.count ?? 0
  const pageCount = Math.ceil(filterCount / perPage)
  const handlePageChange = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page: page
      }
    })
  }
  const TableFoot = (
    <Box
      py={1}
      pr={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box py={1} display="flex" alignItems="center">
        <Pagination
          count={pageCount}
          shape="rounded"
          page={page}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
        {filterCount && (
          <Typography color="text.secondary">
            {skip + 1} to {Math.min(skip + perPage, filterCount)} of{' '}
            {filterCount} Users with {output.totalRequestCount} Requests
          </Typography>
        )}
      </Box>
    </Box>
  )
  return (
    <>
      <Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pr={1}
        >
          <Typography variant="h4" p={2}>
            Users
          </Typography>
        </Stack>
        <Divider />
        <Card>
          <TableContainer>
            {TableFoot}
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
                              {!showDetails ? <ChevronRight /> : <ExpandMore />}
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
        </Card>
      </Card>
    </>
  )
}

export default RequestsTable
