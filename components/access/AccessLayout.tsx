import { Box, Button, Link as MuiLink } from '@mui/material'
import { styled, ThemeProvider } from '@mui/material/styles'
import { cmsTheme } from 'components/cmsTheme'
import PageLoadingIndicator from 'components/common/PageLoadingIndicator'
import { useSession } from 'next-auth/react'
import AdapterDayjs from '@mui/lab/AdapterDayjs'
import React, { PropsWithChildren, useState } from 'react'
import { UserRoles } from 'graphql/types'
import SideNav from 'components/common/Sidenav/SideNav'
import { SidenavItem } from 'components/common/Sidenav/SideNavItem'
import { Domain, Event, OpenInNew } from '@mui/icons-material'
import Error403 from 'components/error-pages/Error403'
import { LocalizationProvider } from '@mui/lab'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}))

const AccessLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: session, status } = useSession()
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const role = session?.user?.role
  const isAuthorized = role === UserRoles.Admin || role === UserRoles.Librarian
  // if (status !== 'loading' && !isAuthorized) {
  //   return <Error403 />
  // }

  const items: SidenavItem[] = [
    {
      icon: <Domain />,
      name: 'Institutions',
      url: '/access',
      disabled: false
    },
    {
      icon: <Event />,
      name: 'Events',
      url: '/access/events',
      disabled: false
    }
  ]

  const buttons =
    role === UserRoles.Admin
      ? [
          <Button
            key="access"
            component={MuiLink}
            endIcon={<OpenInNew />}
            sx={{ color: '#FFF' }}
            target="_blank"
            href="/cms"
          >
            CMS
          </Button>
        ]
      : []
  return (
    <ThemeProvider theme={cmsTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DashboardLayoutRoot>
          <PageLoadingIndicator />
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
        <SideNav
          open={isSidebarOpen}
          rootUrl="/access"
          onClose={() => {
            setSidebarOpen(false)
          }}
          items={role === UserRoles.Admin ? items : []}
          additionalButtons={buttons}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default AccessLayout
