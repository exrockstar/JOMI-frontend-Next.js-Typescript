import { Edit } from '@mui/icons-material'
import {
  Card,
  Table,
  TableBody,
  TablePagination,
  TableContainer,
  TableCell,
  Link as MuiLink,
  IconButton,
  Typography,
  Chip,
  Box,
  Stack
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { StickyTableCell } from 'components/common/StickyTableCell'
import dayjs from 'dayjs'
import { UserManagementListQuery } from 'graphql/cms-queries/user-list.generated'
import { SubType } from 'graphql/types'
import React from 'react'
import UserListTableHeader from './UserListTableHeader'
import { useUserManagementList } from './useUserManagementList'
import Link from 'next/link'
import {
  subscriptionColor,
  subscriptionText
} from 'components/common/subscriptionUtils'
import VerifyDateText from '../user/UserMainSettings/sections/VerifyDateText'
type Props = {
  users: UserManagementListQuery['users']['users']
}

const UserManagementList: React.FC<Props> = ({ users }) => {
  const [selected, setSelected] = React.useState<string>()
  const { page, setPage, pageSize, setPageSize, count } =
    useUserManagementList()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  const NotApplicable = (
    <Typography variant="body2" color="text.disabled">
      N/A
    </Typography>
  )
  const NotSpecified = (
    <Typography variant="body2" color="text.disabled">
      Not Specified
    </Typography>
  )
  const handleClick = (key: string) => {
    setSelected(key)
  }

  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Box position="sticky" left={0}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={count}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Box>
        <Table size="small">
          <UserListTableHeader />
          <TableBody>
            {users?.map((user, i) => {
              const created = dayjs(user.created).format('MM/DD/YYYY')
              const last_visited = dayjs(user.last_visited).format('MM/DD/YYYY')
              const socialLogins = Object.entries(user.social || {})
                .map((entry) => {
                  const [key, value] = entry
                  if (key === '__typename') return null
                  return !!value ? key : null
                })
                .filter((val) => !!val)
                .join(', ')
              const access = user?.accessType?.accessType

              const color = subscriptionColor(access)
              const userSubText = subscriptionText(access)
              let stickyTableCellColor: string
              i % 2 !== 0
                ? (stickyTableCellColor = 'white')
                : (stickyTableCellColor = '#fafafa')
              let referer: string = null
              let refererPath: any = null
              if (user.referer) {
                referer = user.referer === '' ? 'organic' : user.referer
              }
              if (user.referrerPath) {
                refererPath =
                  user.referrerPath === '' ? NotApplicable : user.referrerPath
                if (refererPath != NotApplicable) {
                  refererPath = refererPath.replaceAll('+', ' ')
                  refererPath = refererPath.replace('?', '')
                  refererPath = refererPath.replace(/%\w\w/g, '')
                }
              }
              return (
                <StyledTableRow
                  key={user._id}
                  sx={{
                    whiteSpace: 'nowrap',
                    ':hover': { cursor: 'pointer' }
                  }}
                  hover
                  selected={selected === user._id}
                  onClick={() => handleClick(user._id)}
                >
                  <StickyTableCell
                    backgroundColor={stickyTableCellColor}
                    sx={{ p: 0 }}
                  >
                    <Stack
                      direction="row"
                      alignItems={'stretch'}
                      pr={2}
                      py={1.25}
                      sx={{
                        borderRightColor: 'grey.100',
                        borderRightWidth: 2,
                        borderRightStyle: 'solid'
                      }}
                    >
                      <Box minWidth={105} px={2}>
                        <IconButton
                          LinkComponent={Link}
                          href={`/cms/user/${user._id}`}
                        >
                          <Edit />
                        </IconButton>
                      </Box>

                      <Box>
                        <MuiLink
                          component={Link}
                          href={`/cms/user/${user._id}`}
                        >
                          {user.email}
                        </MuiLink>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontSize={12}
                        >
                          <VerifyDateText date={user.emailVerifiedAt} />
                        </Typography>
                      </Box>
                    </Stack>
                  </StickyTableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {user.institutionalEmail || NotSpecified}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={12}
                    >
                      <VerifyDateText date={user.instEmailVerifiedAt} />
                    </Typography>
                  </TableCell>
                  <TableCell>{user.display_name || NotSpecified}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.user_type || NotSpecified}</TableCell>
                  <TableCell>{user.specialty || NotSpecified}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={user.institution_name}
                  >
                    {user.institution_name || NotSpecified}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {user.matched_institution_name || NotApplicable}
                  </TableCell>
                  <TableCell>{user.accessType?.matchStatus}</TableCell>
                  <TableCell>{last_visited}</TableCell>
                  <TableCell>{created}</TableCell>
                  <TableCell>
                    <Chip
                      label={userSubText}
                      size="small"
                      color={color}
                      sx={{
                        textTransform: 'uppercase',
                        letterSpacing: 1.2
                      }}
                    ></Chip>
                    {user.subscription.subType === SubType.Institution && (
                      <Typography
                        variant="body2"
                        display="flex"
                        alignItems="center"
                      >
                        {user.subscription?.fromInst}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {user.promo_code || (
                      <Typography variant="body2" color="text.disabled">
                        N/A
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{user.loginCount ?? 0}</TableCell>
                  <TableCell>{user.articleCount ?? 0}</TableCell>
                  <TableCell>{socialLogins || NotApplicable}</TableCell>
                  <TableCell>{user.countryCode || NotApplicable}</TableCell>
                  <TableCell>{user.regionName || NotApplicable}</TableCell>
                  <TableCell>{referer ?? NotApplicable}</TableCell>
                  <TableCell>
                    {refererPath
                      ?.split('&')
                      .map((path, i) => <p key={i}>{path}</p>) ?? NotApplicable}
                  </TableCell>
                  <TableCell>
                    {user.hasRequestedSubscription ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>{user.requestSubscriptionCount ?? 0}</TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </Card>
  )
}

export default UserManagementList
