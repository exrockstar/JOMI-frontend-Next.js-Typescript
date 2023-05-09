import { Close } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  ListItemButton,
  Stack
} from '@mui/material'
import { defaultTheme, frontPageTheme } from 'components/theme'
import { useSession } from 'next-auth/react'
import React, { memo, useState } from 'react'
import AccountMenuItem from './AccountMenuItem'
import { ThemeProvider } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import PurchaseSubscriptionItem from './PurchaseSubscriptionItem'

const LoginForm = dynamic(
  () => import('components/navbar/login/NewLoginForm'),
  {
    loading: () => (
      <Stack
        minHeight={{ xs: '100%' }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Stack>
    )
  }
)

type Props = {
  onToggle(name: string): void
  open: boolean
}

const LoginMenu = ({ onToggle, open }: Props) => {
  const { data: session, status } = useSession()
  const [loginOpen, setLoginOpen] = useState(false)
  const isLoggedIn = session?.user && status !== 'loading'

  console.log(loginOpen)
  return isLoggedIn ? (
    <AccountMenuItem name="account" onToggle={onToggle} open={open} />
  ) : (
    <div>
      <ListItemButton onClick={() => setLoginOpen(true)} divider>
        Sign in
      </ListItemButton>
      <PurchaseSubscriptionItem noIcon />
      {loginOpen && (
        <ThemeProvider theme={frontPageTheme}>
          <Dialog
            fullScreen
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            sx={{ zIndex: 2100 }}
          >
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <IconButton onClick={() => setLoginOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent>
              <LoginForm
                onComplete={() => {
                  setLoginOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </ThemeProvider>
      )}
    </div>
  )
}

export default memo(LoginMenu)
