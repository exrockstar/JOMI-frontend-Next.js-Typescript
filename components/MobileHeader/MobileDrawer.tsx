import {
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  useMediaQuery
} from '@mui/material'
import Popper, { PopperProps } from '@mui/material/Popper'
import Slide from '@mui/material/Slide'
import { ThemeProvider } from '@mui/material/styles'
import { frontPageTheme } from 'components/theme'
import { isTouchDevice } from 'components/utils/helpers'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'
import MobileMenuList from './MobileMenuList'

type MobileDrawerProps = {
  scrollHeight: number
  hasScrolled: boolean
  onClose(): void
} & PopperProps

function MobileDrawer({
  open,
  hasScrolled,
  anchorEl,
  onClose
}: MobileDrawerProps) {
  const theme = frontPageTheme
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))

  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', onClose)
  }, [router.events])

  return (
    <Popper
      open={open}
      placement="auto"
      anchorEl={anchorEl}
      style={{
        zIndex: theme.zIndex.appBar - 2
      }}
      disablePortal
      transition
    >
      {({ TransitionProps }) => (
        <Slide {...TransitionProps}>
          <Paper
            sx={{
              borderRadius: 0,
              backgroundImage: 'none',
              width: '100vw',
              height: 'calc(100vh - 162px)'
            }}
          >
            <MobileMenuList />
          </Paper>
        </Slide>
      )}
    </Popper>
  )
}

export default memo(MobileDrawer)
