import { Edit } from '@mui/icons-material'
import {
  Card,
  Table,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  TableContainer,
  Chip,
  Typography,
  Link as MuiLink
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { InstitutionsListQuery } from 'graphql/cms-queries/institutions-list.generated'
import { StatusType } from 'graphql/types'
import { useRouter } from 'next/router'
import React from 'react'
import InstitutionTableHead from './InstitutionTableHead'
import { useInstitutionList } from './useInstitutionList'
import Link from 'next/link'

type Props = {
  institutions: InstitutionsListQuery['institutions']['institutions']
  count: number
}

const InstitutionsList: React.FC<Props> = ({ institutions, count }) => {
  const router = useRouter()
  const { page, setPage, pageSize, setPageSize } = useInstitutionList()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  const orderStatusColor = (type: string) => {
    switch (type) {
      case StatusType.Standard:
        return 'success'
      case StatusType.Trial:
        return 'warning'
      default:
        return 'default'
    }
  }

  const expiryColor = (expiry_date: string) => {
    const now = dayjs()
    const one_week_later = dayjs().add(7, 'day')
    const expiryingSoon = dayjs(expiry_date).isBefore(one_week_later)
    const expired = dayjs(expiry_date).isBefore(now)

    if (expired) {
      return 'error.main'
    }

    if (expiryingSoon) {
      return 'warning.main'
    }

    return 'text.secondary'
  }

  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Table>
          <InstitutionTableHead />
          <TableBody>
            {institutions?.map((inst) => {
              const created = dayjs(inst.created).format('MM/DD/YYYY')
              const expiry = inst.expiry_date_cached
                ? dayjs(inst.expiry_date_cached).format('MM/DD/YYYY')
                : 'N/A'
              const isExpired = dayjs(inst.expiry_date_cached).isBefore(
                new Date()
              )

              return (
                <StyledTableRow key={inst._id}>
                  <TableCell sx={{ width: 400 }}>
                    <Link
                      href={`/cms/institutions-list/${inst._id}`}
                      passHref
                      legacyBehavior
                    >
                      <MuiLink underline="none">{inst.name}</MuiLink>
                    </Link>
                  </TableCell>
                  <TableCell>{inst.category ?? 'N/A'}</TableCell>
                  <TableCell>{inst.user_count}</TableCell>
                  <TableCell>{inst.total_article_count}</TableCell>
                  <TableCell>{inst.pending_requests}</TableCell>

                  <TableCell>{inst.sent_requests}</TableCell>
                  <TableCell>{inst.total_requests}</TableCell>
                  <TableCell>{created}</TableCell>
                  <TableCell>
                    <Chip
                      label={inst.subscription.status?.toUpperCase()}
                      color={orderStatusColor(inst.subscription?.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ color: expiryColor(expiry) }}
                      variant="subtitle2"
                    >
                      {expiry}
                    </Typography>
                    {isExpired && (
                      <Typography
                        variant="caption"
                        color={
                          orderStatusColor(
                            inst.subscription?.expiredOrderStatus
                          ) + '.main'
                        }
                      >
                        {inst.subscription?.expiredOrderStatus?.toUpperCase()}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      startIcon={<Edit />}
                      sx={{ mr: 2 }}
                      variant="outlined"
                      onClick={() =>
                        router.push(`/cms/institutions-list/${inst._id}`)
                      }
                      size="small"
                    >
                      Edit
                    </Button>
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
          rowsPerPage={pageSize}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  )
}

export default InstitutionsList
