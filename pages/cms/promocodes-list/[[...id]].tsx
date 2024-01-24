import {
    Box,
    Stack,
    Typography,
    Tab,
    Tabs,
    useMediaQuery
  } from '@mui/material'
  import { useTheme } from '@mui/material/styles'
  import { IS_SERVER } from 'common/constants'
  import CmsLayout from 'components/cms/CmsLayout'
  import TabPanel, { a11yProps } from 'components/common/TabPanel'
  import { useRouter } from 'next/router'
  import { useEffect, useState } from 'react'
  import PromoCodesList from 'components/cms/promocodes-list/PromoCodesList'
  import SubscriptionCodeList from 'components/cms/promocodes-list/SubscriptionCodesList'
  import TimeCodeList from 'components/cms/promocodes-list/TimedCodesList'
  
  const PromoCodesListPage = () => {
    const [value, setValue] = useState(0)
    const router = useRouter()
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  
    const tabs = ['v6', 'subscription', 'timed']
    const getValue = (route: string) => {
      return tabs.indexOf(route)
    }
  
    const getUrl = (val: number) => {
      return tabs[val]
    }
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
      let url = router.asPath.split('/').slice(0, 3)
      url[3] = getUrl(newValue)
      router.push(`${url.join('/')}`, null, {
        shallow: true
      })
    }
  
    useEffect(() => {
      if (!IS_SERVER && router.isReady) {
        //set the tab based on the URL
        const url = new URL(router.asPath, location.origin).pathname.split('/')
        const tabUrl = url[3]
        const val = getValue(tabUrl)
        setValue(val)
      }
    }, [router.isReady, router.asPath])
  
    const tabId = `promocodes-tab`
    const tabPanelId = tabId + '-panel'
    
    return (
      <CmsLayout>
        <Stack direction={'row'} p={2} pt={5}>
          <Typography variant="h4">Promo Codes</Typography>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="User tabs"
            orientation={isSmallDevice ? 'vertical' : 'horizontal'}
          >
            <Tab label="V6 Code" {...a11yProps(tabId, 0)} />
            <Tab label="Subscription Code" {...a11yProps(tabId, 1)} />
            <Tab label="Timed Code" {...a11yProps(tabId, 2)} />
          </Tabs>
        </Box>  
        <TabPanel id={tabPanelId} value={value} index={0}>
          <PromoCodesList />
        </TabPanel>
        <TabPanel id={tabPanelId} value={value} index={1}>
          <SubscriptionCodeList />
        </TabPanel>
        <TabPanel id={tabPanelId} value={value} index={2}>
          <TimeCodeList />
        </TabPanel>
      </CmsLayout>
    )
  }
  
  export default PromoCodesListPage
  