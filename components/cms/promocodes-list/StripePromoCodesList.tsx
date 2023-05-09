import {
  Card,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableCell,
  Typography,
  Box,
  Tooltip,
  Chip,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  Switch
} from '@mui/material'
import { StickyTableCell } from 'components/common/StickyTableCell'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import { PromoCodeDuration } from 'graphql/types'
import StripePromoCodeListTableHeader from './StripePromoCodeListTableHead'
import { useStripePromoCodesList } from './useStripePromoCodesList'
import NextLink from 'next/link'
import { Visibility } from '@mui/icons-material'
import { capitalize } from 'lodash'
import { useUpdateStripeCodeMutation } from 'graphql/cms-queries/stripe-promo-codes.generated'
import { useState } from 'react'
import { onError } from '@apollo/client/link/error'
const StripePromoCodesList: React.FC<{}> = () => {
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalCount,
    promocodes,
    refetch
  } = useStripePromoCodesList()
  const [modifiedId, setModifiedId] = useState('')
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }
  const [updateCode, { loading }] = useUpdateStripeCodeMutation({
    onCompleted() {
      refetch()
      setModifiedId('')
    },
    onError() {
      setModifiedId('')
    }
  })
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value)
  }

  const getFormattedDate = (date?: string) => {
    console.log(date)
    return date ? dayjs(date).format('MM/DD/YYYY HH:mm A') : 'N/A'
  }

  const getUserType = (product: string) => {
    switch (product) {
      case 'pre-med': {
        return 'Pre-Med'
      }
      default:
        const prod = product
          .split('_')
          .map((x) => capitalize(x))
          .join(' ')
        return prod
    }
  }
  const toggleActive = async (couponId: string, active: boolean) => {
    setModifiedId(couponId)
    await updateCode({
      variables: {
        input: {
          couponId,
          active
        }
      }
    })
  }
  return (
    <Card>
      <TableContainer sx={{ minWidth: 1050 }}>
        <Box position="sticky" left={0}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Box>
        <Table size="small">
          <StripePromoCodeListTableHeader />
          <TableBody>
            {promocodes?.map((promocode, i) => {
              const stickyTableCellColor = i % 2 !== 0 ? 'white' : '#fafafa'
              const percent_off = promocode.percent_off
                ? `${promocode.percent_off}%`
                : 'N/A'
              return (
                <StyledTableRow key={promocode._id}>
                  <StickyTableCell
                    sx={{
                      whiteSpace: 'nowrap',
                      ':hover': { cursor: 'pointer' }
                    }}
                    backgroundColor={stickyTableCellColor}
                  >
                    <Link
                      href={`/cms/promocodes-list/${promocode._id}`}
                      component={NextLink}
                    >
                      {promocode.code}
                    </Link>
                  </StickyTableCell>

                  <TableCell>
                    {promocode.valid ? (
                      <Chip
                        label="Yes"
                        color="secondary"
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="No"
                        color="error"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={promocode.active}
                          onChange={(e) => {
                            toggleActive(promocode.couponId, e.target.checked)
                          }}
                          disabled={modifiedId === promocode.couponId}
                          title="Click to enable/disable promocode"
                        />
                      }
                      label={
                        modifiedId === promocode.couponId
                          ? 'Loading...'
                          : promocode.active
                          ? 'Yes'
                          : 'No'
                      }
                    />
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {getFormattedDate(promocode.created)}
                  </TableCell>
                  <TableCell>
                    {promocode.amount_off
                      ? `$${(promocode.amount_off / 100).toFixed(2)}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{percent_off}</TableCell>
                  <TableCell>
                    {promocode.applies_to?.length > 0 ? (
                      <>
                        {promocode?.applies_to.slice(0, 2).map((x) => {
                          const product = x.replace('prod_', '')
                          const splitted = product.split('_')
                          const interval = splitted.pop()

                          const userType = getUserType(splitted.join('_'))
                          return (
                            <Typography
                              key={i}
                              variant="body2"
                              whiteSpace={'nowrap'}
                              textOverflow={'ellipsis'}
                              overflow="hidden"
                              sx={{ cursor: 'pointer' }}
                            >
                              {`${userType} - ${interval}`}
                            </Typography>
                          )
                        })}
                        {!!promocode?.applies_to.slice(2).length && (
                          <Box sx={{ width: 180 }}>
                            <Typography variant="body2">
                              {`... and ${
                                promocode?.applies_to.slice(2).length
                              } more.`}{' '}
                              <Link
                                href={`/cms/promocodes-list/${promocode._id}`}
                              >
                                View All ➔
                              </Link>
                            </Typography>
                          </Box>
                        )}
                      </>
                    ) : (
                      'All products'
                    )}
                  </TableCell>
                  <TableCell>{promocode.times_redeemed ?? 'N/A'}</TableCell>
                  <TableCell>{promocode.max_redemptions ?? 'N/A'}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {getFormattedDate(promocode.redeem_by)}
                  </TableCell>
                  <TableCell>
                    {promocode.duration === PromoCodeDuration.Repeating ? (
                      <Typography>
                        {promocode.duration_in_months} months
                      </Typography>
                    ) : (
                      <Typography>{promocode.duration}</Typography>
                    )}
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
        <Box position="sticky" left={0}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
          />
        </Box>
      </TableContainer>
    </Card>
  )
}

export default StripePromoCodesList
