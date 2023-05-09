import { memo, useEffect, useRef, useState } from 'react'
import {
  CircularProgress,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Stack
} from '@mui/material'
import dynamic from 'next/dynamic'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
import { useOnClickOutside } from 'usehooks-ts'
// import { LoginForm } from 'components/auth/LoginForm'
const LoginForm = dynamic(
  () => import('components/navbar/login/NewLoginForm'),
  {
    loading: () => (
      <Stack
        minHeight={{ xs: '100%', md: 460 }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Stack>
    )
  }
)
function LoginDropdown() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const ref = useRef<HTMLDivElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!open) {
      setAnchorEl(event.currentTarget)
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      console.log(e.key)
      if (e.key === 'Escape' && open) {
        setAnchorEl(null)
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useOnClickOutside(ref, () => setAnchorEl(null))
  return (
    <div>
      <CTAButtonOutlined
        id="login-button"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
      >
        Log In
      </CTAButtonOutlined>

      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        style={{ zIndex: 2000 }}
        placement="bottom-end"
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top'
            }}
          >
            <Paper
              elevation={8}
              ref={ref}
              sx={{ bgcolor: 'grey.800', width: 300 }}
            >
              <LoginForm />
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default memo(LoginDropdown)
