import { Close } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import {
  useTriageQueueByIdLazyQuery,
  useUpdateTriageQueueResponseMutation
} from 'graphql/cms-queries/triage-queue-list.generated'
import { useSnackbar } from 'notistack'
import React from 'react'

type Props = {
  response: string
  triageQueueId: string
} & DialogProps

const UpdateResponseDialog = ({ response, triageQueueId, ...props }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [_, { updateQuery }] = useTriageQueueByIdLazyQuery({
    variables: {
      id: triageQueueId
    }
  })
  const [updateResponse, { loading }] = useUpdateTriageQueueResponseMutation({
    onCompleted(result) {
      enqueueSnackbar('Successfully updated response!', {
        variant: 'success'
      })

      updateQuery((current) => {
        return {
          ...current,
          triageQueueRequest: result.triageQueueRequest
        }
      })

      props.onClose({}, 'backdropClick')
    },
    onError(error) {
      enqueueSnackbar(`Failed to update response: ${error.message}`, {
        variant: 'error'
      })
    }
  })
  return (
    <Formik
      initialValues={{
        response: response
      }}
      onSubmit={(values) => {
        updateResponse({
          variables: {
            input: {
              id: triageQueueId,
              response: values.response
            }
          }
        })
      }}
    >
      <Dialog {...props} maxWidth="md">
        <DialogTitle sx={{ position: 'relative' }}>
          Edit Response
          <IconButton
            sx={{ position: 'absolute', right: 0, top: 0 }}
            onClick={() => {
              props.onClose({}, 'escapeKeyDown')
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: 800 }}>
          <Form>
            <FormikTextField name="response" multiline rows={20} fullWidth />
          </Form>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Form>
            <LoadingButton variant="contained" type="submit" loading={loading}>
              Save
            </LoadingButton>
          </Form>
        </DialogActions>
      </Dialog>
    </Formik>
  )
}

export default UpdateResponseDialog
