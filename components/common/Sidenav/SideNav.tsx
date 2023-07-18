import {
  useMediaQuery,
  Drawer,
  Box,
  Divider,
  Button,
  Link as MuiLink,
  Stack
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logo from 'components/common/Logo'
import NextLink from 'next/link'
import { ReactNode } from 'react'

import NavItem from './NavItem'
import { SidenavItem } from './SideNavItem'

type Props = {
  open: boolean
  onClose: () => void
  items: SidenavItem[]
  rootUrl?: string
  additionalButtons?: ReactNode[]
}

const SideNav = (props: Props) => {
  const { open, onClose, items, rootUrl = '/cms', additionalButtons } = props
  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  })
  const content = (
    <div>
      <Box px={2}>
        <Logo height={90} href={rootUrl} />
      </Box>
      <Stack px={2} alignItems="flex-start">
        <NextLink href={'/'} passHref legacyBehavior>
          <Button component={MuiLink} sx={{ color: '#FFF' }}>
            Back to site
          </Button>
        </NextLink>

        {additionalButtons}
      </Stack>
      <Divider
        sx={{
          borderColor: '#2D3748',
          my: 3
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            href={item.url}
            title={item.name}
            disabled={item.disabled}
          />
        ))}
      </Box>
    </div>
  )

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={lgUp ? 'persistent' : 'temporary'}
    >
      {content}
    </Drawer>
  )
}

export default SideNav
