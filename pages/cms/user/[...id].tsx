import {
  Stack,
  Typography,
  Grid,
  Chip,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IS_SERVER } from 'common/constants'
import CmsLayout from 'components/cms/CmsLayout'
import ActivityPanel from 'components/cms/user/ActivityTab/ActivityPanel'
import UserOrdersPanel from 'components/cms/user/OrdersTab/UserOrdersPanel'
import UserMainSettings from 'components/cms/user/UserMainSettings/UserMainSettings'
import TabPanel, { a11yProps } from 'components/common/TabPanel'
import dayjs from 'dayjs'
import { useUserDetailQuery } from 'graphql/cms-queries/user-list.generated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  subscriptionText,
  subscriptionColor
} from 'components/common/subscriptionUtils'

const UserDetails = () => {
  const [value, setValue] = useState(0)
  const router = useRouter()
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const queryId = router.query.id
  const id = queryId instanceof Array ? queryId[0] : queryId
  const { data: session } = useSession()
  const { data, loading, error } = useUserDetailQuery({
    skip: !session?.user || !id,
    variables: {
      id
    }
  })
  const tabs = ['', 'orders', 'activity']
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
      const url = new URL(router.asPath, location.origin).pathname.split('/')
      const tabUrl = url[4] ?? ''
      console.log(url)
      const val = getValue(tabUrl)
      setValue(val)
    }
  }, [router.isReady, router.asPath])

  const user = data?.userById
  const tabId = `user-tab`
  const tabPanelId = tabId + '-panel'
  const accessType = user?.accessType?.accessType

  const LoadingOrError = (
    <Stack alignItems="center" justifyContent="center" height="90vh">
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
    </Stack>
  )

  const getUserStatus = () => {
    if (!user) return 'NORMAL'

    if (user.hasManualBlock) {
      return 'DISABLED'
    }

    if (user.deleted) {
      return 'DELETED'
    }

    return 'NORMAL'
  }

  const userStatus = getUserStatus()
  const getStatusBarMessage = () => {
    switch (userStatus) {
      case 'DELETED':
        return 'User is currently marked as deleted.'
      case 'DISABLED':
        return 'User is currently blocked.'
      default:
        return null
    }
  }
  const userStatusColor = userStatus === 'NORMAL' ? 'success' : 'error'
  const statusMessage = getStatusBarMessage()
  return (
    <CmsLayout>
      {!user ? (
        LoadingOrError
      ) : (
        <Stack p={2} minHeight="90vh">
          <Typography variant="h4">{user.display_name}</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Database ID: {user._id}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Box
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              gap={4}
              width={'100%'}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="overline" color="textSecondary">
                  State:
                </Typography>
                <MyChip
                  label={userStatus}
                  color={userStatusColor}
                  size="small"
                />
              </Stack>
              <Typography variant="overline" color="textSecondary">
                Created at: {dayjs(user.created).format('MM/DD/YYYY')}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography color="textSecondary" variant="overline">
                  Access:
                </Typography>
                <MyChip
                  label={subscriptionText(accessType)}
                  color={subscriptionColor(accessType)}
                  size="small"
                />
              </Stack>
              <Typography variant="overline" color="textSecondary">
                Last Visited: {dayjs(user.last_visited).format('MM/DD/YYYY')}
              </Typography>
            </Box>

            {statusMessage && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mt: 2 }}>
                  {statusMessage}
                </Alert>
              </Grid>
            )}
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              textColor="secondary"
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label="User tabs"
              orientation={isSmallDevice ? 'vertical' : 'horizontal'}
            >
              <Tab label="Main Settings" {...a11yProps(tabId, 0)} />
              {/* <Tab label="Article Subscription" {...a11yProps(tabId, 1)} /> */}
              {/* <Tab label="Block Logs" {...a11yProps(tabId, 2)} /> */}
              <Tab label="Orders" {...a11yProps(tabId, 1)} />
              <Tab label="Activity" {...a11yProps(tabId, 2)} />
            </Tabs>
          </Box>
          <TabPanel id={tabPanelId} value={value} index={0}>
            <UserMainSettings user={user} />
          </TabPanel>
          {/* <TabPanel id={tabPanelId} value={value} index={1}>
            Article Subscriptions
          </TabPanel>
           <TabPanel id={tabPanelId} value={value} index={2}>
            Block Logs
          </TabPanel> */}
          <TabPanel id={tabPanelId} value={value} index={1}>
            {user && <UserOrdersPanel userId={user._id} />}
          </TabPanel>
          <TabPanel id={tabPanelId} value={value} index={2}>
            {user && (
              <ActivityPanel
                userId={user._id}
                userAnonID={'anon_link_id' in user ? user.anon_link_id : null}
              />
            )}
          </TabPanel>
        </Stack>
      )}
    </CmsLayout>
  )
}

export default UserDetails

const MyChip = styled(Chip)({
  borderRadius: 4,
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: 2
})
