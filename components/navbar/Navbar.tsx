import { AppBar, Badge, Box, Button, Container, IconButton, Menu, Toolbar, useMediaQuery } from '@mui/material'
import { frontPageTheme } from 'components/theme'
import { ThemeProvider } from '@mui/material/styles'
import LogoWhite from 'public/logo-white.svg'
import NavMenu from './NavMenu'
import Link from 'next/link'
import SearchBar from 'components/navbar/account/SearchBar'
import CTAButton from 'components/common/CTAButton'
import MenuIcon from 'components/MobileHeader/MenuIcon'
import { useEffect, useRef, useState } from 'react'
import MobileDrawer from 'components/MobileHeader/MobileDrawer'
import { useSession } from 'next-auth/react'
import AccountDropdown from './account/AccountDropdown'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
import { IS_SERVER } from 'common/constants'
import LoginDropdown from './login/LoginDropdown'
import { useRouter } from 'next/router'
import AnnouncementContainer from 'components/common/Announcement/AnnouncementContainer'
import { Notifications } from '@mui/icons-material'
import { useAppState } from 'components/_appstate/useAppState'
const Navbar = () => {
  const theme = frontPageTheme
  const scrollHeight = 84
  const router = useRouter()
  const [hasScrolled, setHasScrolled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const drawerOpen = Boolean(anchorEl)
  const { data: session } = useSession()
  const { personalAnnouncements, setShowPersonalAnnouncements } = useAppState()
  const toggleDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(ref.current)
    }
  }
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > scrollHeight) {
        setHasScrolled(true)
      }

      if (window.scrollY <= 0) {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [scrollHeight])
  const isSignUpPage = router.pathname.startsWith('/signup') || router.pathname.startsWith('/login')
  const isTransparentBg = !hasScrolled && !isSignUpPage
  return (
    <ThemeProvider theme={frontPageTheme}>
      <AppBar
        sx={{
          zIndex: drawerOpen ? 2000 : theme.zIndex.appBar,
          backgroundImage: 'none',
          backgroundColor: isTransparentBg ? 'transparent' : 'header.main',
          transitionProperty: 'all',
          transitionDuration: '.2s',
          transitionTimingFunction: 'ease-in-out',
          top: { xs: -1, md: 0 },
          backdropFilter: isTransparentBg ? `blur(12px)` : 'unset'
        }}
        position="sticky"
        elevation={0}
        ref={ref}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar sx={{ height: 84, px: 2 }} disableGutters>
            <Box display={'flex'} alignItems="center" flexGrow={1}>
              <Link href="/" passHref>
                <LogoWhite style={{ marginTop: 10 }} />
              </Link>
              <Box display={{ xs: 'none', md: 'flex' }} gap={2} ml={8}>
                <NavMenu
                  buttonText="Articles"
                  items={[
                    {
                      text: 'Article Index',
                      url: '/index'
                    },
                    {
                      text: 'Most Recent',
                      url: '/articles'
                    },
                    'divider',
                    {
                      text: 'General Surgery',
                      url: '/index#general-surgery'
                    },
                    {
                      text: 'Orthopaedics',
                      url: '/index#orthopaedics'
                    },
                    {
                      text: 'Otolaryngology',
                      url: '/index#otolaryngology'
                    },
                    {
                      text: 'More...',
                      url: '/index#toc'
                    }
                  ]}
                />
                <NavMenu
                  buttonText="About"
                  items={[
                    {
                      text: 'About JOMI',
                      url: '/about'
                    },
                    {
                      text: 'Editorial Board',
                      url: '/editorial-board'
                    },
                    {
                      text: 'Subscribing Institutions',
                      url: '/subscribers'
                    },
                    {
                      text: 'News',
                      url: 'https://blog.jomi.com/category/announcement/'
                    },
                    {
                      text: 'Careers',
                      url: '/careers'
                    },
                    {
                      text: 'Contact Us',
                      url: '/contact'
                    }
                  ]}
                />
                <NavMenu
                  buttonText="Publish"
                  items={[
                    {
                      text: 'Peer Review Process',
                      url: 'https://docs.google.com/document/d/1TAEPN0-LVIyZw6hLd44O3YXfPwCRK83w7UtnqiNHESE/edit'
                    },
                    {
                      text: 'Submit Publication',
                      url: '/publish'
                    }
                  ]}
                />
                <NavMenu
                  buttonText="Subscribe"
                  items={[
                    {
                      text: 'Individual',
                      url: '/account/subscription'
                    },
                    {
                      text: 'Institutional',
                      url: '/institutional-access'
                    }
                  ]}
                />
              </Box>
            </Box>

            <Box display={{ xs: 'none', md: 'flex' }} alignItems="stretch" gap={2.5} height={44}>
              <SearchBar />
              {!session?.user ? (
                <Box display={'flex'} gap={2.5}>
                  <Link
                    href={{
                      pathname: '/signup',
                      query: {
                        from: '/'
                      }
                    }}
                    passHref
                    legacyBehavior
                  >
                    <CTAButton sx={{ px: 2.5, ml: 2 }}>Sign Up</CTAButton>
                  </Link>
                  <LoginDropdown />
                </Box>
              ) : (
                <Box display="flex">
                  {!!personalAnnouncements.count && (
                    <Badge badgeContent={personalAnnouncements.count} color="error">
                      <Notifications
                        fontSize="large"
                        sx={{
                          cursor: 'pointer'
                        }}
                        onClick={() => setShowPersonalAnnouncements(true)}
                      />
                    </Badge>
                  )}
                  <AccountDropdown />
                </Box>
              )}
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
              {!!personalAnnouncements.count && (
                <Badge badgeContent={personalAnnouncements.count} color="error">
                  <Notifications
                    sx={{
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowPersonalAnnouncements(true)}
                  />
                </Badge>
              )}
              <IconButton
                color="secondary"
                sx={{
                  transition: 'all .2s ease'
                }}
                onClick={toggleDrawer}
              >
                <MenuIcon open={drawerOpen} />
              </IconButton>
            </Box>
          </Toolbar>
          <Box display={{ xs: 'flex', md: 'none' }} px={2} pb={2}>
            <SearchBar
              sx={{
                borderColor: 'grey.700',
                backgroundColor: 'grey.800',
                borderStyle: 'solid',
                borderWidth: '1px',
                width: '100%'
              }}
            />
          </Box>
        </Container>
      </AppBar>

      <MobileDrawer
        open={drawerOpen}
        scrollHeight={scrollHeight}
        hasScrolled={hasScrolled}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      />
    </ThemeProvider>
  )
}

export default Navbar
