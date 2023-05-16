import { Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Stack,
  Typography,
  TextField
} from '@mui/material'
import axios from 'axios'
import CmsLayout from 'components/cms/CmsLayout'
import CircularLoader from 'components/common/CircularLoader'

import TrialsSettings from 'components/settings/TrialsSettings'
import { isServer } from 'components/utils/isServer'
import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import {
  SiteSettingsDocument,
  SiteSettingsQuery,
  SiteSettingsQueryVariables,
  useSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
  useAddHashToTranslationsMutation
} from 'graphql/cms-queries/site-settings.generated'
import { UpdateSiteSettingInput } from 'graphql/types'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import SaveButton from 'components/settings/SaveButton'
import { useAddLanguagesToExistingArticlesMutation } from 'graphql/cms-queries/articles-list.generated'
import FormikTextField from 'components/common/formik/FormikTextFIeld'
import {
  useIsJobRunningLazyQuery,
  useRunJobManuallyMutation
} from 'graphql/cms-queries/jobs.generated'
import PayPerArticleSettings from 'components/settings/PayPerArticleSettings'

const Settings = () => {
  const [generatingSitemap, setGeneratingSitemap] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { data, loading, client } = useSiteSettingsQuery()
  const [updateSiteSettings] = useUpdateSiteSettingsMutation()
  const [jobName, setJobName] = useState('')
  const [addLanguagesToExisting] = useAddLanguagesToExistingArticlesMutation({
    onError(error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    },
    onCompleted(result) {
      enqueueSnackbar(result.addLanguagesToExistingArticles, {
        variant: 'success'
      })
    }
  })
  const [addHashToTranslations, { loading: addingHash }] =
    useAddHashToTranslationsMutation({
      onError(error) {
        enqueueSnackbar(error.message, {
          variant: 'error'
        })
      },
      onCompleted(result) {
        enqueueSnackbar(result.addTranslationsHash, {
          variant: 'success'
        })
      }
    })

  const [runJobManualy] = useRunJobManuallyMutation({
    onError(error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
      isJobRunning({
        variables: {
          name: jobName
        }
      })
    },
    onCompleted(result) {
      enqueueSnackbar(result.runJobManually, { variant: 'success' })

      isJobRunning({
        variables: {
          name: jobName
        }
      })
    },
    fetchPolicy: 'network-only'
  })

  const [
    isJobRunning,
    { data: isJobRunningData, refetch: isJobRunningRefetch }
  ] = useIsJobRunningLazyQuery({
    onCompleted(result) {
      if (result.isJobRunning) {
        setTimeout(isJobRunningRefetch, 2000)
      }

      if (result.jobProgress >= 100) {
        enqueueSnackbar(`Completed job.`, { variant: 'success' })
      }
    },
    fetchPolicy: 'network-only'
  })

  const generateSitemap = async () => {
    try {
      setGeneratingSitemap(true)
      const { data } = await axios.post('/api/generate-article-sitemaps')
      enqueueSnackbar(data.message, { variant: 'success' })
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    }
    setGeneratingSitemap(false)
  }

  if (!data || loading) {
    return <CircularLoader />
  }

  const handleSubmit = async (input) => {
    const { errors, data: updated } = await updateSiteSettings({
      variables: { input }
    })

    if (!errors) {
      client.cache.updateQuery<SiteSettingsQuery, SiteSettingsQueryVariables>(
        {
          query: SiteSettingsDocument
        },
        (data) => {
          return {
            ...data,
            getSiteSettings: updated.updateSiteSettings
          }
        }
      )
      enqueueSnackbar('Successfully updated settings', { variant: 'success' })
    } else {
      enqueueSnackbar(errors[0].message)
    }
  }

  const settings = data.getSiteSettings

  if (isServer) return null
  return (
    <CmsLayout>
      <Formik<UpdateSiteSettingInput>
        onSubmit={handleSubmit}
        initialValues={{
          isPurchaseArticleFeatureOn: settings.isPurchaseArticleFeatureOn,
          isRentArticleFeatureOn: settings.isRentArticleFeatureOn,
          isTrialFeatureOn: settings.isTrialFeatureOn,
          rentDuration: settings.rentDuration,
          trialDuration: settings.trialDuration,
          displayPurchaseAndRentToAdminOnly:
            settings.displayPurchaseAndRentToAdminOnly
        }}
      >
        <Form>
          <Box p={2}>
            <Typography variant="h3">Site Settings</Typography>
            {!!settings.updatedBy && (
              <Typography variant="body2" color="text.secondary">
                Updated at{' '}
                {dayjs(settings.updated).format('MM/DD/YYYY hh:mm A')}
                {' by '}
                <Link href={`/cms/user/${settings.updatedBy?._id}`}>
                  <a>{settings.updatedBy.display_name ?? 'N/A'}</a>
                </Link>
              </Typography>
            )}

            <LoadingButton
              startIcon={<Refresh />}
              variant="outlined"
              loading={generatingSitemap}
              onClick={generateSitemap}
              size="small"
              sx={{ my: 2 }}
            >
              Generate article sitemap
            </LoadingButton>
          </Box>
          <Grid container gap={2} sx={{ p: 2 }}>
            <Grid item lg={4}>
              <Stack>
                <TrialsSettings />
              </Stack>
            </Grid>
            <Grid item lg={4}>
              <PayPerArticleSettings />
            </Grid>
          </Grid>
          <SaveButton />
        </Form>
      </Formik>
      <Grid container>
        <Grid item lg={4}>
          <Stack p={2}>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                await runJobManualy({
                  variables: {
                    name: jobName
                  }
                })
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5">Jobs</Typography>
                  <Typography variant="caption">
                    For devs. Enter a job name from the database{' '}
                    <code>agendaJobs</code> collection and run it manually.
                  </Typography>

                  <Stack gap={2}>
                    <TextField
                      value={jobName}
                      onChange={(e) => setJobName(e.target.value ?? '')}
                      size="small"
                      disabled={isJobRunningData?.isJobRunning}
                    />
                    <LoadingButton
                      loading={isJobRunningData?.isJobRunning}
                      loadingIndicator={'Job is running...'}
                      variant="outlined"
                      size="small"
                      type={'submit'}
                    >
                      Run Job
                    </LoadingButton>
                    {isJobRunningData?.isJobRunning && (
                      <Typography color="success.main">
                        Progress:{' '}
                        {(isJobRunningData?.jobProgress || 0).toFixed(2)}%
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </form>
          </Stack>
        </Grid>
      </Grid>
    </CmsLayout>
  )
}

export default Settings
