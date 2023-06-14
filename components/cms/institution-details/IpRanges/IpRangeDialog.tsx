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
import { ipv4ToLong } from 'components/utils/ipv4ToLong'
import { Form, Formik, FormikHelpers } from 'formik'
import {
  useCreateIpRangeMutation,
  useUpdateIpRangeMutation
} from 'graphql/cms-queries/ip-range-management.generated'
import { IpRangePartsFragmentDoc } from 'graphql/cms-queries/IpRangeParts.generated'
import {
  LocationPartsFragment,
  LocationPartsFragmentDoc
} from 'graphql/cms-queries/LocationParts.generated'
import { IpRange, IpRangeInput } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React from 'react'
import { object, string } from 'yup'

type Props = {
  mode: 'add' | 'edit'
  dialogTitle: string
  ip_range?: IpRange
  locationId: string
  institutionId: string
} & DialogProps

const schema = object({
  start: string().required(),
  end: string().required(),
  institution: string().required(),
  location: string().required()
})

const IpRangeDialog = (props: Props) => {
  const {
    mode,
    dialogTitle,
    ip_range,
    locationId,
    institutionId,
    ...otherProps
  } = props
  const { enqueueSnackbar } = useSnackbar()
  const [createIpRange, { loading: creatingRange, client }] =
    useCreateIpRangeMutation({
      onCompleted(result) {
        client.cache.updateFragment(
          {
            fragment: LocationPartsFragmentDoc,
            fragmentName: 'LocationParts',
            id: `Location:${locationId}`
          },
          (data: LocationPartsFragment) => {
            return {
              ...data,
              ip_ranges: [...data.ip_ranges, result.ip_range]
            }
          }
        )
        enqueueSnackbar('Successfully added IP range!', { variant: 'success' })
        props.onClose({}, 'backdropClick')
      },
      onError(error) {
        enqueueSnackbar(`Failed to create IP range ${error.message}`, {
          variant: 'error'
        })
      }
    })

  const [editIpRange, { loading: editingRange }] = useUpdateIpRangeMutation({
    onCompleted(result) {
      client.cache.updateFragment(
        {
          fragment: IpRangePartsFragmentDoc,
          fragmentName: 'IpRangeParts',
          id: `IpRange:${result.ip_range?._id}`
        },
        () => result.ip_range
      )
      enqueueSnackbar('Successfully updated IP range!', { variant: 'success' })
      props.onClose({}, 'backdropClick')
    },
    onError(error) {
      enqueueSnackbar(`Failed to update IP range ${error.message}`, {
        variant: 'error'
      })
    }
  })
  const initialValues: IpRangeInput = {
    end: ip_range?.end_string ?? '',
    start: ip_range?.start_string ?? '',
    institution: institutionId,
    location: locationId,
    notes: ip_range?.notes ?? ''
  }

  const submitButtonText = mode === 'add' ? 'Create' : 'Update'
  const onSubmit = (
    values: IpRangeInput,
    helpers: FormikHelpers<IpRangeInput>
  ) => {
    console.log(values)
    if (ipv4ToLong(values.start) > ipv4ToLong(values.end)) {
      helpers.setErrors({
        start: `Make sure the start IP is less than end IP`
      })
      return
    }

    if (mode === 'add') {
      createIpRange({
        variables: {
          input: values
        }
      })
    } else {
      editIpRange({
        variables: {
          id: ip_range._id,
          input: values
        }
      })
    }
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      <Dialog {...otherProps} maxWidth="md">
        <Form>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Divider />
          <DialogContent>
            <Stack spacing={2} width={{ xs: '100%', md: 480 }}>
              <FormikTextField
                size="small"
                label="Start"
                name="start"
                placeholder="0.0.0.0"
              />
              <FormikTextField
                size="small"
                label="End"
                name="end"
                placeholder="0.0.0.0"
              />
              <FormikTextField
                size="small"
                multiline
                rows={4}
                label="Comment / Notes"
                name="notes"
                placeholder="ezproxy, etc."
              />
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => otherProps.onClose(e, 'backdropClick')}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={creatingRange || editingRange}
              variant="contained"
              color="primary"
            >
              {submitButtonText}
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default IpRangeDialog
