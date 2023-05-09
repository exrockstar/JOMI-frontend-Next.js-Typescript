import {
  AppBar,
  Stack,
  Button,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Hidden
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import { memo } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/router'
type Props = {
  onSidebarOpen(): void
  isSidebarOpen: boolean
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}))

const StatusBar = ({ onSidebarOpen, isSidebarOpen }: Props) => {
  const router = useRouter()
  return (
    <DashboardNavbarRoot
      sx={{
        left: {
          lg: isSidebarOpen ? 280 : 0
        },
        width: {
          lg: isSidebarOpen ? 'calc(100% - 280px)' : '100%'
        }
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2
        }}
      >
        <IconButton onClick={onSidebarOpen}>
          <MenuIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1 }}
          textAlign={{ xs: 'center', md: 'left' }}
          color="text.primary"
        >
          JOMI CMS
        </Typography>

        <Hidden mdDown>
          <Box>
            <Stack direction="row" spacing="2">
              <Button color="primary" href="/cms">
                Back to Dashboard
              </Button>
              <Button color="primary" href="/">
                Back to the Site
              </Button>
              <Button color="primary" href="/access">
                Access Portal
              </Button>
            </Stack>
          </Box>
        </Hidden>
      </Toolbar>
    </DashboardNavbarRoot>
  )
}

export default memo(StatusBar)
