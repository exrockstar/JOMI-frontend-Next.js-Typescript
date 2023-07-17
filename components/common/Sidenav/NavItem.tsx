import { Box, Button, ListItem } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import NextLink from 'next/link'

type Props = {
  href: string
  icon: ReactNode
  title: string
  disabled: boolean
}
const NavItem = (props: Props) => {
  const { href, icon, title, disabled } = props
  const router = useRouter()

  const rootPath = router.pathname.split('/').slice(0, 3).join('/')
  const active = href ? rootPath === href : false

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
    >
      <NextLink href={href} passHref legacyBehavior>
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          disabled={disabled}
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.300',
            typography: 'caption',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 2,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  )
}

export default NavItem
