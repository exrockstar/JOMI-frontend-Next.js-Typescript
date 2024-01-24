import {
  GetPromoCodeDetailQuery,
  useAddPromoCodeMutation,
  useEditPromoCodeMutation,
  useDeletePromoCodeMutation
} from 'graphql/cms-queries/promocode-list.generated'
import { Form, Formik, useFormikContext } from 'formik'
import { Button, MenuItem, Stack, Typography, Box } from '@mui/material'

import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikDatePicker from 'components/common/formik/FormikDatePicker'
import FormikSelect from 'components/common/formik/FormkSelect'
import GenerateCodeButton from 'components/cms/promocodes-list/GenerateCodeButton'
import { OrderInterval, PromoCodeType } from 'graphql/types'
import { LoadingButton } from '@mui/lab'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'

const orderIntervals = Object.values(OrderInterval).filter(
  (v) => v !== OrderInterval.NotApplicable
)
type Prop = {
  promocode: GetPromoCodeDetailQuery['getPromoDetail']
  editMode?: boolean
  subscription?: boolean
}

const schema = yup.object({
  code: yup.string().required('Code is required.'),
  title: yup.string().required('Title is required.'),
  price: yup
    .number()
    .integer('Please use whole dollars')
    .typeError('Price value is invalid')
    .min(0, 'Price value is invalid'),
  expiration: yup.string().required('Expiration Date is required.'),
  days: yup.number().when('isSubscription', {
    is: false,
    then: yup
      .number()
      .required('Number is required')
      .integer('Number is invalid')
      .typeError('Number is invalid')
      .min(0, 'Number is invalid')
  }),
  times_redeemed: yup
    .number()
    .required('Number is required')
    .integer('Please use whole dollars')
    .typeError('Price value is invalid')
    .min(0, 'Number is invalid'),
  numberOfCodes: yup
    .number()
    .when('isSubscription', {
      is: false,
      then: yup
        .number()
        .required('Number is required')
        .integer('Number is invalid')
    })
    .typeError('Number is invalid')
    .min(1, 'Number is invalid')
})

const PromoCodeForm = ({ promocode, editMode, subscription }: Prop) => {
  const { enqueueSnackbar } = useSnackbar()

  const [addPromoCode] = useAddPromoCodeMutation({
    onCompleted() {
      enqueueSnackbar('Successfully added', { variant: 'success' })
      router.back()
    },
    onError(error) {
      enqueueSnackbar(`Error ${error.message}`, { variant: 'error' })
    }
  })

  const [editPromoCode] = useEditPromoCodeMutation({
    onCompleted() {
      enqueueSnackbar('Successfully updated', { variant: 'success' })
      router.back()
    },
    onError(error) {
      enqueueSnackbar(`Error ${error.message}`, { variant: 'error' })
    }
  })

  const [deletePromoCode] = useDeletePromoCodeMutation({
    onCompleted() {
      enqueueSnackbar('Successfully deleted', { variant: 'success' })
      router.back()
    },
    onError(error) {
      enqueueSnackbar(`Error ${error.message}`, { variant: 'error' })
    }
  })
  // const [updateOrder, { loading }] = ({
  //   onCompleted() {
  //     enqueueSnackbar('Successfully updated ' + order._id, {
  //       variant: 'success'
  //     })
  //     router.reload()
  //   },
  //   onError(error) {
  //     enqueueSnackbar(`Error ${error.message}`, {
  //       variant: 'error'
  //     })
  //   }
  // })
  const router = useRouter()

  if (!editMode) {
    promocode = {
      ...promocode,
      expiration:
        promocode?.expiration ?? dayjs(Date.now()).format('MM/DD/YYYY'),
      title: promocode?.title ?? 'Title',
      interval: promocode?.interval ?? OrderInterval.Day
    }
  }

  return (
    <Formik
      initialValues={{
        ...promocode,
        isSubscription: subscription,
        numberOfCodes: 10,
        code: promocode?._id
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        if (!editMode) {
          const _id = values?.code
          const input = {
            ...values,
            _id,
            interval: values?.interval ?? OrderInterval.Day,
            type: values?.type ?? PromoCodeType.Individual
          }
          delete input.code
          addPromoCode({
            variables: {
              input
            }
          })
        } else {
          editPromoCode({
            variables: {
              input: {
                _id: values?._id,
                title: values?.title,
                isSubscription: subscription,
                expiration: values?.expiration,
                days: values?.days,
                notes: values?.notes,
                price: values?.price,
                interval: values?.interval ?? OrderInterval.Day,
                type: values?.type ?? PromoCodeType.Individual,
                times_redeemed: values?.times_redeemed
              }
            }
          })
        }
      }}
    >
      {
        // (handle)
      }
      <Form>
        <Stack spacing={3}>
          {/* {subscription == false && <UserDetailInstitutionSelector />} */}
          <Box sx={{ width: '100%' }}>
            <Stack
              width={'100%'}
              direction="row"
              alignItems={'flex-start'}
              gap={2}
            >
              <FormikTextField
                name="code"
                size="small"
                placeholder="Code to be entered by the user. ABCD1234"
                disabled={editMode}
              ></FormikTextField>
              <GenerateCodeButton
                sx={{ display: editMode ? 'none' : 'block' }}
              />
            </Stack>
          </Box>
          <FormikTextField name="title" label="Title" size="small" />
          <FormikTextField
            type="number"
            name="price"
            label={subscription ? 'Subscription Price' : 'Price'}
            size="small"
          />
          {editMode && (
            <FormikDatePicker name="created" label="Create Date" disabled />
          )}
          <FormikDatePicker name="expiration" label="Expiration Date" />
          {subscription && (
            <FormikSelect
              name="interval"
              label="Subscription interval"
              size="small"
              id="order-interval"
            >
              {orderIntervals.map((val) => (
                <MenuItem value={val} key={val}>
                  {val}
                </MenuItem>
              ))}
            </FormikSelect>
          )}
          {subscription == false && (
            <FormikTextField
              type="number"
              name="days"
              label="Days Usage lasts"
              size="small"
            />
          )}
          <FormikTextField
            type="number"
            name="times_redeemed"
            label="Redeem limit"
            size="small"
          />
          <FormikTextField
            name="notes"
            label="Notes"
            size="small"
            rows={6}
            multiline
          />
          {!editMode && subscription == false && (
            <FormikTextField
              type="number"
              name="numberOfCodes"
              label="Generate Multiple Codes"
              size="small"
            />
          )}

          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              <Button variant="contained" sx={{ width: '120px' }} type="submit">
                Save
              </Button>
              <LoadingButton
                variant="outlined"
                sx={{ width: '120px' }}
                onClick={() => {
                  router.back()
                }}
              >
                Cancel
              </LoadingButton>
            </Stack>
            {editMode && (
              <Button
                variant="contained"
                color="error"
                sx={{ width: '120px' }}
                onClick={() => {
                  deletePromoCode({ variables: { code: promocode._id } })
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Stack>
      </Form>
    </Formik>
  )
}

export default PromoCodeForm
