import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Button,
  Typography,
  Divider,
  MenuItem,
  TextField,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import InstitutionSelector from 'components/common/InstitutionSelector/InstitutionSelector'
import { Form, Formik } from 'formik'
import {
  useApplyInstitutionToTriageMutation,
  useTriageQueueByIdQuery,
  useUpdateTriageQueueNotesMutation,
  useUpdateTriageQueueStatusMutation
} from 'graphql/cms-queries/triage-queue-list.generated'
import { TriageMarket, TriagePriority, TriageQueueStatus } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import AdditionalInfo from './AdditionalInfo'
import AffiliationInfo from './AffiliationInfo'
import TriageEmailSection from './TriageEmailSection'
import UserInfo from './UserInfo'

type Props = {
  id: string
}
const TriageQueueDetails = ({ id }: Props) => {
  const { data: session } = useSession()
  const { enqueueSnackbar } = useSnackbar()
  const { refetch, data, loading, error, updateQuery } = useTriageQueueByIdQuery({
    skip: !session?.user,
    variables: {
      id: id,
    }
  })
  const [updateStatus, { loading: updatingStatus }] =
    useUpdateTriageQueueStatusMutation({
      onCompleted(result) {
        enqueueSnackbar(`Updated successfully`, {
          variant: 'success'
        })
      },
      onError(error) {
        enqueueSnackbar(`Update error: ${error.message}`, {
          variant: 'error'
        })
      }
    })

  const [updatePriority, { loading: updatingPriority }] =
    useUpdateTriageQueueStatusMutation({
      onCompleted(result) {
        enqueueSnackbar(`Updated successfully`, {
          variant: 'success'
        })
      },
      onError(error) {
        enqueueSnackbar(`Update error: ${error.message}`, {
          variant: 'error'
        })
      }
    })

  const [updateMarket, { loading: updatingMarket }] =
  useUpdateTriageQueueStatusMutation({
    onCompleted(result) {
      enqueueSnackbar(`Updated Market successfully`, {
        variant: 'success'
      })
    },
    onError(error) {
      enqueueSnackbar(`Update error: ${error.message}`, {
        variant: 'error'
      })
    }
  })

  const [updateNotes, { loading: updatingNotes }] =
    useUpdateTriageQueueNotesMutation({
      onCompleted(result) {
        enqueueSnackbar(`Updated successfully`, {
          variant: 'success'
        })
      },
      onError(error) {
        enqueueSnackbar(`Update error: ${error.message}`, {
          variant: 'error'
        })
      }
    })

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TriageQueueStatus
    console.log(value)
    updateQuery((current) => {
      return {
        __typename: 'Query',
        triageQueueRequest: {
          ...current.triageQueueRequest,
          type: value
        }
      }
    })
    updateStatus({
      variables: {
        input: {
          id: id,
          type: value
        }
      }
    })
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TriagePriority
    console.log(value)
    updateQuery((current) => {
      return {
        __typename: 'Query',
        triageQueueRequest: {
          ...current.triageQueueRequest,
          priority: value
        }
      }
    })
    updatePriority({
      variables: {
        input: {
          id: id,
          priority: value
        }
      }
    })
  }

  const handleMarketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TriageMarket
    console.log(value)
    updateQuery((current) => {
      return {
        __typename: 'Query',
        triageQueueRequest: {
          ...current.triageQueueRequest,
          market: value
        }
      }
    })
    updateMarket({
      variables: {
        input: {
          id: id,
          market: value
        }
      }
    })
  }

  const [applyInstitution, { loading: applyingInstitution }] =
    useApplyInstitutionToTriageMutation({
      onCompleted() {
        enqueueSnackbar(
          'Successfully applied institution to user and triage request.',
          {
            variant: 'success'
          }
        )
      },
      onError(error) {
        enqueueSnackbar(`Failed to apply institution: ${error.message}`, {
          variant: 'error'
        })
      }
    })

  if (loading) {
    return (
      <Stack alignItems="center" height="100%" justifyContent="center">
        <CircularProgress />
        Loading
      </Stack>
    )
  }

  if (error || !data?.triageQueueRequest) {
    return (
      <Stack>
        <Alert severity="error">{error?.message ?? 'No Data to display'}</Alert>
      </Stack>
    )
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values)
    applyInstitution({
      variables: {
        id: id,
        institution_id: values.institution_id
      }
    })
  }

  const triageQueueRequest = data?.triageQueueRequest
  const initialValues = { institution_id: '' }
  const type = triageQueueRequest.type
  const priority = triageQueueRequest.priority
  const market = triageQueueRequest.market
  return (
    <Stack mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Stack spacing={2}>
            <UserInfo user={triageQueueRequest?.user} />
            <Divider />
            <AffiliationInfo request={triageQueueRequest} />
            <Divider />
            <Typography variant="h5">Actions</Typography>
            <Box mb={2}>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                  <Typography variant="body2" color="text.secondary" my={1}>
                    Set matching institution
                  </Typography>
                  <Stack
                    direction="row"
                    width={'100%'}
                    alignItems={'center'}
                    spacing={1}
                  >
                    <Box width={400}>
                      <InstitutionSelector name="institution_id" size="small" />
                    </Box>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      loading={applyingInstitution}
                    >
                      Apply
                    </LoadingButton>
                  </Stack>
                </Form>
              </Formik>
            </Box>

            <TextField
              value={type}
              select
              onChange={handleStatusChange}
              label="Triage Queue Status"
              size="small"
              fullWidth
            >
              {Object.values(TriageQueueStatus).map((val) => {
                const selected = type === val
                return (
                  <MenuItem key={val} value={val}>
                    <Box display="flex" gap={1} alignItems="center">
                      <Typography>{val}</Typography>
                      {selected && updatingStatus && (
                        <ListItemIcon>
                          <CircularProgress size={18} />
                        </ListItemIcon>
                      )}
                    </Box>
                  </MenuItem>
                )
              })}
            </TextField>
            <TextField
              value={priority}
              onChange={handlePriorityChange}
              size="small"
              label="Priority"
              fullWidth
              select
            >
              {Object.values(TriagePriority).map((val) => {
                const selected = priority === val
                return (
                  <MenuItem key={val} value={val}>
                    <Box display="flex" gap={1} alignItems="center">
                      <Typography>{val}</Typography>
                      {selected && updatingPriority && (
                        <ListItemIcon>
                          <CircularProgress size={18} />
                        </ListItemIcon>
                      )}
                    </Box>
                  </MenuItem>
                )
              })}
            </TextField>
            <TextField
              value={market}
              onChange={handleMarketChange}
              size="small"
              label="Market"
              fullWidth
              select
            >
              {Object.values(TriageMarket).map((val) => {
                const selected = market === val
                return (
                  <MenuItem key={val} value={val}>
                    <Box display="flex" gap={1} alignItems="center">
                      <Typography>{val}</Typography>
                      {selected && updatingPriority && (
                        <ListItemIcon>
                          <CircularProgress size={18} />
                        </ListItemIcon>
                      )}
                    </Box>
                  </MenuItem>
                )
              })}
            </TextField>
            <Box mb={2}>
              <Formik
                initialValues={{ notes: triageQueueRequest.notes }}
                onSubmit={(values) => {
                  updateNotes({
                    variables: {
                      input: {
                        id,
                        notes: values.notes
                      }
                    }
                  })
                }}
              >
                <Form>
                  <Typography variant="body2" color="text.secondary" my={1}>
                    Notes
                  </Typography>
                  <Stack spacing={1}>
                    <FormikTextField
                      name="notes"
                      id="triage-notes"
                      rows={4}
                      multiline
                    />
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      sx={{ alignSelf: 'flex-end' }}
                      loading={updatingNotes}
                    >
                      Update notes
                    </LoadingButton>
                  </Stack>
                </Form>
              </Formik>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <AdditionalInfo request={triageQueueRequest} />
            <TriageEmailSection request={triageQueueRequest} refetchQuery={refetch}/>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default TriageQueueDetails
