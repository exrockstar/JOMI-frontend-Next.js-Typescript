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
  UpdateOrderInput,
  OrderInterval,
  OrderPaymentStatus,
  OrderStatus,
  OrderType,
  RequireLogin
} from 'graphql/types'
import { useSnackbar } from 'notistack'
import yup, { boolean, date, number, object, string, TypeOf } from 'yup'
import SubmitOrderButton from './SubmitOrderButton'
import Link from 'next/link'
import OrderActions from './OrderActions'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import { useRouter } from 'next/router'
import OrderFormErrors from './OrderFormErrors'
import dayjs from 'dayjs'
import UserTypeSelector from '../institution-details/Orders/UserTypeSelector'
import SpecialtySelector from '../institution-details/Orders/SpecialtySelector'

type Props = {
  order: OrderByIdQuery['orderById']
}

const schema = object({
  description: string().optional(),
  start: date().when('type', {
    is: OrderType.PurchaseArticle,
    then: date().optional().nullable(),
    otherwise: date().required('Start date is required')
  }),
  end: date().when('type', {
    is: OrderType.PurchaseArticle,
    then: date().optional().nullable(),
    otherwise: date().required('Start date is required')
  }),
  type: string().oneOf(Object.values(OrderType)),
  plan_interval: string()
    .optional()
    .nullable()
    .oneOf(Object.values(OrderInterval).concat(null)),
  amount: number().required().typeError('Invalid amount'),

  currency: string()
    .required('Currency is a required field.')
    .nullable()
    .oneOf(Object.values(OrderCurrency)),
  payment_status: string()
    .required('Payment status is a required field.')
    .nullable()
    .oneOf(Object.values(OrderPaymentStatus)),
  status: string()
    .required('Status is a required field.')
    .nullable()
    .oneOf(Object.values(OrderStatus)),
  require_login: string().oneOf(Object.values(RequireLogin)),
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

  const initialValues: UpdateOrderInput = {
    description: order.description,
    start: order.start,
    end: order.end,
    type: order.type,
    plan_interval: order.plan_interval,
    amount: order.amount,
    promoCode: order.promoCode,
    currency: order.currency,
    payment_status: order.payment_status,
    status: order.status,
    require_login: order.require_login,
    user_id: order.user_id,
    institution: order.institution,
    articleId: order.articleId,
    restricted_specialties: order.restricted_specialties,
    restricted_user_types: order.restricted_user_types,
    isCanceled: !!order.isCanceled,
    notes: order.notes
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values: UpdateOrderInput) => {
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
        <OrderFormErrors></OrderFormErrors>
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
                    {Object.values(OrderType).map((val) => (
                      <MenuItem value={val} key={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </FormikSelect>
                  <FormikSelect
                    name="plan_interval"
                    id="order-type"
                    label="Interval"
                    size="small"
                    defaultValue={OrderInterval.NotApplicable}
                  >
                    <MenuItem value={OrderInterval.NotApplicable}>N/A</MenuItem>
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
                  >
                    {Object.values(OrderStatus).map((val) => {
                      return (
                        <MenuItem value={val} key={val}>
                          {val}
                        </MenuItem>
                      )
                    })}
                  </FormikSelect>
                  {order.plan_id && (
                    <div>
                      <FormControlLabel
                        control={
                          <FormikCheckbox
                            size="small"
                            name="isCanceled"
                            disabled={dayjs().isAfter(order.end)}
                          />
                        }
                        label={
                          <Typography variant="body2" color="text.secondary">
                            Cancel on period end
                          </Typography>
                        }
                      />
                      <Alert severity="info">
                        Checking <b>Cancel on period</b> end will unsubscribe
                        the stripe subscription if any.
                      </Alert>
                    </div>
                  )}
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
                      Institution
                    </Typography>
                    {order.institutionObject ? (
                      <MuiLink
                        href={`/cms/institutions-list/${order.institutionObject._id}`}
                        component={Link}
                      >
                        {order.institutionObject?.name}
                      </MuiLink>
                    ) : order.institution ? (
                      <Typography variant="body2" color="text.secondary">
                        {order.institution}
                      </Typography>
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
                      <MuiLink
                        variant="body2"
                        href={`/cms/user/${order.user_id}`}
                        component={Link}
                      >
                        {order.user_id}
                      </MuiLink>
                    </div>
                  ) : null}
                  {order.articleId ? (
                    <div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        Article ID
                      </Typography>
                      {order.articleId}
                    </div>
                  ) : null}

                  <FormikTextField
                    name="promoCode"
                    label="Promo code"
                    size="small"
                  />

                  {order.plan_id ? (
                    <div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        Stripe Subscription ID
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
                  {!!order.latest_invoice && (
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
                  )}

                  {!!order.latest_invoice && (
                    <TextField
                      value={order.renewals ?? ''}
                      label="Renewals"
                      size="small"
                      helperText="Amount of times subscription has renewed"
                      disabled
                    />
                  )}

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
                  {order.institution && order.type !== OrderType.Individual && (
                    <>
                      <FormikSelect
                        name="require_login"
                        id="require-login"
                        label="Require Login"
                        size="small"
                      >
                        <MenuItem value={RequireLogin.True}>True</MenuItem>
                        <MenuItem value={RequireLogin.False}>False</MenuItem>
                      </FormikSelect>
                      <UserTypeSelector />
                      <SpecialtySelector />
                    </>
                  )}
                  <FormikTextField
                    label="Internal Notes"
                    name="notes"
                    rows={4}
                    multiline
                  />
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
