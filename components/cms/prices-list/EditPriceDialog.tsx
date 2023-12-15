import { Edit } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import { useUpdateGeographicPriceMutation } from 'graphql/cms-queries/price-management.generated'
import {
  PricePartsFragment,
  PricePartsFragmentDoc
} from 'graphql/cms-queries/PriceParts.fragment.generated'
import { useSnackbar } from 'notistack'

type Props = {
  price?: PricePartsFragment
} & DialogProps

const EditPriceDialog = ({ price, ...props }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const product = price?.product

  const [updatePrice, { client, loading: updatingPrice }] =
    useUpdateGeographicPriceMutation({
      onCompleted(result) {
        client.cache.updateFragment(
          {
            fragment: PricePartsFragmentDoc,
            fragmentName: 'PriceParts',
            id: `StripePrice:${result.updatePrice._id}`
          },
          () => result.updatePrice
        )
        enqueueSnackbar(`Successfully updated price!`, {
          variant: 'success'
        })
        props.onClose({}, 'backdropClick')
      },
      onError(error) {
        enqueueSnackbar(`Failed to update price: ${error.message}`, {
          variant: 'error'
        })
      }
    })
  if (!price) return null
  return (
    <Formik
      onSubmit={(values) => {
        //Account for incorrect processing of floats (299.4 would break otherwise for example)
        const updateAmount = parseFloat((values.unit_amount * 100).toFixed(2))

        updatePrice({
          variables: {
            id: price._id,
            input: {
              amount: updateAmount,
              interval: values.interval
            }
          }
        })
      }}
      initialValues={{
        unit_amount: price.unit_amount / 100,
        interval: price.interval
      }}
    >
      <Dialog {...props} maxWidth="md">
        <Form>
          <DialogTitle>Edit Price</DialogTitle>
          <Divider />
          <DialogContent>
            <Stack spacing={2} sx={{ minWidth: { xs: '100%', md: 600 } }}>
              <FormikTextField
                name="unit_amount"
                label="Subscription Amount"
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
              startIcon={<Edit />}
              color="primary"
              loading={updatingPrice}
            >
              Edit Price
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default EditPriceDialog
