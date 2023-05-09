import { DateTimePicker } from '@mui/lab'
import {
  Box,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
  FormControlLabel,
  Alert
} from '@mui/material'
import FormikDateTimePicker from 'components/common/formik/FormikDateTimePicker'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikSelect from 'components/common/formik/FormkSelect'
import { Form, Formik, FormikHelpers } from 'formik'
import {
  OrderByIdQuery,
  useUpdateOrderByUserMutation
} from 'graphql/cms-queries/order-list.generated'

import {
  OrderCurrency,
  OrderInputForUser,
  OrderInterval,
  OrderPaymentStatus,
  OrderStatus,
  OrderType,
  RequireLogin
} from 'graphql/types'
import { useSnackbar } from 'notistack'
import { boolean, date, number, object, string, TypeOf } from 'yup'
import SubmitOrderButton from './SubmitOrderButton'
import Link from 'next/link'
import OrderActions from './OrderActions'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import { useRouter } from 'next/router'
import { Info } from '@mui/icons-material'

type Props = {
  order: OrderByIdQuery['orderById']
}

const schema = object({
  description: string().required(),
  start: date().required('Start date is required'),
  end: date().required('End date is required'),
  type: string().oneOf(Object.values(OrderType)),
  plan_interval: string().required().oneOf(Object.values(OrderInterval)),
  amount: number().required().typeError('Invalid amount'),
  currency: string().oneOf(Object.values(OrderCurrency)),
  payment_status: string().oneOf(Object.values(OrderPaymentStatus)),
  status: string().oneOf(Object.values(OrderStatus)),
  require_login: string().oneOf(Object.values(RequireLogin)),
  user_id: string().required(),
  isCanceled: boolean().optional()
})

const OrderForm = ({ order }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [updateOrder, { loading }] = useUpdateOrderByUserMutation({
    onCompleted() {
      enqueueSnackbar('Successfully updated ' + order._id, {
        variant: 'success'
      })
      router.reload()
    },
    onError(error) {
      enqueueSnackbar(`Error ${error.message}`, {
        variant: 'error'
      })
    }
  })

  const initialValues: OrderInputForUser = {
    description: order.description,
    start: order.start,
    end: order.end,
    type: order.type,
    plan_interval: order.plan_interval,
    amount: order.amount,
    currency: order.currency,
    payment_status: order.payment_status,
    status: order.status,
    require_login: order.require_login,
    user_id: order.user_id,
    isCanceled: !!order.isCanceled
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(
        values: OrderInputForUser,
        formikHelpers: FormikHelpers<{}>
      ) => {
        console.log('submitting', values)
        updateOrder({
          variables: {
            id: order._id,
            input: {
              ...values,
              amount: parseFloat(values.amount.toString())
            }
          }
        })
      }}
    >
      <>
        <Form>
          <Box position="relative">
            <Grid container my={2} spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <Stack spacing={2}>
                  <FormikTextField
                    name="description"
                    label="Description"
                    size="small"
                    helperText="Description the user will see on his account"
                  />
                  <FormikDateTimePicker name="start" label="Start Date" />
                  <FormikDateTimePicker name="end" label="End Date" />
                  <FormikTextField
                    name="amount"
                    label="Amount"
                    size="small"
                    type="number"
                    helperText="The order amount as a whole number"
                  />
                  <FormikSelect
                    name="type"
                    id="order-type"
                    label="Order Type"
                    size="small"
                  >
                    <MenuItem value={OrderType.Standard}>Standard</MenuItem>
                    <MenuItem value={OrderType.Trial}>Trial</MenuItem>
                    <MenuItem value={OrderType.Default}>Default</MenuItem>
                    <MenuItem value={OrderType.Individual}>Individual</MenuItem>
                    <MenuItem value={OrderType.StandardStripe}>
                      Standard-Stripe
                    </MenuItem>
                  </FormikSelect>
                  <FormikSelect
                    name="plan_interval"
                    id="order-type"
                    label="Interval"
                    size="small"
                  >
                    <MenuItem value={OrderInterval.Day}>Day</MenuItem>
                    <MenuItem value={OrderInterval.Week}>Week</MenuItem>
                    <MenuItem value={OrderInterval.Month}>Month</MenuItem>
                    <MenuItem value={OrderInterval.Year}>Year</MenuItem>
                  </FormikSelect>
                  <FormikSelect
                    name="currency"
                    id="currency"
                    label="Currency"
                    size="small"
                    defaultValue={OrderCurrency.Usd}
                  >
                    {Object.values(OrderCurrency).map((curr) => {
                      return (
                        <MenuItem value={curr} key={curr}>
                          {curr}
                        </MenuItem>
                      )
                    })}
                  </FormikSelect>
                  <FormikSelect
                    name="payment_status"
                    id="payment-status"
                    label="Payment Status"
                    size="small"
                    defaultValue={OrderPaymentStatus.Processing}
                  >
                    {Object.values(OrderPaymentStatus).map((val) => {
                      return (
                        <MenuItem value={val} key={val}>
                          {val}
                        </MenuItem>
                      )
                    })}
                  </FormikSelect>

                  <FormikSelect
                    name="status"
                    id="status"
                    label="Status"
                    size="small"
                    defaultValue={OrderStatus.Incomplete}
                  >
                    {Object.values(OrderStatus).map((val) => {
                      return (
                        <MenuItem value={val} key={val}>
                          {val}
                        </MenuItem>
                      )
                    })}
                  </FormikSelect>
                  <FormControlLabel
                    control={<FormikCheckbox size="small" name="isCanceled" />}
                    label={
                      <Typography variant="body2" color="text.secondary">
                        Cancel on period end
                      </Typography>
                    }
                  />
                  <Alert severity="info">
                    Checking <b>Cancel on period</b> end will unsubscribe the
                    stripe subscription if any.
                  </Alert>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Stack spacing={2}>
                  <div>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      Institution ID
                    </Typography>
                    {order.institution ? (
                      <Link
                        href={`/cms/institutions-list/${order.institution}`}
                        passHref
                        legacyBehavior
                      >
                        <MuiLink>{order.institution}</MuiLink>
                      </Link>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        N/A
                      </Typography>
                    )}
                  </div>
                  {order.user_id ? (
                    <div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        User ID
                      </Typography>
                      <Link
                        href={`/cms/user/${order.user_id}`}
                        passHref
                        legacyBehavior
                      >
                        <MuiLink variant="body2">{order.user_id}</MuiLink>
                      </Link>
                    </div>
                  ) : null}

                  <TextField
                    value={order.promoCode ?? 'N/A'}
                    label="Promo code"
                    size="small"
                    disabled
                  />
                  {order.plan_id ? (
                    <div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        Stripe ID
                      </Typography>
                      <MuiLink
                        href={`https://dashboard.stripe.com/subscriptions/${order.plan_id}`}
                        variant="body2"
                        target="_blank"
                      >
                        {order.plan_id}
                      </MuiLink>
                    </div>
                  ) : null}
                  <div>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      Latest Stripe Invoice
                    </Typography>
                    <MuiLink
                      href={`https://dashboard.stripe.com/invoices/${order.latest_invoice}`}
                      target="_blank"
                      variant="body2"
                    >
                      {order.latest_invoice}
                    </MuiLink>
                  </div>

                  <TextField
                    value={order.renewals ?? ''}
                    label="Renewals"
                    size="small"
                    helperText="Amount of times subscription has renewed"
                    disabled
                  />

                  <DateTimePicker
                    value={order.created}
                    renderInput={(params) => (
                      <TextField {...params} size="small" label="Created" />
                    )}
                    disabled
                    onChange={() => {}}
                  />
                  <DateTimePicker
                    value={order.updated}
                    renderInput={(params) => (
                      <TextField {...params} size="small" label="Updated" />
                    )}
                    disabled
                    onChange={() => {}}
                  />
                  <div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight="bold"
                    >
                      Created By:
                    </Typography>
                    <Link
                      href={`/cms/user/${order.createdBy}`}
                      passHref
                      legacyBehavior
                    >
                      <MuiLink variant="body2">{order.createdBy}</MuiLink>
                    </Link>
                  </div>
                  <div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight="bold"
                    >
                      Last edited By:
                    </Typography>
                    <Link
                      href={`/cms/user/${order.lastEditedBy}`}
                      passHref
                      legacyBehavior
                    >
                      <MuiLink variant="body2">{order.lastEditedBy}</MuiLink>
                    </Link>
                  </div>
                </Stack>
              </Grid>
              <Grid item>
                <OrderActions _id={order._id} user_id={order.user_id} />
              </Grid>
            </Grid>
          </Box>
        </Form>
        <SubmitOrderButton loading={loading} />
      </>
    </Formik>
  )
}

export default OrderForm
