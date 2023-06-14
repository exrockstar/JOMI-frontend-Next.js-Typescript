import { Info, Visibility } from '@mui/icons-material'
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
  Pagination,
  Button,
  Chip
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { useUseUserByInstitutionListQuery } from 'graphql/cms-queries/user-list.generated'
import { AccessTypeEnum, UserInput, UserRoles } from 'graphql/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import UserStatsTableHead from './UsersStatsTableHead'
import UserStatsHeader from './UserStatsHeader'
import { useQueryFilters } from '../../../../hooks/useQueryFilters'

type Props = {
  institutionId: string
}

const IntitutionUsersPanel = ({ institutionId }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { filters } = useQueryFilters()
  const sort_by = (router.query.sort_by as string) ?? 'created'
  const sort_order_str = (router.query.sort_order as string) ?? 'desc'
  const search = router.query.search as string
  const page = parseInt((router.query.page as string) ?? '1')
  const perPage = 40
  const skip = (page - 1) * 40
  const sort_order = sort_order_str === 'desc' ? -1 : 1
  const input: UserInput = {
    sort_by: sort_by,
    sort_order: sort_order,
    limit: perPage,
    skip: skip,
    filters: filters || []
  }

  if (search) {
    input.search = search
  }
  const { data, loading, error } = useUseUserByInstitutionListQuery({
    variables: {
      instId: institutionId,
      input: input
    },
    skip: !router.isReady
  })
  const output = data?.usersByInstitution
  const users = output?.users
  const filterCount = output?.count ?? 0
  const pageCount = Math.ceil(filterCount / 40)
  const handlePageChange = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page: page
      }
    })
  }
  const isAdmin = session?.user?.role === UserRoles.Admin
  const TablePagination = (
    <TableFooter>
      <Box p={1} display="flex" alignItems="center" gap={2}>
        <Pagination
          count={pageCount}
          shape="rounded"
          page={page}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
        {filterCount && (
          <Typography color="text.secondary">
            {skip + 1} to {Math.min(skip + perPage, filterCount)} of{' '}
            {filterCount} users
          </Typography>
        )}
        {filters?.length > 0 && (
          <Chip color="info" label="Filter Applied" icon={<Info />}></Chip>
        )}
      </Box>
    </TableFooter>
  )
  return (
    <>
      <UserStatsHeader count={users?.length || 0} pageCount={pageCount} />
      <Card>
        <TableContainer>
          {TablePagination}
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
                users?.map((user) => {
                  const access = user?.accessType?.accessType
                  const lastAccess = user?.subscription.lastSubType
                  const accessExpiry = user?.subscription.lastSubTypeExpiry

                  const needsConfirmation = [
                    AccessTypeEnum.AwaitingEmailConfirmation,
                    AccessTypeEnum.EmailConfirmationExpired
                  ].includes(access)

                  return (
                    <StyledTableRow key={user._id}>
                      <TableCell>
                        {isAdmin ? (
                          <Link
                            href={`/cms/user/${user._id}`}
                            target="_blank"
                            passHref
                          >
                            <Typography>{user.email}</Typography>
                          </Link>
                        ) : (
                          <Typography>{user.email}</Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">
                          {user.display_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          {user.institutionalEmail}
                        </Box>
                      </TableCell>
                      <TableCell>{user.matchedBy}</TableCell>
                      <TableCell sx={{ minWidth: 200 }}>
                        <Typography sx={{ textTransform: 'capitalize' }}>
                          {lastAccess}
                        </Typography>
                        {needsConfirmation && (
                          <Box width={'100%'}>
                            <Typography variant="caption" color="error.main">
                              Needs email confirmation
                            </Typography>
                          </Box>
                        )}
                        {!!accessExpiry && dayjs().isAfter(accessExpiry) && (
                          <Box width={'100%'}>
                            <Typography variant="caption" color="error.main">
                              Expired: {dayjs(accessExpiry).format('L LT')}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>{user.user_type}</TableCell>
                      <TableCell>{user.specialty ?? 'Not specified'}</TableCell>
                      <TableCell>
                        {dayjs(user.last_visited).format('MM/DD/YYYY hh:mm A')}
                      </TableCell>
                      <TableCell>
                        {dayjs(user.created).format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell>{user.loginCount}</TableCell>
                      <TableCell>{user.articleCount}</TableCell>
                      <TableCell>
                        <Link
                          href={`/access/${institutionId}/users/${user._id}`}
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
          {TablePagination}
        </TableContainer>
      </Card>
    </>
  )
}

export default IntitutionUsersPanel
