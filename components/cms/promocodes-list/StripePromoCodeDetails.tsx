import { LoadingButton } from '@mui/lab'
import { Box, Typography, Chip, Link, Table, Divider } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { isProduction } from 'common/constants'
import { cleanObj } from 'common/utils'
import SubmitButton from 'components/account/SubmitButton'
import FormikDatePicker from 'components/common/formik/FormikDatePicker'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { StyledTableRow } from 'components/common/StyledTableRow'
import { isServer } from 'components/utils/isServer'
import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import {
  GetStripePromoCodeQuery,
  useDeleteStripePromoCodeMutation,
  useUpdateStripeCodeMutation
} from 'graphql/cms-queries/stripe-promo-codes.generated'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { UpdateStripeCodeInput } from 'graphql/types'
import { snakeCase } from 'lodash'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

type Props = {
  promocode: GetStripePromoCodeQuery['getStripePromoCode']
}
const STRIPE_BASE_URL = isProduction
  ? `https://dashboard.stripe.com`
  : `https://dashboard.stripe.com/test`

const StripePromoCodeDetails = ({ promocode }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { data } = useUserTypesAndSpecialtiesQuery()
  const [updatePromocode] = useUpdateStripeCodeMutation({
    onCompleted() {
      enqueueSnackbar('Promocode updated', { variant: 'success' })
      router.reload()
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  })
  const [deletePromocode, { loading: deleting }] =
    useDeleteStripePromoCodeMutation({
      onCompleted() {
        enqueueSnackbar('Promocode deleted!', { variant: 'success' })
        location.href = '/cms/promocodes-list'
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    })
  const userTypes = data?.userTypes ?? []
  return (
    <Formik<UpdateStripeCodeInput>
      initialValues={{
        couponId: promocode.couponId,
        name: promocode.name,
        max_redemptions: promocode.max_redemptions,
        redeem_by: promocode.redeem_by
      }}
      onSubmit={async (values) => {
        await updatePromocode({
          variables: {
            input: cleanObj(values) as UpdateStripeCodeInput
          }
        })
      }}
    >
      {({ isSubmitting, isValid, dirty }) => {
        return (
          <Box component={Form} display="flex" flexDirection={'column'}>
            <Box display="flex" justifyContent={'flex-start'} gap={10}>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">Created By:</TableCell>
                      <TableCell>
                        {promocode.createdBy ? (
                          <Link
                            component={NextLink}
                            href={`/cms/user/${promocode.createdBy._id}`}
                          >
                            {promocode.createdBy?.display_name ??
                              promocode.createdBy._id}
                          </Link>
                        ) : (
                          'Unknown'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Created At:</TableCell>
                      <TableCell>
                        {promocode.created
                          ? dayjs(promocode.created).format(
                              'MM/DD/YYYY HH:mm:ss A'
                            )
                          : 'N/A'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">
                        <b>Code:</b>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={700}>
                          {promocode.code}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Valid:</TableCell>
                      <TableCell>
                        <Chip
                          label={promocode.valid ? 'Yes' : 'No'}
                          color={promocode.valid ? 'secondary' : 'error'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">Active:</TableCell>
                      <TableCell>
                        <Chip
                          label={promocode.active ? 'Yes' : 'No'}
                          color={promocode.active ? 'secondary' : 'error'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th">
                        <b>Stripe Coupon ID: </b>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`${STRIPE_BASE_URL}/coupons/${promocode.couponId}`}
                        >
                          {promocode.couponId}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th">
                        <b>Description: </b>
                      </TableCell>
                      <TableCell>
                        <FormikTextField
                          name="name"
                          placeholder="e.g., Med Student 20% Discount"
                          size="small"
                          sx={{ my: 2 }}
                          label="Edit Description"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Divider sx={{ my: 4 }}>Other Details</Divider>
            <Box display="flex" justifyContent={'flex-start'} gap={10} mb={10}>
              <Box sx={{ width: '100%' }}>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th">
                          {promocode.amount_off ? 'Amount Off' : 'Percent Off'}
                        </TableCell>
                        <TableCell>
                          {promocode.amount_off
                            ? `$${(promocode.amount_off / 100).toFixed(2)}`
                            : `${promocode.percent_off}%`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th">Duration</TableCell>
                        <TableCell>
                          {promocode.duration_in_months
                            ? `repeating - ${promocode.duration_in_months} months`
                            : promocode.duration}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th">Times Redemeed</TableCell>
                        <TableCell>
                          <Typography>
                            {promocode.max_redemptions
                              ? `${promocode.times_redeemed}/${promocode.max_redemptions}`
                              : promocode.times_redeemed}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th">Max Redemptions</TableCell>
                        <TableCell>
                          <FormikTextField
                            name="max_redemptions"
                            label="Edit max redemptions"
                            size="small"
                            type="number"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th">Redeem by</TableCell>
                        <TableCell>
                          {/* <Typography>
                            {promocode.redeem_by
                              ? dayjs(promocode.redeem_by).format(
                                  'MM/DD/YYYY HH:mm:ss A'
                                )
                              : 'No Date limit'}
                          </Typography> */}
                          <FormikDatePicker
                            name="redeem_by"
                            label="Edit redeem by date"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th">Redeem URL</TableCell>
                        {!isServer && (
                          <TableCell>
                            {`${location.origin}/account/subscription?code=${promocode.code}`}
                            <Box>
                              <Typography
                                variant="caption"
                                color="success.main"
                              >
                                Share this link to users for easy input/redeems
                              </Typography>
                            </Box>
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User Types </TableCell>
                      <TableCell>Monthly</TableCell>
                      <TableCell>Yearly</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {promocode.applies_to?.length ? (
                      <>
                        {userTypes
                          .map(({ type, _id }) => {
                            const applies_to = promocode.applies_to
                            const prod_month = `prod_${snakeCase(type)}_month`
                            const prod_year = `prod_${snakeCase(type)}_year`
                            const includesMonthly =
                              applies_to.includes(prod_month)
                            const includesYearly =
                              applies_to.includes(prod_year)
                            if (!includesMonthly && !includesYearly) return null
                            return (
                              <StyledTableRow key={_id}>
                                <TableCell>{type}</TableCell>
                                <TableCell>
                                  {includesMonthly ? (
                                    <Typography
                                      color="secondary.main"
                                      variant="body2"
                                    >
                                      Yes
                                    </Typography>
                                  ) : (
                                    'No'
                                  )}
                                </TableCell>
                                <TableCell>
                                  {includesYearly ? (
                                    <Typography
                                      color="secondary.main"
                                      variant="body2"
                                    >
                                      Yes
                                    </Typography>
                                  ) : (
                                    'No'
                                  )}
                                </TableCell>
                              </StyledTableRow>
                            )
                          })
                          .filter((x) => x)}
                      </>
                    ) : (
                      <TableRow>
                        <TableCell>All Products</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              my={2}
              gap={2}
              display="flex"
              position="fixed"
              bgcolor="#fff"
              sx={{ right: 16, bottom: 16 }}
            >
              <LoadingButton
                type="button"
                variant="outlined"
                color="error"
                onClick={() => {
                  const result = confirm(
                    'Are you sure to delete this promocode?'
                  )
                  if (result) {
                    deletePromocode({
                      variables: {
                        id: promocode._id
                      }
                    })
                  }
                }}
                loading={deleting}
              >
                Delete Promocode
              </LoadingButton>
              <LoadingButton
                disabled={isSubmitting || !isValid || !dirty}
                type="submit"
                variant="contained"
                color="secondary"
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Box>
          </Box>
        )
      }}
    </Formik>
  )
}
export default StripePromoCodeDetails
