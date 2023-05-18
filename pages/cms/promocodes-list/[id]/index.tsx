import {
  Stack,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Divider,
  Link,
  Chip,
  Tabs,
  Tab,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CmsLayout from 'components/cms/CmsLayout'
import { useGetStripePromoCodeQuery } from 'graphql/cms-queries/stripe-promo-codes.generated'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import dayjs from 'dayjs'
import { isProduction, IS_SERVER } from 'common/constants'
import { useEffect, useState } from 'react'
import TabPanel, { a11yProps } from 'components/common/TabPanel'
import StripePromoCodeDetails from 'components/cms/promocodes-list/StripePromoCodeDetails'
import StripeRedeemPage from 'components/cms/promocodes-list/StripeRedeemPage'
const STRIPE_BASE_URL = isProduction
  ? `https://dashboard.stripe.com`
  : `https://dashboard.stripe.com/test`
const PromoCodeDetails = () => {
  const router = useRouter()
  const id = router.query.id as string
  const [value, setValue] = useState(0)
  const { data, loading, error } = useGetStripePromoCodeQuery({
    variables: {
      id
    }
  })
  const tabs = ['', 'redemptions']
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const getValue = (route: string) => {
    return tabs.indexOf(route)
  }

  const getTab = (val: number) => {
    return tabs[val]
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    const tab = getTab(newValue)
    router.push(`/cms/promocodes-list/${id}/${tab}`, null, { shallow: true })
  }

  useEffect(() => {
    if (!IS_SERVER && router.isReady) {
      console.log(router)
      //set the tab based on the URL
      const url = router.pathname.split('/')
      const tabUrl = url[4] ?? ''
      const val = getValue(tabUrl)
      setValue(val)
    }
  }, [router.isReady, router.asPath])

  const promocode = data?.getStripePromoCode
  const tabId = `promocode-tab`
  const tabPanelId = tabId + '-panel'

  return (
    <CmsLayout>
      {!promocode ? (
        <Stack alignItems="center" justifyContent="center" height="90vh">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error.message}</Alert>}
        </Stack>
      ) : (
        <Stack p={2} minHeight="90vh">
          <Box>
            <Typography variant="h4" component="h1">
              Promo Code : {promocode.code}
            </Typography>
            <Typography variant="caption">
              Database ID: {promocode._id}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              textColor="secondary"
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label="Stripe promocode tabs"
              orientation={isSmallDevice ? 'vertical' : 'horizontal'}
            >
              <Tab label="Details" {...a11yProps(tabId, 0)} />
              <Tab label="Redemptions" {...a11yProps(tabId, 1)} />
            </Tabs>
          </Box>
          <TabPanel id={tabPanelId} value={value} index={0}>
            <StripePromoCodeDetails promocode={promocode} />
          </TabPanel>
          <TabPanel id={tabPanelId} value={value} index={1}>
            <StripeRedeemPage />
          </TabPanel>
        </Stack>
      )}
    </CmsLayout>
  )
}
export default PromoCodeDetails
