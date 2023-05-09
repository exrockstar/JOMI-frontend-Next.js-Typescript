import { LinkProps } from '@mui/material'

export type NavMenuLink = {
  text: string
  url: string
  rel?: LinkProps['rel']
  target?: LinkProps['target']
}

export type NavMenuItem = NavMenuLink | 'divider'
