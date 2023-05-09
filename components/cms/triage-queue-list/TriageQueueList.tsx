import { Delete, Visibility } from '@mui/icons-material'
import {
  Alert,
  Card,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  Link as MuiLink,
  Chip,
  Button,
  TableRow
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { TriageQueueStatus } from 'graphql/types'
import Link from 'next/link'
import React from 'react'
import TriageQueueListHead from './TriageQueueListHead'
import { useTriageQueueList } from './useTriageQueueList'

const TriageQueueList = () => {
  const {
    triageQueueRequests,
    count,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    error
  } = useTriageQueueList()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
    setPage(1)
  }

  const rowBackground = (status: TriageQueueStatus) => {
    switch (status) {
      case TriageQueueStatus.ManuallySent:
        return '#f8dba5'
      case TriageQueueStatus.Removed:
        return '#ffebee'
      case TriageQueueStatus.Sent:
        return '#e3f2fd'
      default:
        return null
    }
  }

  const NotApplicable = (
    <Typography variant="body2" color="text.secondary">
      N/A
    </Typography>
  )
  const NotMatched = (
    <Typography variant="body2" color="text.secondary">
      N/A
    </Typography>
  )
  const NotSpecified = (
    <Typography variant="body2" color="text.secondary">
      N/A
    </Typography>
  )
  const NotSet = (
    <Typography variant="body2" color="text.secondary">
      Not Set
    </Typography>
  )
  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Table>
          <TriageQueueListHead />
          <TableBody>
            {triageQueueRequests?.map((item) => {
              const user = item.user
              const inst = item.institution
              const subscribedText = user?.subActive ? 'Yes' : 'No'
              const subscribedColor = user?.subActive ? 'success' : 'error'
              const backgroundColor = rowBackground(item.type)
              return (
                <StyledTableRow
                  key={item._id}
                  sx={{
                    backgroundColor: `${backgroundColor} !important`
                  }}
                >
                  <TableCell>
                    <Stack>
                      <Link
                        href={`/cms/triage-queue/${item._id}`}
                        passHref
                        legacyBehavior
                      >
                        <Button size="small" startIcon={<Visibility />}>
                          Details
                        </Button>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <Stack>
                      <Typography color="text.primary">
                        {user?.display_name ||
                          item.display_name ||
                          'Name not found'}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {user?.email ?? item.email}
                      </Typography>
                      {!!user && (
                        <Link
                          href={`/cms/user/${user._id}`}
                          passHref
                          legacyBehavior
                        >
                          <MuiLink>{user._id}</MuiLink>
                        </Link>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {user?.countryCode ?? item.countryCode ?? NotApplicable}
                  </TableCell>
                  <TableCell>
                    {user?.regionName ?? item.regionName ?? NotApplicable}
                  </TableCell>
                  <TableCell>
                    {user?.institution_name ??
                      item.institution_name ??
                      NotApplicable}
                  </TableCell>
                  <TableCell>{inst?.name ?? NotMatched}</TableCell>
                  <TableCell>{inst?.category ?? NotApplicable}</TableCell>
                  <TableCell>
                    {inst ? (
                      <Typography variant="body2" color="text.secondary">
                        {inst.stats?.userCount}
                      </Typography>
                    ) : (
                      NotApplicable
                    )}
                  </TableCell>
                  <TableCell>
                    {inst ? (
                      <Typography variant="body2" color="text.secondary">
                        {inst.stats?.totalArticleCount}
                      </Typography>
                    ) : (
                      NotApplicable
                    )}
                  </TableCell>
                  <TableCell>
                    {inst ? (
                      <Typography variant="body2" color="text.secondary">
                        {inst.stats?.loginCount}
                      </Typography>
                    ) : (
                      NotApplicable
                    )}
                  </TableCell>
                  <TableCell>{user?.user_type ?? NotSpecified}</TableCell>
                  <TableCell>{user?.specialty ?? NotSpecified}</TableCell>
                  <TableCell>
                    <Chip
                      color={subscribedColor}
                      label={subscribedText}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {dayjs(item.created).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    {item.sentEmailAt
                      ? dayjs(item.sentEmailAt).format('MM/DD/YYYY')
                      : NotApplicable}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.market ? item.market : NotSet}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: '30em',
                      minWidth: '20em',
                      wordBreak: 'break-word'
                    }}
                  >
                    {item.notes}
                  </TableCell>
                </StyledTableRow>
              )
            })}
            {loading && (
              <StyledTableRow>
                <TableCell colSpan={15}>
                  <Stack alignItems="center" my={4}>
                    <CircularProgress /> Loading
                  </Stack>
                </TableCell>
              </StyledTableRow>
            )}
            {error && (
              <StyledTableRow>
                <TableCell colSpan={15}>
                  <Alert severity="error">{error}</Alert>
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={count}
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  )
}

export default TriageQueueList
