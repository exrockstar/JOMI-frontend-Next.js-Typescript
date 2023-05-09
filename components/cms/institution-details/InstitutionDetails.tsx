import { Delete, Save } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormLabel,
  Typography,
  Box,
  Stack,
  Grid,
  MenuItem,
  FormControlLabel,
  Tooltip,
  Divider
} from '@mui/material'
import { BASE_URL } from 'common/constants'

import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikSelect from 'components/common/formik/FormkSelect'
import { Form, Formik } from 'formik'
import {
  InstitutionByIdDocument,
  InstitutionByIdQuery
} from 'graphql/cms-queries/institutions-list.generated'
import React, { useState } from 'react'
import Image from 'next/legacy/image'
import { LoadingButton } from '@mui/lab'
import AliasesList from './AliasesList'
import DomainsList from './DomainsList'
import { object, string, array } from 'yup'
import { useUpdateInstitutionMutation } from 'graphql/cms-queries/create-institution.generated'
import { useSnackbar } from 'notistack'
import UploadImageDialog from '../UploadImage/UploadImageDialog'
import { UpdateInstitutionInput } from 'graphql/types'
import MediaLibraryDialog from '../MediaLibraryDialog/MediaLibraryDialog'
import { MediaLibraryQuery } from 'graphql/cms-queries/media-library.generated'
import FormikCheckbox from 'components/common/formik/FormikCheckbox'

type Props = {
  institution: InstitutionByIdQuery['institution']
}
type Media = Unpacked<MediaLibraryQuery['files']['files']>

const schema = object({
  id: string().required(),
  name: string().required('Institution name is required'),
  aliases: array().optional(),
  domains: array().optional(),
  urlLink: string().optional(),
  category: string().optional(),
  subscriber_display_name: string().optional(),
  notes: string().optional().nullable()
})

const InstitutionDetails = ({ institution }: Props) => {
  const [imageUrl, setImageUrl] = useState(
    institution.image
      ? `${BASE_URL}/api/files/${institution.image.filename}`
      : `/img/enso_transparent.png`
  )
  const [image, setImage] = useState<{
    name: string
    size: number
  }>(null)
  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [openMediaDialog, setOpenMediaDialog] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [updating, setUpdating] = useState(false)
  const [updateInstitution, { client, loading }] = useUpdateInstitutionMutation(
    {
      async onCompleted(result) {
        enqueueSnackbar(
          'Successfully updated institution. Revalidating subscribers page...',
          {
            variant: 'success'
          }
        )
        client.cache.updateQuery({ query: InstitutionByIdDocument }, () => {
          return {
            institution: result.institution
          }
        })
        try {
          await fetch('/api/revalidate?path=/subscribers')
          enqueueSnackbar(`Successfully updated subscribers page.`, {
            variant: 'success'
          })
        } catch (e) {
          enqueueSnackbar(`Couldn't update subscribers page: ${e.message}`, {
            variant: 'error'
          })
        }
        setUpdating(false)
      },
      onError(e) {
        enqueueSnackbar(`Update error: ${e.message}`, {
          variant: 'error'
        })
        setUpdating(false)
      }
    }
  )

  return (
    <>
      <MediaLibraryDialog
        open={openMediaDialog}
        onClose={() => {
          setOpenMediaDialog(false)
        }}
        onSelectImage={(media: Media) => {
          if (media) {
            const newUrl = `${BASE_URL}/api/files/${media.filename}`
            setImage({ name: media.filename, size: media.length })
            setImageUrl(newUrl)
          }
          setOpenMediaDialog(false)
        }}
      />
      <UploadImageDialog
        open={openUploadDialog}
        onClose={() => {
          setOpenUploadDialog(false)
        }}
        onCompleted={(uploaded: { name: string; size: number }) => {
          const newUrl = `${BASE_URL}/api/files/${uploaded.name}`
          setImage(uploaded)
          setImageUrl(newUrl)
          setOpenUploadDialog(false)
        }}
      />

      <Formik
        key={institution._id}
        onSubmit={(values) => {
          const input: UpdateInstitutionInput = {
            id: values.id,
            name: values.name,
            aliases: values.aliases,
            domains: values.domains,
            urlLink: values.urlLink,
            category: values.category,
            subscriber_display_name: values.subscriber_display_name,
            show_on_subscribers_page: !values.hide_on_subscribers_page,
            restrictMatchByName: !values.enableMatchByName,
            notes: values.notes,
            accessSettings: {
              displayTrafficGraph: values.accessSettings.displayTrafficGraph
            }
          }
          input.id = institution._id
          if (image) {
            input.image = {
              filename: image.name,
              format: image.name.split('.').pop(),
              length: image.size
            }
          }
          setUpdating(true)
          updateInstitution({
            variables: {
              input
            }
          })
        }}
        validationSchema={schema}
        initialValues={{
          id: institution._id,
          name: institution.name,
          aliases: institution.aliases,
          domains: institution.domains,
          urlLink: institution.urlLink ?? '',
          category: institution.category,
          subscriber_display_name: institution.subscriber_display_name ?? '',
          hide_on_subscribers_page: !institution.show_on_subscribers_page,
          enableMatchByName: !institution.restrictMatchByName,
          notes: institution.notes,
          accessSettings: {
            displayTrafficGraph: institution.accessSettings.displayTrafficGraph
          }
        }}
      >
        <Form>
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Stack>
                <FormControl component="fieldset" variant="standard">
                  <FormLabel>Name</FormLabel>
                  <FormikTextField
                    name="name"
                    size="small"
                    placeholder="e.g., ACME University"
                    sx={{ width: { md: 400, xs: '100%' } }}
                    fullWidth
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <FormikCheckbox name="enableMatchByName" size="small" />
                  }
                  label="Enable access by name and alias"
                />
              </Stack>

              <Box my={2}>
                <Typography variant="h5"> Institution Aliases</Typography>
                <AliasesList />
              </Box>
              <Box my={2}>
                <Typography variant="h5"> Email Domains</Typography>
                <DomainsList />
              </Box>
              <Box my={2}>
                <Typography variant="h5"> Notes</Typography>

                <FormikTextField
                  name="notes"
                  multiline
                  rows="5"
                  placeholder="Internal notes for the institution"
                  sx={{ width: { md: 400, xs: '100%' } }}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="h5"> Subscribers Page</Typography>
              <Typography color="text.secondary" mb={2} variant="subtitle2">
                How this institution will be displayed in subscribers page
              </Typography>
              <Stack spacing={2}>
                <FormControl component="fieldset" variant="standard">
                  <FormLabel>Image</FormLabel>
                  <Stack alignItems="flex-start" spacing={1}>
                    <Box
                      position="relative"
                      width={150}
                      height={100}
                      sx={{ backgroundColor: 'neutral.200' }}
                    >
                      <Image
                        src={imageUrl}
                        alt="institution-logo"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Box>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => setOpenUploadDialog(true)}
                    >
                      Upload New Image
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => setOpenMediaDialog(true)}
                    >
                      Choose From Library
                    </Button>
                  </Stack>
                </FormControl>

                <FormControlLabel
                  control={
                    <FormikCheckbox
                      name="hide_on_subscribers_page"
                      size="small"
                    />
                  }
                  label={
                    <Tooltip
                      arrow
                      title="Show/Hide the institution on the lower list of the subscribers page"
                    >
                      <div>Hide on subscribers page</div>
                    </Tooltip>
                  }
                />

                <FormControl component="fieldset" variant="standard">
                  <FormLabel>Url Link</FormLabel>
                  <FormikTextField
                    name="urlLink"
                    size="small"
                    placeholder="URL Link"
                    sx={{ width: { md: 400, xs: '100%' } }}
                    fullWidth
                  />
                </FormControl>
                <Box>
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel>Category</FormLabel>
                    <FormikSelect
                      name="category"
                      id="institution-category-select"
                      size="small"
                    >
                      <MenuItem value="">N/A</MenuItem>
                      <MenuItem value="Medical School">Medical School</MenuItem>
                      <MenuItem value="SurgTech">
                        Surgical Tech Program
                      </MenuItem>
                      <MenuItem value="Residency">Residency</MenuItem>
                      <MenuItem value="PA Program">PA Program</MenuItem>
                      <MenuItem value="Hospital">Hospital</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </FormikSelect>
                  </FormControl>
                </Box>
                <FormControl component="fieldset" variant="standard">
                  <FormLabel>Display Name</FormLabel>
                  <FormikTextField
                    name="subscriber_display_name"
                    size="small"
                    placeholder="Display name"
                    sx={{ width: { md: 400, xs: '100%' } }}
                    fullWidth
                  />
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ px: 2, my: 3 }} />
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Access Page Settings</Typography>
              <FormControlLabel
                control={
                  <FormikCheckbox
                    name="accessSettings.displayTrafficGraph"
                    size="small"
                  />
                }
                label="Display Traffic Graph on Access Page"
              />
            </Grid>
          </Grid>
          <Stack alignItems="flex-end">
            <LoadingButton
              variant="contained"
              size="large"
              sx={{ px: 10, position: 'fixed', bottom: 16, right: 16 }}
              startIcon={<Save />}
              type="submit"
              loading={loading || updating}
            >
              Save
            </LoadingButton>
          </Stack>
        </Form>
      </Formik>
    </>
  )
}

export default InstitutionDetails
