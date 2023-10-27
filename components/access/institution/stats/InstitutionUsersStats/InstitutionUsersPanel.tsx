import { Info, InfoOutlined, Visibility } from '@mui/icons-material'
import {
  Stack,
  CircularProgress,
  Typography,
  Alert,
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableFooter,
  Button,
  Chip,
  TablePagination
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { useUseUserByInstitutionListQuery } from 'graphql/cms-queries/user-list.generated'
import {
  AccessTypeEnum,
  QueryOperation,
  UserInput,
  UserRoles
} from 'graphql/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import UserStatsTableHead from './UsersStatsTableHead'
import UserStatsHeader from './UserStatsHeader'
import { useQueryFilters } from '../../../../hooks/useQueryFilters'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { cleanObj } from 'common/utils'

type Props = {
  institutionId: string
}

const IntitutionUsersPanel = ({ institutionId }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { filters } = useQueryFilters()
  const { filters: global } = useQueryFilters('global')
  const sort_by = (router.query.sort_by as string) ?? 'created'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const search = router.query.search as string
  const page = parseInt((router.query.page as string) ?? '1')
  const perPage = parseInt((router.query.page_size as string) ?? '10')
  const skip = (page - 1) * perPage
  const sort_order = sort_order_str === 'desc' ? -1 : 1

  const start = router.query.start as string | null
  const end = router.query.end as string | null
  const input: UserInput = {
    sort_by: sort_by,
    sort_order: sort_order,
    limit: perPage,
    skip: skip,
    filters: filters || [],
    globalFilters: global
  }

  if (search) {
    input.search = search
  }

  if (start) {
    input.startDate = new Date(start)
  }

  if (end) {
    input.endDate = new Date(end)
  }

  const { data, loading, error } = useUseUserByInstitutionListQuery({
    variables: {
      instId: institutionId,
      input: input
    },
    skip: !router.isReady,
    fetchPolicy: 'network-only'
  })
  const output = data?.usersByInstitution
  const users = output?.users
  const filterCount = output?.count ?? 0
  const pageCount = Math.ceil(filterCount / 40)
  const handleChangePage = (event: unknown, newPage: number) => {
    router.push({
      query: {
        ...router.query,
        page_size: perPage,
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
  const isAdmin = session?.user?.role === UserRoles.Admin
  const _TablePagination = (
    <Box display="flex" alignItems="center" gap={2} position="sticky" left={0}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filterCount}
        rowsPerPage={perPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton={true}
        showLastButton={true}
      />
      {filters?.length > 0 && (
        <Chip color="info" label="Filter Applied" icon={<Info />}></Chip>
      )}
      {}
    </Box>
  )
  return (
    <>
      <Typography color="text.secondary" variant="caption">
        {' '}
        NOTE: Users highlighted in{' '}
        <Box
          component="span"
          sx={{
            backgroundColor: 'warning.main',
            color: 'text.primary',
            px: 1,
            borderRadius: 0.5
          }}
        >
          yellow
        </Box>{' '}
        are no longer matched with the institution but were active during the
        specified period
      </Typography>
      <UserStatsHeader count={users?.length || 0} pageCount={pageCount} />
      <Card>
        <TableContainer>
          {_TablePagination}
          <Table sx={{ minWidth: 1050 }}>
            <UserStatsTableHead />
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={9}>
                    <Stack py={10} alignItems="center">
                      <CircularProgress />
                      <Typography>Loading</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <Stack py={10} alignItems="center" spacing={1}>
                  <Alert severity="error">{error.message}</Alert>
                </Stack>
              )}
              {!!users?.length &&
                users?.map((user, i) => {
                  const access = user?.accessType?.accessType

                  let stickyTableCellColor = i % 2 !== 0 ? 'white' : '#fafafa'
                  const isNoLongerMatched =
                    user.accessType.institution_id !== institutionId

                  return (
                    <StyledTableRow
                      key={user._id}
                      sx={{
                        whiteSpace: 'nowrap',
                        backgroundColor: isNoLongerMatched
                          ? 'warning.light'
                          : undefined
                      }}
                    >
                      <StickyTableCell
                        sx={{
                          p: 0,
                          backgroundColor: stickyTableCellColor
                        }}
                      >
                        <TableCell
                          component={'div'}
                          sx={{ borderBottom: 'none' }}
                        >
                          {isAdmin ? (
                            <Link
                              href={`/cms/user/${user._id}`}
                              target="_blank"
                              passHref
                            >
                              <Typography variant="body1" color="text.secondary">
                                {user.display_name}
                              </Typography>
                            </Link>
                          ) : (
                            <Typography>{user.display_name}</Typography>
                          )}
                          <Typography>{user.email}</Typography>  
                          <Typography>{user.institutionalEmail}</Typography>
                        </TableCell>
                      </StickyTableCell>
                      <TableCell>{user.user_type}</TableCell>
                      <TableCell>{user.specialty ?? 'Not specified'}</TableCell>
                      <TableCell>{user.articleCount}</TableCell>
                      <TableCell>{user.loginCount}</TableCell>
                      <TableCell>
                        {dayjs(user.last_visited).format('MM/DD/YYYY hh:mm A')}
                      </TableCell>
                      <TableCell>
                        {dayjs(user.created).format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                        title={user.institution_name}
                      >
                        {user.institution_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                        title={user.accessType.institution_name}
                      >
                        {user.accessType.institution_name}
                      </TableCell>
                      <TableCell>{user.accessType.matchedBy}</TableCell>
                      <TableCell sx={{ minWidth: 200 }}>
                        <Typography sx={{ textTransform: 'capitalize' }}>
                          {access}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={{
                            pathname: `/access/${institutionId}/users/${user._id}`,
                            query: cleanObj({
                              ...router.query,
                              filters: null,
                              id: null
                            })
                          }}
                          passHref
                          legacyBehavior
                        >
                          <Button startIcon={<Visibility />}>Details</Button>
                        </Link>
                      </TableCell>
                    </StyledTableRow>
                  )
                })}
            </TableBody>
          </Table>
          {_TablePagination}
        </TableContainer>
      </Card>
    </>
  )
}

export default IntitutionUsersPanel
