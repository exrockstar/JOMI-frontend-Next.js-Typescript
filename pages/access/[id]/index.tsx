import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import { IS_SERVER } from 'common/constants'
import AccessLayout from 'components/access/AccessLayout'
import Counter from 'components/access/institution/counter/Counter'
import RequestsTable from 'components/access/institution/requests/RequestsTable'
import ArticleActivityPanel from 'components/access/institution/stats/ArticleActivity/ArticleActivityPanel'
import InstituitonOverviewStats from 'components/access/institution/stats/InstitutionOverview/InstituitonOverviewStats'
import IntitutionUsersPanel from 'components/access/institution/stats/InstitutionUsersStats/InstitutionUsersPanel'
import { useInstitutionByIdQuery } from 'graphql/cms-queries/institutions-list.generated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

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

const InstitutionAccessPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const id = router.query.id as string
  const [value, setValue] = useState(0)
  const tabs = ['', 'users', 'articles', 'reports', 'requests']
  const { data } = useInstitutionByIdQuery({
    variables: {
      id
    }
  })

  const getValue = (tab: string) => {
    const index = tabs.indexOf(tab)
    console.log(index, tab)
    return index
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    const tab = tabs[newValue]
    router.push(`/access/${id}/${tab}`)
  }

  useEffect(() => {
    if (!IS_SERVER && router.isReady) {
      //set the tab based on the URL
      const url = router.pathname.split('/')
      const tabUrl = url[3] ?? ''
      console.log(url)
      const val = getValue(tabUrl)
      setValue(val)
    }
  }, [router.isReady])

  console.log(`data`, data)
  return (
    <Stack p={2}>
      <Box>
        <Typography variant="h3" component="h1">
          {data?.institution?.name}
        </Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          textColor="secondary"
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
          <Tab label="Article Activity" {...a11yProps(2)} />
          <Tab label="Reports" {...a11yProps(3)} />
          <Tab label="Requests" {...a11yProps(4)} />
          {/* <Tab label="Polling" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <InstituitonOverviewStats
          institutionId={id}
          institution={data?.institution}
          key={id}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IntitutionUsersPanel institutionId={id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {data?.institution && (
          <ArticleActivityPanel institution={data?.institution} />
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Counter institutionID={id} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <RequestsTable institutionID={id} />
      </TabPanel>
    </Stack>
  )
}

function InstitutionAccessPageWrapper() {
  return (
    <AccessLayout>
      <InstitutionAccessPage />
    </AccessLayout>
  )
}
export default InstitutionAccessPageWrapper
