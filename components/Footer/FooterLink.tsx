import Link, { LinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

import React, { PropsWithChildren } from 'react'
import { analytics } from 'apis/analytics'

export type FooterLinkProps = LinkProps &
  PropsWithChildren & {
    linkProps?: MuiLinkProps
    target?: MuiLinkProps['target']
    rel?: MuiLinkProps['rel']
  }

const FooterLink = ({ linkProps, children, ...props }: FooterLinkProps) => {
  return (
    <Link {...props} passHref legacyBehavior>
      <MuiLink
        sx={{
          color: { xs: 'grey.400', md: 'grey.500' },
          fontFamily: 'DM Sans, Arial, Helvetica, sans-serif;',
          lineHeight: 1.0
        }}
        data-event={props['data-event']}
        onClick={analytics.trackClick}
        {...linkProps}
      >
        {children}
      </MuiLink>
    </Link>
  )
}

export default FooterLink
