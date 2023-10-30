import { Add, Delete } from '@mui/icons-material'
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
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import InstitutionSelector from 'components/common/InstitutionSelector/InstitutionSelector'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import { useCreateInstituionMutation } from 'graphql/cms-queries/create-institution.generated'
import { useTransferInstitutionDataMutation } from 'graphql/cms-queries/institutions-list.generated'
import { useIsJobRunningLazyQuery } from 'graphql/cms-queries/jobs.generated'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { array, object, string } from 'yup'

const schema = object({
  from: array().of(string().required('Please select an institution')),
  to: string().required('Please select an institution')
})
const TransferInstitutionDataDialog: React.FC<DialogProps> = ({
  children,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [transferInstitutionData] = useTransferInstitutionDataMutation({
    onCompleted(result) {
      enqueueSnackbar(result.transferInstitutionData, { variant: 'success' })
      isJobRunning({
        variables: {
          name: 'TransferInstitutionDataJob'
        }
      })
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
    fetchPolicy: 'network-only'
  })
  const [isJobRunning, { data, loading }] = useIsJobRunningLazyQuery({
    onCompleted(result) {
      console.log(
        'result.isJobRunning',
        result.isJobRunning,
        result.jobProgress
      )
      if (result.isJobRunning) {
        setTimeout(() => {
          isJobRunning({
            variables: {
              name: 'TransferInstitutionDataJob'
            }
          })
        }, 2000)
      }

      if (result.jobProgress >= 100) {
        enqueueSnackbar(`Transfer Successful!`, { variant: 'success' })
        props.onClose({}, null)
      }
    },
    fetchPolicy: 'network-only'
  })
  const percentProgress = data?.jobProgress?.toFixed(2)
  return (
    <Formik
      onSubmit={(values, actions) => {
        console.log('onsubmit', values)
        setOpenConfirm(true)
      }}
      initialValues={{ from: [''], to: '' }}
      validationSchema={schema}
      validateOnBlur={true}
    >
      {({
        setFieldValue,
        values,
        isValid,
        submitForm,
        errors,
        resetForm,
        isInitialValid
      }) => {
        return (
          <>
            <ConfirmationDialog
              onComplete={() => {
                setOpenConfirm(false)
                console.log('starting transfer...')
                transferInstitutionData({
                  variables: {
                    input: values
                  },
                  onCompleted() {
                    resetForm()
                  }
                })
              }}
              onCancel={() => {
                setOpenConfirm(false)
                resetForm()
              }}
              dialogTitle={'Confirm Transfer'}
              open={openConfirm}
            >
              <Typography color="error" fontWeight={700} my={2}>
                This action is irreversible. Click {'Yes'} to continue.
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {' '}
                This will transfer all data (aliases, domains,
                points-of-contact, locations, orders, access logs) from selected
                institutions to another institution.
              </Typography>
            </ConfirmationDialog>
            <Dialog {...props}>
              <Form>
                <DialogTitle>
                  <Typography variant="h5">
                    Transfer Institution Data
                  </Typography>
                  <Typography variant="caption">
                    Transfer data (aliases, domains, locations, orders, access
                    logs, points-of-contact) from one or more institutions to
                    another institution
                  </Typography>
                </DialogTitle>

                <Divider />
                <DialogContent sx={{ minWidth: 600 }}>
                  {/* {JSON.stringify(errors, null, 4)} */}
                  <Typography variant="h6" my={2}>
                    {' '}
                    From
                  </Typography>
                  <Stack gap={1}>
                    {values.from.map((v, index) => {
                      const key = `from.${index}`
                      return (
                        <Stack key={key} direction="row" alignItems={'center'}>
                          <Box flexGrow="1">
                            <InstitutionSelector name={key} />
                          </Box>
                          {index > 0 && (
                            <IconButton
                              title="remove institution"
                              onClick={() => {
                                setFieldValue(
                                  'from',
                                  values.from.slice(0, index)
                                )
                              }}
                            >
                              <Delete color="error"></Delete>
                            </IconButton>
                          )}
                        </Stack>
                      )
                    })}
                    <Button
                      startIcon={<Add />}
                      variant="contained"
                      size="small"
                      onClick={() =>
                        setFieldValue('from', [...values.from, ''])
                      }
                      disabled={values.from.length > 2}
                    >
                      Add Institution
                    </Button>
                  </Stack>
                  <Typography variant="h6" my={2}>
                    {' '}
                    To
                  </Typography>
                  <InstitutionSelector name="to" />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                  <Button
                    color="error"
                    onClick={(e) =>
                      props.onClose && props.onClose(e, 'backdropClick')
                    }
                  >
                    Close Modal
                  </Button>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => submitForm()}
                    disabled={data?.isJobRunning}
                  >
                    {data?.isJobRunning
                      ? `Transfering Data ${percentProgress}%...`
                      : 'Transfer'}
                  </LoadingButton>
                </DialogActions>
              </Form>
            </Dialog>
          </>
        )
      }}
    </Formik>
  )
}

export default TransferInstitutionDataDialog
