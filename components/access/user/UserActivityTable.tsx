import { ArrowBack } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs, { Dayjs } from 'dayjs'
import { useAccessEventsQuery } from 'graphql/queries/access.generated'
import { AccessFilterInput, ActivityType, QueryOperation } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import UserActivityTableHead from './UserActivityTableHead'
import Link from 'next/link'
import CustomDatePicker from 'components/common/CustomDatePicker'

const UserActivityTable = () => {
  const router = useRouter()
  const userId = router.query.userId as string
  const sort_by = (router.query.sort_by as string) ?? 'created'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const page = parseInt((router.query.page as string) ?? '1')
  const activity = (router.query.activity as string) ?? 'All'
  const perPage = parseInt((router.query.page_size as string) ?? '10')
  const skip = (page - 1) * perPage
  const start = router.query.start as string | null
  const end = router.query.end as string | null

  const input: AccessFilterInput = {
    sort_by,
    sort_order,
    skip,
    limit: perPage,
    filters: [
      {
        columnName: 'user_id',
        value: userId,
        operation: QueryOperation.Equal
      }
    ]
  }

  if (start) {
    input.filters?.push({
      columnName: 'created',
      value: start,
      operation: QueryOperation.After
    })
  }

  if (end) {
    input.filters?.push({
      columnName: 'created',
      value: end,
      operation: QueryOperation.Before
    })
  }

  if (activity !== 'All') {
    input.filters.push({
      columnName: 'activity',
      value: activity,
      operation: QueryOperation.Equal
    })
  }
  const { data } = useAccessEventsQuery({
    variables: { input }
  })

  const events = data?.output.events

  const filterCount = data?.output.count ?? 0

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
        page: 1,
        page_size: +event.target.value
      }
    })
  }

  const handleActivityChange = (event: SelectChangeEvent) => {
    const activity = event.target.value as string
    router.push({
      query: {
        ...router.query,
        activity
      }
    })
  }

  const handleDateChange = (newVal: Dayjs, prop: 'end' | 'start') => {
    const query = router.query
    if (!newVal) {
      delete query[prop]
      router.push({ query })
      return
    }
    if (newVal.isValid()) {
      const formatted = newVal?.format('YYYY-MM-DD')
      router.push({
        query: {
          ...query,
          [prop]: formatted
        }
      })
    }
  }

  const TableFoot = (
    <Box
      py={1}
      pr={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
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
      </Box>
      <FormControl sx={{ width: 140 }}>
        <InputLabel id="select-label">Filter by Activity</InputLabel>
        <Select
          value={activity}
          label="Filter by Activity"
          labelId="select-label"
          id="simple-select"
          size="small"
          onChange={handleActivityChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'login'}>Login</MenuItem>
          <MenuItem value={'article'}>Article View</MenuItem>
          <MenuItem value={'video-play'}>Video Play</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
  const text = (activity: ActivityType) => {
    switch (activity) {
      case ActivityType.Article:
        return 'Article View'
      default:
        return activity
    }
  }
  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pr={1}
      >
        <Typography variant="h4" p={2}>
          Activity{' '}
        </Typography>
        <Stack direction="row" gap={2} alignItems="center" mb={2}>
          <Typography fontWeight={600}>Period</Typography>
          <CustomDatePicker
            defaultLabel="Start date"
            value={start}
            onChange={(val?: Dayjs) => {
              handleDateChange(val, 'start')
            }}
          />
          <CustomDatePicker
            defaultLabel="End date"
            value={end}
            onChange={(val?: Dayjs) => {
              handleDateChange(val, 'end')
            }}
          />
        </Stack>
      </Stack>
      <Divider />
      <Card>
        <TableContainer>
          {TableFoot}
          <Table>
            <UserActivityTableHead />
            <TableBody sx={{ borderRadius: 2 }}>
              {events?.map((activity, index) => {
                const activityText = text(activity.activity)
                return (
                  <StyledTableRow key={index}>
                    <TableCell>
                      {dayjs(activity.created).format(
                        'MM/DD/YYYY - HH:mm:ss A'
                      )}
                    </TableCell>
                    <TableCell sx={{ display: 'flex' }}>
                      {activityText}
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
                      {(activity.activity !== ActivityType.Login && (
                        <Link
                          href={`/article/${activity.article_publication_id}`}
                          target={'_blank'}
                        >
                          {activity.article_title}
                        </Link>
                      )) ??
                        'N/A'}

                      {activity.activity === ActivityType.Login &&
                        activity.ip_address_str}
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Card>
  )
}

export default UserActivityTable
