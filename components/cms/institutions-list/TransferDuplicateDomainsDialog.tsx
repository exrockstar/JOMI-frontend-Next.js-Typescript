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
  List,
  ListItem,
  Stack,
  Typography
} from '@mui/material'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import InstitutionSelector from 'components/common/InstitutionSelector/InstitutionSelector'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import { Form, Formik } from 'formik'
import {
  useInstitutionsListLazyQuery,
  useTransferDuplicateDomainsMutation,
  useTransferInstitutionDataMutation
} from 'graphql/cms-queries/institutions-list.generated'
import { useIsJobRunningLazyQuery } from 'graphql/cms-queries/jobs.generated'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { array, object, string } from 'yup'
import { useInstitutionList } from './useInstitutionList'
import { Operators, QueryOperation } from 'graphql/types'

const schema = object({
  domain: string().required('Please specify a domain'),
  to: string().required('Please select a target institution')
})
const TransferDuplicateDomainDialog: React.FC<DialogProps> = ({
  children,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [fetch, { data: institutionsData }] = useInstitutionsListLazyQuery({
    fetchPolicy: 'network-only'
  })
  const [startTransferDomain] = useTransferDuplicateDomainsMutation({
    onCompleted(result) {
      enqueueSnackbar(result.transferDuplicateDomains, { variant: 'success' })
      isJobRunning({
        variables: {
          name: 'TransferDuplicateDomainsJob'
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
      if (result.isJobRunning) {
        setTimeout(() => {
          isJobRunning({
            variables: {
              name: 'TransferDuplicateDomainsJob'
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
        fetch({
          variables: {
            input: {
              skip: 0,
              limit: 10,
              filters: [
                {
                  columnName: 'domains',
                  operation: QueryOperation.Contains,
                  value: values.domain
                },
                {
                  columnName: '_id',
                  operation: QueryOperation.NotEqual,
                  value: values.to
                }
              ]
            }
          }
        }).then((result) => {
          setOpenConfirm(true)
        })
      }}
      initialValues={{ domain: '', to: '' }}
      validationSchema={schema}
      validateOnBlur={true}
    >
      {({ setFieldValue, values, submitForm, resetForm }) => {
        return (
          <>
            <ConfirmationDialog
              onComplete={() => {
                setOpenConfirm(false)
                console.log('starting transfer...')
                startTransferDomain({
                  variables: {
                    input: {
                      domain: values.domain,
                      to: values.to
                    }
                  },
                  onCompleted() {
                    resetForm()
                  }
                })
              }}
              onCancel={() => {
                setOpenConfirm(false)
                // resetForm()
              }}
              dialogTitle={'Confirm Transfer'}
              open={openConfirm}
            >
              <Typography color="error" fontWeight={700} my={2}>
                This action is irreversible. Click {'Yes'} to continue.
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Removing domain from these institutions:
              </Typography>
              <List>
                {institutionsData?.institutions.institutions.map((i) => (
                  <ListItem key={i._id}>{i.name}</ListItem>
                ))}
              </List>
              <Typography color="text.secondary" variant="body2">
                Target Institution: {values.to}
              </Typography>
            </ConfirmationDialog>
            <Dialog {...props}>
              <Form>
                <DialogTitle>
                  <Typography variant="h5">
                    Transfer Duplicte Domains
                  </Typography>
                  <Typography variant="caption">
                    Removes the domain selected domain from the non-target
                    institution and transfers all the access logs from users
                    using the domain so that they belong to the target
                    institution.
                  </Typography>
                </DialogTitle>

                <Divider />
                <DialogContent sx={{ minWidth: 600 }}>
                  <Typography variant="h6" my={2}>
                    Enter a domain
                  </Typography>
                  <Stack gap={1}>
                    <FormikTextField name="domain" size="small" />
                  </Stack>
                  <Typography variant="h6" my={2}>
                    Select A Target Institution
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

export default TransferDuplicateDomainDialog
