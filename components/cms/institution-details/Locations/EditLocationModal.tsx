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
import { Formik, Form } from 'formik'
import { useUpdateLocationMutation } from 'graphql/cms-queries/location-management.generated'
import { LocationPartsFragmentDoc } from 'graphql/cms-queries/LocationParts.generated'
import { Location } from 'graphql/types'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { object, string } from 'yup'

type Props = {
  location?: Location
  onCompleted(): void
} & DialogProps

const schema = object({
  id: string().required(),
  title: string().required('Title is required.'),
  continent: string().optional(),
  country: string().optional(),
  region: string().optional(),
  city: string().optional(),
  address: string().optional(),
  zip: string().optional(),
  comment: string().optional()
})

const EditLocationModal: React.FC<Props> = ({
  children,
  location,
  onCompleted,
  ...props
}) => {
  const router = useRouter()
  const [institutionId] = router.query.id as string[]
  const { enqueueSnackbar } = useSnackbar()

  const [updateLocation, { client, loading }] = useUpdateLocationMutation({
    onCompleted(result) {
      const updated = result.updateLocation
      enqueueSnackbar(`Successfully updated location: ${updated?.title}`, {
        variant: 'success'
      })
      client.cache.updateFragment(
        {
          fragment: LocationPartsFragmentDoc,
          fragmentName: 'LocationParts',
          id: `Location:${updated._id}`
        },
        () => updated
      )
      onCompleted()
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  })

  const handleSubmit = (input) => {
    updateLocation({
      variables: {
        input: {
          ...input,
          institution: institutionId
        }
      }
    })
  }
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        id: location?._id,
        title: location?.title,
        continent: location?.continent,
        country: location?.country,
        region: location?.region,
        city: location?.city,
        address: location?.address,
        zip: location?.zip,
        comment: location?.comment
      }}
      validationSchema={schema}
    >
      <Dialog {...props} maxWidth="sm">
        <Form>
          <DialogTitle>Update Location</DialogTitle>
          <Divider />
          <DialogContent>
            <Stack spacing={2} width={500}>
              <FormikTextField
                name="title"
                label="Title"
                size="small"
                placeholder="e.g., Boston Campus"
              />
              <FormikTextField
                name="continent"
                label="Continent"
                size="small"
                placeholder="e.g., North America"
              />
              <FormikTextField
                name="country"
                label="Country"
                size="small"
                placeholder="e.g., Canada"
              />
              <FormikTextField
                name="region"
                label="Region"
                size="small"
                placeholder="e.g., Saskatchewan"
              />
              <FormikTextField
                name="city"
                label="City"
                size="small"
                placeholder="e.g., Regina"
              />
              <FormikTextField
                name="address"
                label="Address"
                size="small"
                placeholder="e.g., 211 Baker St."
              />
              <FormikTextField
                name="zip"
                label="Zip Code"
                size="small"
                placeholder="e.g., 23092"
              />
              <FormikTextField
                name="comment"
                label="Comment"
                size="small"
                placeholder="e.g., Never paid us"
                multiline
                rows={4}
              />
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <Button
              color="error"
              variant="outlined"
              onClick={(e) => props.onClose(e, 'backdropClick')}
            >
              Cancel
            </Button>
            <LoadingButton variant="contained" type="submit" loading={loading}>
              Update
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Formik>
  )
}

export default EditLocationModal
