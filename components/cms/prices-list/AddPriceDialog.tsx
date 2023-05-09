import { Add } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  Typography
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikSelect from 'components/common/formik/FormkSelect'
import { Form, Formik } from 'formik'
import { useCreateGeographicPriceMutation } from 'graphql/cms-queries/price-management.generated'
import { usePricesListQuery } from 'graphql/cms-queries/prices-list.generated'
import { CountryEnum } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React from 'react'
import { object, string, number, array, TypeOf } from 'yup'
import CountrySelector from './CountrySelector'
import { usePricesListControls } from './usePricesListControls'

type Props = {} & DialogProps

const schema = object({
  product_id: string().required('Please select a product id'), //user type .e.g., prod_surgical_tech, prod_other , etc.,
  countryCode: string().required('Country code is required'),

  amountYearly: number().optional(),
  amountMonthly: number().optional(),
  percentageFromDefaultPrice: number().optional().min(0).max(100)
})

const AddPriceDialog = ({ ...props }: Props) => {
  const { data: session } = useSession()
  const {
    data,
    updateQuery: updatePricesQuery,
    refetch
  } = usePricesListQuery({
    skip: !session?.user
  })
  const { enqueueSnackbar } = useSnackbar()
  const [createPrice, { loading: creatingPrice }] =
    useCreateGeographicPriceMutation({
      onCompleted(result) {
        updatePricesQuery((prev) => {
          return {
            prices: [...prev.prices, ...result.createGeographicPrice]
          }
        })
        enqueueSnackbar(`Successfully added prices!`, {
          variant: 'success'
        })
        props.onClose({}, 'backdropClick')
        refetch()
      },
      onError(error) {
        enqueueSnackbar(`Failed to create price: ${error.message}`, {
          variant: 'error'
        })
      }
    })
  const handleSubmit = (values: TypeOf<typeof schema>) => {
    console.log(`submtting`, values)
    createPrice({
      variables: {
        input: {
          amountMonthly: values.amountMonthly * 100,
          amountYearly: values.amountYearly * 100,
          countryCode: values.countryCode as CountryEnum,
          product_id: values.product_id,
          percentageFromDefaultPrice: values.percentageFromDefaultPrice
            ? values.percentageFromDefaultPrice
            : null
        }
      }
    })
  }

  const products_ids_set = new Set(
    data?.prices?.map((price) => price.product) ?? []
  )
  const product_ids = Array.from(products_ids_set)
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        product_id: '',
        countryCode: '',
        amountYearly: 0,
        amountMonthly: 0,
        percentageFromDefaultPrice: 0
      }}
      validationSchema={schema}
    >
      {({ submitForm, isSubmitting, errors }) => {
        return (
          <Dialog {...props} maxWidth="md">
            <Form>
              <DialogTitle>Add Price for Countries</DialogTitle>
              <Divider />
              <DialogContent>
                <Stack sx={{ width: { xs: '100%', md: 600 } }} spacing={2}>
                  <FormikSelect
                    name={'product_id'}
                    id={'product_id_select'}
                    label="Product ID"
                  >
                    {product_ids.map((product_id) => (
                      <MenuItem key={product_id} value={product_id}>
                        {product_id}
                      </MenuItem>
                    ))}
                  </FormikSelect>
                  <Box>
                    <CountrySelector name="countryCode" />
                  </Box>
                  <Typography variant="caption">
                    Guide: If you input amount yearly and monthly, please leave
                    percentage blank and vise versa.
                  </Typography>
                  <FormikTextField
                    name="amountYearly"
                    label="Yearly Subscription Amount"
                    type="number"
                  />
                  <FormikTextField
                    name="amountMonthly"
                    label="Monthly Subscription Amount"
                    type="number"
                  />
                  <Typography variant="caption">
                    Percentage from default: Automatically calculates percentage
                    from default price to be used for monthly and yearly prices.
                  </Typography>
                  <FormikTextField
                    name="percentageFromDefaultPrice"
                    label="Percentage from default price"
                    placeholder="(1-100)"
                    type="number"
                  />
                </Stack>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 3 }}>
                <Button
                  color="error"
                  onClick={(e) => props.onClose(e, 'backdropClick')}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  startIcon={<Add />}
                  color="primary"
                  disabled={Object.keys(errors).length > 0}
                  loading={isSubmitting}
                  onClick={() => {
                    console.log('clicked')
                    submitForm()
                  }}
                >
                  Add Price
                </LoadingButton>
              </DialogActions>
            </Form>
          </Dialog>
        )
      }}
    </Formik>
  )
}

export default AddPriceDialog
