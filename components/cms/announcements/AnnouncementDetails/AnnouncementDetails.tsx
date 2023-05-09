import { Save, Visibility } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import FormikSwitch from 'components/common/formik/FormikSwitch'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import FormikTwitterPicker from 'components/common/formik/FormikTwitterPicker'
import { Form, Formik } from 'formik'
import {
  useAnnouncementQuery,
  useUpdateAnnouncementMutation
} from 'graphql/queries/announcements.generated'
import { AnnouncementType } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

import AnnouncementEditor from './AnnouncementEditor'
import AnnouncementPreviewModal from './AnnouncementPreviewModal'

type Props = {
  announcementId: string
}
const AnnouncementDetails = ({ announcementId }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const { data: session } = useSession()
  const [showPreview, setShowPreview] = useState(false)
  const {
    data: announcementData,
    loading: loadingAnnouncement,
    error: loadError
  } = useAnnouncementQuery({
    variables: {
      _id: announcementId
    },
    skip: !announcementId || !session
  })

  const [updateAnnouncement, { loading: updating, error: updateError }] =
    useUpdateAnnouncementMutation({
      onCompleted(data) {
        enqueueSnackbar('Successfully updated announcement', {
          variant: 'success'
        })
      },
      onError(error) {
        enqueueSnackbar(`Could not update announcement ${error.message}`, {
          variant: 'error'
        })
      }
    })

  const handleSave = (values) => {
    updateAnnouncement({
      variables: {
        input: {
          ...values,
          _id: announcementId
        }
      }
    })
  }
  const announcement = announcementData?.announcement
  return (
    <>
      {loadingAnnouncement || (!announcement && !loadError) ? (
        <Stack py={10} alignItems="center">
          <CircularProgress />
          <Typography color="textSecondary">Loading...</Typography>
        </Stack>
      ) : loadError ? (
        <Stack py={10} alignItems="center">
          <Alert color="error">Could not load announcement.</Alert>
        </Stack>
      ) : (
        <Formik
          onSubmit={handleSave}
          initialValues={{
            _id: announcement._id,
            title: announcement.title ?? '',
            content: announcement.content ?? '',
            enabled: Boolean(announcement.enabled),
            isPermanent: Boolean(announcement?.isPermanent),
            type: AnnouncementType.Success,
            backgroundColor: announcement?.backgroundColor ?? '#FFFFF'
          }}
        >
          {({ values }) => (
            <Form>
              <Stack
                p={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Stack direction="row">
                    <Typography variant="h4">Details</Typography>
                  </Stack>
                  <Typography variant="body2" color="textSecondary">
                    id: {announcementId}
                  </Typography>
                </Box>
                <LoadingButton
                  startIcon={<Save />}
                  variant="contained"
                  type="submit"
                  loading={updating && !updateError}
                >
                  Save
                </LoadingButton>
              </Stack>
              <Card elevation={5}>
                <Stack
                  p={2}
                  sx={{ width: { xs: '100%', md: '50%' } }}
                  spacing={2}
                >
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel>
                      {/* <Typography variant="h5">Title</Typography> */}
                      Title
                    </FormLabel>
                    <FormikTextField name="title" size="small" fullWidth />
                  </FormControl>
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel>Background color</FormLabel>

                    <Box mt={2}>
                      <FormikTwitterPicker name="backgroundColor" />
                    </Box>
                  </FormControl>
                </Stack>
                <Stack p={2}>
                  <FormControl component="fieldset" variant="standard">
                    <Stack direction="row" alignItems="center">
                      <FormLabel>Content</FormLabel>
                      <Tooltip title="Preview announcement">
                        <Button
                          onClick={() => setShowPreview(true)}
                          endIcon={<Visibility />}
                        >
                          Preview
                        </Button>
                      </Tooltip>
                      <AnnouncementPreviewModal
                        open={showPreview}
                        onClose={() => {
                          setShowPreview(false)
                        }}
                        announcement={{
                          ...announcement,
                          ...values
                        }}
                      />
                    </Stack>
                    <AnnouncementEditor name="content" />
                  </FormControl>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box p={2}>
                      <FormControl component="fieldset" variant="standard">
                        <FormLabel>Published</FormLabel>
                        <FormControlLabel
                          control={<FormikSwitch name="enabled" />}
                          label={values.enabled ? 'Yes' : 'No'}
                        />
                      </FormControl>
                      <FormHelperText>
                        Publish/Unpublish the announcement
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box p={2}>
                      <FormControl component="fieldset" variant="standard">
                        <FormLabel>Permanent</FormLabel>
                        <FormControlLabel
                          control={<FormikSwitch name="isPermanent" />}
                          label={values.isPermanent ? 'Yes' : 'No'}
                        />
                        <FormHelperText>
                          If Yes, it will remove the close button from the
                          announcement
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack alignItems="flex-end" p={2} pb={4}>
                      <LoadingButton
                        startIcon={<Save />}
                        variant="contained"
                        type="submit"
                        loading={updating && !updateError}
                      >
                        Save
                      </LoadingButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default AnnouncementDetails
