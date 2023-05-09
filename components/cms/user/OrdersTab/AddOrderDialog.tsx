import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  Divider,
  Button,
  MenuItem
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik, useFormikContext } from 'formik'
import React from 'react'
import { Close, Refresh } from '@mui/icons-material'
import {
  OrderCurrency,
  OrderInputForUser,
  OrderInterval,
  OrderPaymentStatus,
  OrderStatus,
  OrderType,
  RequireLogin
} from 'graphql/types'
import FormikSelect from 'components/common/formik/FormkSelect'
import dayjs from 'dayjs'
import { date, object, string, number } from 'yup'
import FormikDateTimePicker from 'components/common/formik/FormikDateTimePicker'
import { useCreateOrderForUserMutation } from 'graphql/cms-queries/order-management.generated'
import { useSnackbar } from 'notistack'
import { useOrdersByUserIdLazyQuery } from 'graphql/cms-queries/order-list.generated'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'

type Props = { user_id: string } & DialogProps

const schema = object({
  description: string().required(),
  start: date().required(),
  end: date().required(),
  amount: number().required()
})

const AddOrderDialog = ({ user_id, ...props }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [, { updateQuery }] = useOrdersByUserIdLazyQuery({
    variables: {
      user_id
    }
  })
  const [addOrderForUser, { loading }] = useCreateOrderForUserMutation({
    onCompleted(result) {
      enqueueSnackbar('Successfully added order for user!', {
        variant: 'success'
      })

      updateQuery((data) => {
        const updated = [...data.ordersByUserId, result.order]
        return {
          ...data,
          ordersByUserId: updated
        }
      })
      router.reload()
      props.onClose({}, 'backdropClick')
    },
    onError(error) {
      enqueueSnackbar(`Failed to add order: ${error.message}`, {
        variant: 'error'
      })
    }
  })

  const defaultValues: OrderInputForUser = {
    description: '',
    start: dayjs(),
    end: dayjs(),
    type: OrderType.Individual,
    currency: OrderCurrency.Usd,
    amount: 0,
    require_login: RequireLogin.True,
    user_id: user_id,
    plan_interval: OrderInterval.Month,
    payment_status: OrderPaymentStatus.Processing,
    status: OrderStatus.Active
  }

  const handleSubmit = (values: OrderInputForUser) => {
    addOrderForUser({
      variables: {
        input: values
      }
    })
  }

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Dialog {...props}>
        <Form>
          <DialogTitle>Create new order</DialogTitle>
          <Divider />
          <DialogContent sx={{ width: { sm: '100%', md: 600 } }}>
            <Stack spacing={1.5}>
              <FormikTextField
                name="description"
                label="Description *"
                helperText="The client-facing value"
                size="small"
              />

              <FormikDateTimePicker
                name="start"
                label="Start date *"
              ></FormikDateTimePicker>

              <FormikDateTimePicker
                name="end"
                label="End date"
              ></FormikDateTimePicker>

              <FormikTextField
                name="type"
                label="Type *"
                defaultValue={OrderType.Individual}
                disabled
                size="small"
              />

              <FormikTextField
                name="currency"
                label="Currency *"
                defaultValue="USD"
                size="small"
                disabled
              ></FormikTextField>

              <FormikTextField
                name="amount"
                label="Amount *"
                defaultValue={0}
                type="number"
                size="small"
              ></FormikTextField>

              <FormikSelect
                name="require_login"
                defaultValue={RequireLogin.True}
                id={'require_login'}
                label="Require login *"
                size="small"
              >
                <MenuItem value={RequireLogin.True}>TRUE</MenuItem>
                <MenuItem value={RequireLogin.False}>FALSE</MenuItem>
              </FormikSelect>

              <FormikSelect
                name="plan_interval"
                id={'plan_interval'}
                label="Plan interval *"
                size="small"
              >
                <MenuItem value={OrderInterval.Day}>Day</MenuItem>
                <MenuItem value={OrderInterval.Week}>Week</MenuItem>
                <MenuItem value={OrderInterval.Month}>Month</MenuItem>
                <MenuItem value={OrderInterval.Year}>Year</MenuItem>
              </FormikSelect>

              <FormikSelect
                name="payment_status"
                id={'payment_status'}
                label="Payment Status *"
                size="small"
              >
                <MenuItem value={OrderPaymentStatus.Processing}>
                  Processing
                </MenuItem>
                <MenuItem value={OrderPaymentStatus.Succeeded}>
                  Succeeded
                </MenuItem>
                <MenuItem value={OrderPaymentStatus.AmountCapturableUpdated}>
                  Amount Capturable Updated
                </MenuItem>
                <MenuItem value={OrderPaymentStatus.PaymentFailed}>
                  Payment Failed
                </MenuItem>
                <MenuItem value={OrderPaymentStatus.Unpaid}>Unpaid</MenuItem>
              </FormikSelect>

              <FormikSelect
                name="status"
                id={'status'}
                label="Order Status *"
                size="small"
              >
                <MenuItem value={OrderStatus.Active}>Active</MenuItem>
                <MenuItem value={OrderStatus.PastDue}>Past Due</MenuItem>
                <MenuItem value={OrderStatus.Unpaid}>Unpaid</MenuItem>
                <MenuItem value={OrderStatus.Canceled}>Canceled</MenuItem>
                <MenuItem value={OrderStatus.Incomplete}>Incomplete</MenuItem>
                <MenuItem value={OrderStatus.IncompleteExpired}>
                  Incomplete Expired
                </MenuItem>
                <MenuItem value={OrderStatus.Trialing}>Trialing</MenuItem>
              </FormikSelect>

              <FormikTextField
                name="user_id"
                label="User ID"
                helperText="The ID of the user who this order will be attached to."
                size="small"
                disabled
              ></FormikTextField>
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <ResetValuesButton />
            <Button
              color="error"
              startIcon={<Close />}
              variant="contained"
              onClick={(e) => props.onClose(e, 'backdropClick')}
            >
              Cancel
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={loading}
            >
              Save order
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

const ResetValuesButton = () => {
  const { resetForm } = useFormikContext()
  return (
    <Button
      variant="outlined"
      startIcon={<Refresh />}
      onClick={() => resetForm()}
    >
      Reset values
    </Button>
  )
}

export default AddOrderDialog
