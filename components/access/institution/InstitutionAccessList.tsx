import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  CircularProgress,
  Stack,
  Typography,
  Alert,
  Link as MuiLink,
  TableContainer
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import Link from 'next/link'

import { bool } from 'yup'
import InstitutionTableHead from './InstitutionTableHead'
import { useInstitutionAccessList } from './useInstitutionAccessList'
import ArticleViewsOverTime from './ArticleViewsOverTime'
/**
 * Institution list for access page
 * @returns
 */
const InstitutionAccessList = () => {
  const { institutions, loading, error } = useInstitutionAccessList()
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
      <TableContainer>
        <Table sx={{ minWidth: 1050 }}>
          <InstitutionTableHead />
          <TableBody>
            {institutions?.map((institution) => {
              console.log(
                institution._id,
                institution.articleViewsOverTime.map((d) => d.count)
              )
              return (
                <StyledTableRow key={institution._id}>
                  <TableCell>
                    <Link
                      href={`access/${institution._id}`}
                      passHref
                      legacyBehavior
                    >
                      <MuiLink>{institution.name}</MuiLink>
                    </Link>
                  </TableCell>
                  <TableCell>{institution.user_count}</TableCell>
                  <TableCell>{institution.total_article_count}</TableCell>
                  <TableCell>{institution.pending_requests}</TableCell>
                  <TableCell>{institution.sent_requests}</TableCell>
                  <TableCell>
                    {dayjs(institution.created).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>{institution.subscription.status}</TableCell>
                  <TableCell>
                    <ArticleViewsOverTime
                      institutionId={institution._id}
                      data={institution.articleViewsOverTime}
                    />
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default InstitutionAccessList
