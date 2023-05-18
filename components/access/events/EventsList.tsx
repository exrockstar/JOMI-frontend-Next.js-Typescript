import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
  Typography,
  Alert,
  Link as MuiLink,
  TableContainer,
  TablePagination,
  useMediaQuery
  // useTheme
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { ActivityType } from 'graphql/types'
import EventListTableHead from './EventListTableHead'
import { useEventsAccessList } from './useEventsAccessList'

/**
 * Events list for access page
 * @returns
 */
const EventsList = () => {
  const {
    events,
    loading,
    error,
    setSearchTerm,
    page,
    setPage,
    count,
    pageSize,
    setPageSize
  } = useEventsAccessList()
  const NotApplicable = (
    <Typography variant="body2" color="text.disabled">
      N/A
    </Typography>
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
    setPage(1)
  }

  if (loading) {
    return (
      <Stack py={10} alignItems="center">
        <CircularProgress />
        <Typography>Loading</Typography>
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack py={10} alignItems="center" spacing={1}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    )
  }

  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Table>
          <EventListTableHead />
          <TableBody>
            {events?.map((event, index) => {
              const key = `${event.user_id}-${event.created}-${index}`
              const isVideoPlay = event.activity == ActivityType.VideoPlay
              let referer: string = null
              let refererPath: any = null

              if (event.referredFrom) {
                referer =
                  event.referredFrom === '' ? 'organic' : event.referredFrom
              }
              if (event.referrerPath) {
                refererPath =
                  event.referrerPath === '' ? NotApplicable : event.referrerPath
                if (refererPath != NotApplicable) {
                  refererPath = refererPath.replaceAll('+', ' ')
                  refererPath = refererPath.replace('?', '')
                  refererPath = refererPath.replace(/%\w\w/g, '')
                }
              }

              if (event.user) {
                if (event.user.referer)
                  referer =
                    event.user.referer === '' ? 'organic' : event.user.referer
                if (event.user.referrerPath) {
                  refererPath =
                    event.user.referrerPath === ''
                      ? NotApplicable
                      : event.user.referrerPath
                  if (refererPath != NotApplicable) {
                    refererPath = refererPath.replaceAll('+', ' ')
                    refererPath = refererPath.replace('?', '')
                    refererPath = refererPath.replace(/%\w\w/g, '')
                  }
                }
              }

              return (
                <StyledTableRow key={key}>
                  <TableCell>
                    {event.activity} {isVideoPlay && `(${event.time_watched}s)`}
                  </TableCell>
                  <TableCell>
                    {event.user_id !== 'anon' ? (
                      <MuiLink
                        onClick={() => setSearchTerm(event.user_id)}
                        href="#"
                      >
                        {event.user_id}
                      </MuiLink>
                    ) : (
                      event.user_id
                    )}
                  </TableCell>
                  <TableCell>{event.ip_address_str}</TableCell>
                  <TableCell>{event.user?.display_name ?? 'N/A'}</TableCell>

                  <TableCell>{event.article_publication_id}</TableCell>
                  <TableCell>{event.article_title}</TableCell>
                  <TableCell>{event.institution?.name}</TableCell>
                  <TableCell>
                    {event.geolocation?.countryCode}-
                    {event.geolocation?.regionName}
                  </TableCell>
                  <TableCell>
                    {dayjs(event.created).format('MM/DD/YYYY HH:mm A')}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: '30em',
                      minWidth: '20em',
                      wordBreak: 'break-word'
                    }}
                  >
                    {referer ?? NotApplicable}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: '30em',
                      minWidth: '20em',
                      wordBreak: 'break-word'
                    }}
                  >
                    {refererPath
                      ?.split('&')
                      .map((path, i) => <p key={i}>{path}</p>) ?? NotApplicable}
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={count}
          page={page - 1}
          rowsPerPage={pageSize}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
        />
      </TableContainer>
    </Card>
  )
}

export default EventsList
