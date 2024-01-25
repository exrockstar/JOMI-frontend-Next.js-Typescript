import React, { Fragment, memo, useEffect } from 'react'
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MainText from './MainText'
import Outline from './Outline'

import {
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses
} from '@mui/base'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { IS_SERVER, LOCALES } from 'common/constants'
import { analytics } from 'apis/analytics'
import { isServer } from 'components/utils/isServer'
import { BlueLink } from 'components/common/BlueLink'
import { modifyHeaders } from 'components/utils/helpers'

const CustomTab = styled(TabUnstyled)(({ theme }) => ({
  color: theme.palette.linkblue.main,
  backgroundColor: 'white',
  border: 'none',
  fontSize: theme.typography.body2.fontSize,
  padding: 12,
  transform: 'translateY(1px)',
  '&:hover ': {
    textDecoration: 'underline',
    cursor: 'pointer'
  },

  [`&.${tabUnstyledClasses.selected}`]: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: '1px solid white',
    textDecoration: 'underline'
  }
}))

const CustomTabMobile = styled(TabUnstyled)(({ theme }) => ({
  color: theme.palette.linkblue.main,
  backgroundColor: 'white',
  fontSize: theme.typography.body2.fontSize,
  border: 'none',
  borderTop: `1px solid ${theme.palette.divider}`,
  width: '100%',
  paddingTop: 8,
  paddingBottom: 8,
  '&:hover ': {
    cursor: 'pointer'
  },

  [`&.${tabUnstyledClasses.selected}`]: {
    fontWeight: 700,
    backgroundColor: theme.palette.grey.A200
  }
}))

const CustomTabsList = styled(TabsListUnstyled)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  alignContent: 'space-between',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

function _TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      p={2.5}
    >
      {children}
    </Box>
  )
}
const TabPanel = memo(_TabPanel)

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function BasicTabs({ article }) {
  const isSmallDevice = useMediaQuery('(max-width:600px)')
  const router = useRouter()
  let tabs = []
  if (!article?.disableMainTab) tabs.push('')
  if (!article?.disableProcedureTab) tabs.push('procedure-outline')
  if (!article?.disableTranscriptTab) tabs.push('transcript')

  const params = router.query.slug
  const [id, slug, text] = Array.isArray(params) ? [...params] : [params]

  const getValue = (url: string) => {
    return Math.max(tabs.indexOf(url), 0)
  }
  const getUrl = (val: number) => {
    return tabs[val] ?? ''
  }

  const [value, setValue] = React.useState(getValue(text) || 0)

  useEffect(() => {
    const val = getValue(text)
    setValue(val)
  }, [text])

  const handleChange = (event: any, newValue: number) => {
    event.preventDefault()

    let text = getUrl(newValue)
    const slugQuery = router.query.slug
    let params = Array.isArray(slugQuery) ? slugQuery : [slugQuery]
    const language = params.find((param) => LOCALES.includes(param))
    const [id, slug] = params
    params = [id, slug, text, language].filter((val) => !!val)
    router
      .push(
        {
          query: {
            ...router.query,
            slug: params
          }
        },
        null,
        { shallow: true }
      )
      .then(() => {
        setValue(newValue) //only change tabs after route completed
      })
    analytics.event('Click', `Article Tabs - ${text.trim() || 'Main'}`)
  }

  const getTabParams = (val: number) => {
    let text = getUrl(val)
    const slugQuery = router.query.slug
    let params = Array.isArray(slugQuery) ? slugQuery : [slugQuery]
    const language = params.find((param) => LOCALES.includes(param))
    const [id, slug] = params

    params = [id, slug, text, language].filter((val) => !!val)
    return '/article/' + params.join('/')
  }
  const Tab = isSmallDevice ? CustomTabMobile : CustomTab
  const currentTab = getUrl(value)

  return (
    <Box width={'100%'}>
      <Box ml={isSmallDevice ? 0 : 2} mt={isSmallDevice ? 0 : 1}>
        <TabsUnstyled
          value={value}
          onChange={handleChange}
          aria-label="article-tabs"
        >
          <CustomTabsList
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mr: { md: 0, lg: 3 }
            }}
          >
            {tabs.map((tab, i) => {
              switch (tab) {
                case '':
                  return (
                    <Tab
                      {...a11yProps(i)}
                      component={BlueLink}
                      href={getTabParams(i)}
                      sx={{ textAlign: 'center' }}
                    >
                      Main Text
                    </Tab>
                  )
                case 'procedure-outline':
                  return (
                    <Tab
                      {...a11yProps(i)}
                      component={BlueLink}
                      href={getTabParams(i)}
                      sx={{ textAlign: 'center' }}
                    >
                      Procedure Outline
                    </Tab>
                  )
                case 'transcript':
                  return (
                    <Tab
                      {...a11yProps(i)}
                      component={BlueLink}
                      href={getTabParams(i)}
                      sx={{ textAlign: 'center' }}
                    >
                      Transcript
                    </Tab>
                  )
                default:
                  break
              }
            })}
          </CustomTabsList>
        </TabsUnstyled>
      </Box>
      {[currentTab].map((tab, i) => {
        switch (tab) {
          case '':
            return (
              <TabPanel>
                <MainText
                  text={article?.content?.article}
                  toc={article?.content?.toc}
                  citations={article?.content?.citations}
                  article={article}
                />
              </TabPanel>
            )
          case 'procedure-outline':
            return (
              <TabPanel>
                <Outline
                  otoc={article?.content?.otoc}
                  outline={article?.content?.outline}
                />
              </TabPanel>
            )
          case 'transcript':
            return (
              <TabPanel>
                <Box component="section">
                  <Typography variant="h2" fontSize={28}>
                    Transcription
                  </Typography>
                  <Box
                    sx={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      color: 'grey.800',
                      lineHeight: 1.42857143,
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                      p: {
                        margin: '0 0 10px'
                      },
                      '.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6': {
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontWeight: 'unset',
                        lineHeight: 1.1,
                        color: 'inherit'
                      },
                      h3: {
                        fontSize: '1.5em'
                      },
                      h4: {
                        fontSize: '1.25em'
                      }
                    }}
                    dangerouslySetInnerHTML={{
                      __html: modifyHeaders(article?.content?.transcription)
                    }}
                  />
                </Box>
              </TabPanel>
            )
        }
      })}
    </Box>
  )
}

export default memo(BasicTabs)
