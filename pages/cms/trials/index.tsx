import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import SubmitButton from 'components/account/SubmitButton'
import CmsLayout from 'components/cms/CmsLayout'
import CountryList from 'components/cms/trials/CountryList'
import TrialsSaveButton from 'components/cms/trials/TrialsSaveButton'
import { CountryListProvider } from 'components/cms/trials/useCountryList'
import PageLoadingIndicator from 'components/common/PageLoadingIndicator'
import SaveButton from 'components/settings/SaveButton'
import TrialsSettings from 'components/cms/trials/TrialsSettings'
import { Form, Formik } from 'formik'
import {
  useGetTrialsSettingsQuery,
  useUpdateTrialSettingsMutation
} from 'graphql/cms-queries/trials.generated'
import { TrialSettingsInput } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import EnabledCountryNote from 'components/cms/trials/EnabledCountryNote'

const TrialsSettingsPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { data, error, loading } = useGetTrialsSettingsQuery()
  const [updateTrialSetttings] = useUpdateTrialSettingsMutation()
  const settings = data?.settings

  return (
    <CmsLayout>
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack>
          <Typography variant="h4">Trials Settings</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            Allows users to subscribe with a trial order in the
            /account/subscription page for the specified trial duration.
          </Typography>
        </Stack>
      </Stack>
      {settings ? (
        <Formik<TrialSettingsInput>
          initialValues={{
            enabledCountries: settings?.enabledCountries ?? [],
            isTrialFeatureOn: settings?.isTrialFeatureOn,
            trialDuration: settings?.trialDuration
          }}
          onSubmit={(values, { resetForm }) => {
            updateTrialSetttings({
              variables: {
                input: values
              },
              onCompleted(result) {
                enqueueSnackbar('Successfully updated trial settings', {
                  variant: 'success'
                })
                let settings = result.settings
                delete settings.__typename
                resetForm({
                  values: settings
                })
              },
              onError(error) {
                enqueueSnackbar(error.message, { variant: 'error' })
              }
            })
          }}
        >
          <div>
            <CountryListProvider>
              <Grid container gap={2} sx={{ p: 2 }}>
                <Grid item lg={4}>
                  <TrialsSettings />
                </Grid>
              </Grid>
              <Box p={2}>
                <Box mb={2}>
                  <Typography variant="h5">Geographic Scoping</Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block' }}
                  >
                    Enable/Disable countries from accessing the Trials Feature.
                  </Typography>
                  <EnabledCountryNote />
                </Box>
                <CountryList />
              </Box>
            </CountryListProvider>
            <TrialsSaveButton />
          </div>
        </Formik>
      ) : loading ? (
        <Stack alignItems="center" justifyContent="center" height="90vh">
          <CircularProgress />
        </Stack>
      ) : (
        <Stack p={2}>
          <Alert variant="filled" severity="error">
            {error.message}
          </Alert>
        </Stack>
      )}
    </CmsLayout>
  )
}

export default TrialsSettingsPage
