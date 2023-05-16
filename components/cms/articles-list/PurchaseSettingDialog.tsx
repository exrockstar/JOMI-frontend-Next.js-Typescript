import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControlLabel,
  Stack,
  Typography
} from '@mui/material'
import { useArticlesList } from './useArticlesList'
import {
  useSelectedArticlesQuery,
  useSetPurchaseSettingMutation
} from 'graphql/cms-queries/articles-list.generated'
import { useSnackbar } from 'notistack'
import { UpdatePurchaseSettingInput } from 'graphql/types'
import { Form, Formik } from 'formik'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'
import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { sleep } from 'common/utils'
import CountrySelector from '../prices-list/CountrySelector'

const PurchaseSettingDialog = (props: DialogProps) => {
  const { selectedItems, refetch } = useArticlesList()
  const { enqueueSnackbar } = useSnackbar()

  const { data: selectedData, loading: selectedLoading } =
    useSelectedArticlesQuery({
      variables: {
        article_ids: selectedItems
      },
      fetchPolicy: 'network-only'
    })

  const selectedArticles = selectedData?.articlesByIds ?? []
  const countries = selectedArticles
    .flatMap((a) => a.purchaseAllowedCountries)
    .filter((a) => !!a)
  const isRentAllChecked = selectedArticles.every(
    (a) => a.isRentArticleFeatureOn
  )
  const isPurchaseAllChecked = selectedArticles.every(
    (a) => a.isPurchaseArticleFeatureOn
  )

  const [updatePurchaseSettings, { loading, data }] =
    useSetPurchaseSettingMutation({
      onError(error) {
        enqueueSnackbar(error.message, {
          variant: 'error'
        })
      },

      async onCompleted(result) {
        refetch()
        enqueueSnackbar('Purchase settings updated', {
          variant: 'success'
        })
        props.onClose({}, null)
      }
    })
  if (selectedLoading) return null
  return (
    <Formik<UpdatePurchaseSettingInput>
      initialValues={{
        article_ids: selectedItems,
        isPurchaseArticleFeatureOn: isPurchaseAllChecked,
        isRentArticleFeatureOn: isRentAllChecked,
        purchaseAllowedCountries: countries
      }}
      onSubmit={async (values) => {
        console.log(values)
        updatePurchaseSettings({
          variables: {
            input: values
          }
        })
      }}
    >
      <Dialog {...props} maxWidth="sm">
        <DialogTitle>Update Purchase Setting</DialogTitle>
        <DialogContent sx={{ minWidth: 480 }}>
          <Typography variant="body2">
            Updating Pay-Per-Article setting for {selectedItems.length}{' '}
            article(s).{' '}
          </Typography>

          <Stack gap={1}>
            <FormControlLabel
              control={
                <FormikCheckbox name="isRentArticleFeatureOn" size="small" />
              }
              label={'Enable rent article'}
            />
            <FormControlLabel
              control={
                <FormikCheckbox
                  name="isPurchaseArticleFeatureOn"
                  size="small"
                />
              }
              label={'Enable purchase article'}
            />
            <Box>
              <CountrySelector
                name="purchaseAllowedCountries"
                multiple
                label="Country Scope"
              />
              <Typography variant="caption" color="info.main">
                Limit Pay-per-article on certain countries. If nothing is
                selected, it will display for all countries.
              </Typography>
              {selectedItems?.length > 1 && (
                <Box>
                  <Typography variant="caption" color="warning.main">
                    NOTE: Showing countries enabled for all selected articles
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <Divider />
        <Form>
          <DialogActions>
            <Button
              color="error"
              startIcon={<Close />}
              variant="contained"
              onClick={(e) => props.onClose(e, null)}
            >
              Close Dialog
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={loading}
            >
              Update Purchase Settings
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}
export default PurchaseSettingDialog
