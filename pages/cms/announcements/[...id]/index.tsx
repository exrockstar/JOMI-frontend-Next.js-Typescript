import { Stack, Tabs, Tab, Box, Typography } from '@mui/material'
import { IS_SERVER } from 'common/constants'
import AnnouncementDetails from 'components/cms/announcements/AnnouncementDetails/AnnouncementDetails'
import AnnouncementStats from 'components/cms/announcements/AnnouncementStats/AnnouncementStats'
import CmsLayout from 'components/cms/CmsLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const AnnouncementDetailsPage = () => {
  const router = useRouter()
  const queryId = router.query.id
  const id = queryId instanceof Array ? queryId[0] : queryId
  const [value, setValue] = useState(0)
  const tabs = ['', 'stats', 'restrictions']

  const getValue = (route: string) => {
    return tabs.indexOf(route)
  }

  const getUrl = (val: number) => {
    return tabs[val]
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    const url = router.asPath.split('/')
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
  }, [router.isReady])

  return (
    <CmsLayout>
      <Stack p={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Stats" {...a11yProps(1)} />
            <Tab label="Restrictions" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AnnouncementDetails announcementId={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AnnouncementStats _id={id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Stack>
            <Typography variant="h4">Restrictions</Typography>
          </Stack>
        </TabPanel>
      </Stack>
    </CmsLayout>
  )
}

export default AnnouncementDetailsPage
