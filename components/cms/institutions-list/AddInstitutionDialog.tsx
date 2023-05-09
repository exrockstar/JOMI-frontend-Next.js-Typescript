import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import { useCreateInstituionMutation } from 'graphql/cms-queries/create-institution.generated'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'

const AddInstitutionDialog: React.FC<DialogProps> = ({
  children,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [createInstitution, { loading }] = useCreateInstituionMutation({
    onCompleted(data) {
      enqueueSnackbar('Created institution successfully!', {
        variant: 'success'
      })
      router.push(`/cms/institutions-list/${data.institution._id}`)
    },
    onError(e) {
      enqueueSnackbar(`Error: ${e.message}`, { variant: 'error' })
    }
  })
  return (
    <Formik
      onSubmit={(values, actions) => {
        console.log('submitting')
        if (!values.name) {
          actions.setFieldError('name', 'Institution name is required.')
          return
        }

        createInstitution({
          variables: {
            input: {
              name: values.name
            }
          }
        })
      }}
      initialValues={{ name: '' }}
    >
      <Dialog {...props}>
        <Form>
          <DialogTitle>Add Institution</DialogTitle>
          <Divider />
          <DialogContent sx={{ minWidth: 400 }}>
            <FormikTextField
              name="name"
              label="Institution name"
              placeholder="Harvard Medical School"
              size="small"
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              color="error"
              onClick={(e) =>
                props.onClose && props.onClose(e, 'backdropClick')
              }
            >
              Cancel
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Create Institution
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default AddInstitutionDialog
