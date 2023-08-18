import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Button,
  Typography
} from '@mui/material'
import { Form, Formik } from 'formik'
import {
  useGetFeedbackSettingsQuery,
  useUpdateFeedbackSettingsMutation
} from 'graphql/cms-queries/feedback-list.generated'
import { FeedbackSettingsInput } from 'graphql/types'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import AccessTypeSelector from './AccessTypeSelector'

type Props = DialogProps

const FeedbackSettingsModal = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [initialValue, setInitialValue] = useState<FeedbackSettingsInput>(null)
  const { data: settings, refetch } = useGetFeedbackSettingsQuery({
    onCompleted(result) {
      setInitialValue({
        selectedAccessTypes: result.settings.selectedAccessTypes
      })
    }
  })

  const [updateFeedbackSetting, { loading }] =
    useUpdateFeedbackSettingsMutation({
      onCompleted() {
        enqueueSnackbar('Settings have been updated.', { variant: 'success' })
      }
    })

  const handleSubmit = async (values: FeedbackSettingsInput) => {
    updateFeedbackSetting({
      variables: {
        input: values
      }
    })
    props.onClose({}, null)
  }
  if (!initialValue) return
  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      {({ isValid, resetForm, isSubmitting }) => {
        return (
          <Dialog {...props} maxWidth="md">
            <Form>
              <DialogTitle>Feedback Settings</DialogTitle>
              <Divider />
              <DialogContent>
                <AccessTypeSelector name="selectedAccessTypes" />
              </DialogContent>

              <DialogActions sx={{ p: 3 }}>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={(e) => {
                    props.onClose(e, null)
                    setTimeout(resetForm, 500)
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
                  disabled={!isValid}
                >
                  Save and Close
                </LoadingButton>
              </DialogActions>
            </Form>
          </Dialog>
        )
      }}
    </Formik>
  )
}

export default FeedbackSettingsModal
