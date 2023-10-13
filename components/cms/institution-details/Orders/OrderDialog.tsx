import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
  Button,
  MenuItem
} from '@mui/material'
import FormikDatePicker from 'components/common/formik/FormikDatePicker'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikSelect from 'components/common/formik/FormkSelect'
import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import { InstitutionByIdDocument } from 'graphql/cms-queries/institutions-list.generated'
import {
  LocationPartsFragment,
  LocationPartsFragmentDoc
} from 'graphql/cms-queries/LocationParts.generated'
import {
  useCreateOrderMutation,
  useUpdateOrderMutation
} from 'graphql/cms-queries/order-management.generated'
import { OrderPartsFragmentDoc } from 'graphql/cms-queries/OrderParts.generated'
import {
  Order,
  OrderCurrency,
  OrderInputForLocation,
  OrderType,
  RequireLogin
} from 'graphql/types'
import { useSnackbar } from 'notistack'
import { object, number, string, date } from 'yup'
import SpecialtySelector from './SpecialtySelector'
import UserTypeSelector from './UserTypeSelector'

type Props = {
  mode: 'add' | 'edit'
  dialogTitle: string
  order: Order
  locationId: string
  institutionId: string
} & DialogProps

const defaultValue: OrderInputForLocation = {
  amount: 0,
  location: '',
  institution: '',
  currency: OrderCurrency.Usd,
  type: OrderType.Trial,
  start: new Date(),
  end: new Date(),
  require_login: RequireLogin.True,
  description: '',
  restricted_user_types: [],
  restricted_specialties: [],
  notes: ''
}

const schema = object({
  amount: number().optional().typeError('Invalid amount'),
  location: string().required(),
  currency: string().oneOf(Object.values(OrderCurrency)),
  type: string().oneOf(Object.values(OrderType)),
  start: date().required('Start date is required'),
  end: date().required('End date is required'),
  RequireLogin: string().oneOf(Object.values(RequireLogin)),
  description: string().optional()
})

const OrderDialog = ({
  mode,
  dialogTitle,
  order,
  locationId,
  institutionId,
  ...props
}: Props) => {
  const initalValue: OrderInputForLocation = {
    amount: order?.amount ?? defaultValue.amount,
    currency: order?.currency ?? defaultValue.currency,
    description: order?.description ?? defaultValue.description,
    end: order?.end ?? defaultValue.end,
    start: order?.start ?? defaultValue.start,
    type: order?.type ?? defaultValue.type,
    require_login: order?.require_login ?? defaultValue.require_login,
    institution: institutionId,
    location: locationId,
    restricted_user_types:
      order?.restricted_user_types ?? defaultValue.restricted_user_types,
    restricted_specialties:
      order?.restricted_specialties ?? defaultValue.restricted_specialties,
    notes: order?.notes ?? defaultValue.notes
  }

  const { enqueueSnackbar } = useSnackbar()
  const fragmentQuery = {
    fragment: LocationPartsFragmentDoc,
    fragmentName: 'LocationParts',
    id: 'Location:' + locationId
  }

  const [createOrder, { client, loading: creatingOrder }] =
    useCreateOrderMutation({
      onCompleted(result) {
        const order = result.order

        client.cache.updateFragment(
          fragmentQuery,
          (data: LocationPartsFragment) => {
            return {
              ...data,
              orders: [order, ...data.orders]
            }
          }
        )
        enqueueSnackbar('Successfully created order!', { variant: 'success' })
        props.onClose({}, 'backdropClick')
      },
      onError(error) {
        enqueueSnackbar(`Failed to created order ${error.message}`, {
          variant: 'error'
        })
        props.onClose({}, 'backdropClick')
      },
      refetchQueries: [
        { query: InstitutionByIdDocument, variables: { id: institutionId } }
      ]
    })

  const [updateOrder, { loading: editingOrder }] = useUpdateOrderMutation({
    onCompleted(result) {
      client.cache.updateFragment(
        {
          fragment: OrderPartsFragmentDoc,
          id: 'Order:' + order._id
        },
        () => result.order
      )

      enqueueSnackbar('Successfully updated order!', { variant: 'success' })
      props.onClose({}, 'backdropClick')
    },
    onError(error) {
      enqueueSnackbar(`Failed to update order: ${error.message}`, {
        variant: 'error'
      })
      props.onClose({}, 'backdropClick')
    },
    refetchQueries: [
      { query: InstitutionByIdDocument, variables: { id: institutionId } }
    ]
  })

  const handleSubmit = async (values: any) => {
    console.log('submitting', values)
    if (mode === 'add') {
      await createOrder({
        variables: {
          input: {
            ...values,
            amount: parseFloat(values.amount)
          }
        }
      })
    } else {
      await updateOrder({
        variables: {
          id: order._id,
          input: {
            ...values,
            amount: parseFloat(values.amount)
          }
        }
      })
    }

    try {
      await fetch('/api/revalidate?path=/subscribers')
      enqueueSnackbar(`Successfully updated subscribers page.`, {
        variant: 'success'
      })
    } catch (e) {
      enqueueSnackbar(`Couldn't update subscribers page: ${e.message}`, {
        variant: 'error'
      })
    }
  }
  return (
    <Formik
      initialValues={initalValue}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ isValid }) => {
        return (
          <Dialog {...props} maxWidth="md">
            <Form>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <Divider />
              <DialogContent>
                <Stack spacing={2} width={{ xs: '100%', md: 480 }}>
                  <FormikDatePicker name="start" label="Start Date" />
                  <FormikDatePicker name="end" label="End Date" />
                  <FormikTextField name="amount" label="Amount" size="small" />
                  <FormikSelect
                    name="type"
                    id="order-type"
                    label="Order Type"
                    size="small"
                  >
                    <MenuItem value={OrderType.Standard}>Standard</MenuItem>
                    <MenuItem value={OrderType.Trial}>Trial</MenuItem>
                  </FormikSelect>
                  <FormikSelect
                    name="require_login"
                    id="require-login"
                    label="Require Login"
                    size="small"
                  >
                    <MenuItem value={RequireLogin.True}>True</MenuItem>
                    <MenuItem value={RequireLogin.False}>False</MenuItem>
                  </FormikSelect>
                  <FormikTextField
                    name="notes"
                    label="Notes"
                    helperText="Interal notes for order"
                    multiline
                    rows={3}
                    size="small"
                    sx={{ '& .MuiFormHelperText-root': { marginLeft: 0 } }}
                  />
                  <UserTypeSelector />
                  <SpecialtySelector />
                </Stack>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 3 }}>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={(e) => props.onClose(e, 'backdropClick')}
                >
                  Cancel
                </Button>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  loading={creatingOrder || editingOrder}
                  disabled={!isValid}
                >
                  Submit
                </LoadingButton>
              </DialogActions>
            </Form>
          </Dialog>
        )
      }}
    </Formik>
  )
}

export default OrderDialog
