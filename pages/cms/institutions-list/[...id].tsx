import { useTheme } from '@mui/material/styles'
import {
  Stack,
  Tabs,
  Tab,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  useMediaQuery,
  Alert,
  Button
} from '@mui/material'
import { IS_SERVER } from 'common/constants'

import CmsLayout from 'components/cms/CmsLayout'
import InstitutionDetails from 'components/cms/institution-details/InstitutionDetails'
import LocationList from 'components/cms/institution-details/Locations/LocationsList'
import PointOfContactsList from 'components/cms/institution-details/PointsOfContact/PointOfContactsList'
import TabPanel, { a11yProps } from 'components/common/TabPanel'
import dayjs from 'dayjs'
import { useInstitutionByIdQuery } from 'graphql/cms-queries/institutions-list.generated'
import { StatusType, Location } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const InstitutionDetailsPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const queryId = router.query.id
  const id = queryId instanceof Array ? queryId[0] : queryId
  const { data: session } = useSession()
  const { data, loading, error } = useInstitutionByIdQuery({
    skip: !session?.user || !id,
    variables: {
      id
    }
  })
  const [value, setValue] = useState(0)
  const tabs = ['', 'pocs', 'locations']

  const getValue = (route: string) => {
    return tabs.indexOf(route)
  }

  const getUrl = (val: number) => {
    return tabs[val]
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    const url = router.asPath.split('/').slice(0, 4)
    url[4] = getUrl(newValue)
    router.push(`${url.join('/')}`, null, {
      shallow: true
    })
  }

  useEffect(() => {
    if (!IS_SERVER && router.isReady) {
      //set the tab based on the URL
      const url = router.asPath.split('/')
      const tabUrl = url[4] ?? ''

      const val = getValue(tabUrl)
      setValue(val)
    }
  }, [router.isReady, router.asPath])

  const institution = data?.institution

  const orderStatusColor = () => {
    const sub = institution?.subscription
    if (sub) {
      switch (sub.status) {
        case StatusType.Standard:
          return 'success'
        case StatusType.Trial:
          return 'warning'
        default:
          return 'default'
      }
    }
  }
  const tabId = `institution-tab`
  const tabPanelId = tabId + '-panel'
  // const V4_URL = process.env.V4_URL || 'https://v4.jomi.com'
  return (
    <CmsLayout>
      {!institution ? (
        <Stack alignItems="center" justifyContent="center" height="90vh">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error.message}</Alert>}
        </Stack>
      ) : (
        <Stack p={2} minHeight="90vh">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h4">{institution?.name}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              href={`/access/${institution._id}`}
            >
              View Access Logs
            </Button>
          </Stack>
          <Grid container>
            <Grid item xs={12} lg={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Database ID: {institution?._id}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="subtitle2" color="textSecondary">
                Created at: {dayjs(institution.created).format('MM/DD/YYYY')}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Updated at: {dayjs(institution.updated).format('MM/DD/YYYY')}
              </Typography>
            </Grid>
            <Grid>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="overline">Order Status:</Typography>
                <Chip
                  label={institution.subscription.status.toUpperCase()}
                  color={orderStatusColor()}
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              textColor="secondary"
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label="basic tabs example"
              orientation={isSmallDevice ? 'vertical' : 'horizontal'}
            >
              <Tab label="Details" {...a11yProps(tabId, 0)} />
              <Tab label="Points of Contact" {...a11yProps(tabId, 1)} />
              <Tab label="Orders and IP Ranges" {...a11yProps(tabId, 1)} />
            </Tabs>
          </Box>
          <TabPanel id={tabPanelId} value={value} index={0}>
            <InstitutionDetails institution={institution} />
          </TabPanel>
          <TabPanel id={tabPanelId} value={value} index={1}>
            <PointOfContactsList contacts={institution.points_of_contact} />
          </TabPanel>
          <TabPanel id={tabPanelId} value={value} index={2}>
            <LocationList locations={institution.locations as Location[]} />
          </TabPanel>
        </Stack>
      )}
    </CmsLayout>
  )
}

export default InstitutionDetailsPage
