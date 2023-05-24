import { Box, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { frontPageTheme } from './theme'
import React, { createRef, memo, useEffect, useState } from 'react'
import PageLoadingIndicator from './common/PageLoadingIndicator'
import AnnouncementContainer from './common/Announcement/AnnouncementContainer'
import Footer2 from './Footer/Footer'
import Navbar from './navbar/Navbar'
import { useAppState } from './_appstate/useAppState'
import UserAnnouncementModal from './common/Announcement/AnnouncementForUserModal'
/**
 * noBackground - e.g. Frontpage has no default background
 * noContainer - e.g. Frontpage doesn't use containers
 */
type Props = {
  noBackground?
  noContainer?: boolean
  enableGutters?: boolean
  noFooter?: boolean
  children: React.ReactNode
}

function Layout({ children, noBackground, noContainer, enableGutters, noFooter }: Props) {
  const [scrollHeight, setScrollHeight] = useState(25)

  const ref = createRef<HTMLDivElement>()

  const Content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} component="main">
      {children}
    </Box>
  )

  useEffect(() => {
    if (ref.current?.clientHeight) {
      setScrollHeight(ref.current?.clientHeight)
    }
  }, [setScrollHeight, scrollHeight, ref])
  const { state } = useAppState()
  const announcementsShown = state.announcementsShown
  return (
    <Box
      height="100%"
      minHeight="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      sx={{
        backgroundColor: noBackground ? null : 'background.default'
      }}
    >
      <PageLoadingIndicator />

      <Navbar />
      <Box visibility={announcementsShown ? 'visible' : 'hidden'}>
        <AnnouncementContainer ref={ref} />
        {noContainer ? (
          Content
        ) : (
          <Container
            maxWidth="lg"
            component="div"
            sx={{
              px: { xs: 0, sm: 0, md: enableGutters ? 2 : 0 },
              mb: { md: 6 }
            }}
          >
            {Content}
          </Container>
        )}

        {!noFooter && (
          <ThemeProvider theme={frontPageTheme}>
            <Footer2 />
            <UserAnnouncementModal />
          </ThemeProvider>
        )}
      </Box>
    </Box>
  )
}

export default memo(Layout)
