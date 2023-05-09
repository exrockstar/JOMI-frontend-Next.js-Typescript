import React from 'react'
import FooterLink, { FooterLinkProps } from './FooterLink'

const SocialLink = ({ children, ...props }: FooterLinkProps) => {
  return (
    <FooterLink
      {...props}
      linkProps={{
        sx: {
          display: 'flex',
          alignItems: 'center',
          color: { md: 'grey.500', xs: 'grey.400' },
          fontFamily: 'DM Sans, Arial, Helvetica, sans-serif;',
          gap: 1
        }
      }}
    >
      {children}
    </FooterLink>
  )
}

export default SocialLink
