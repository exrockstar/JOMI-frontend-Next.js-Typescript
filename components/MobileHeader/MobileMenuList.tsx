import {
  Divider,
  List,
  ListItemButton,
  Typography,
  MenuList,
  Link as MuiLink
} from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { menuData } from './menu-data'
import MobileMenuItem from './MobileMenuItem'
import Link from 'next/link'
import { Close, OpenInNew } from '@mui/icons-material'

import { analytics } from 'apis/analytics'
import LoginMenu from './LoginMenu'
import { useRouter } from 'next/router'

const MobileMenuList = () => {
  const [openNav, setOpenNav] = useState<{ [key: string]: boolean }>({
    account: true //default open account menu so that "purchase subscription" can be seen.
  })
  const router = useRouter()
  const handleClick = (name: string) => {
    setOpenNav({
      [name]: !openNav[name]
    })
  }

  return (
    <MenuList sx={{ backgroundImage: 'none' }}>
      <LoginMenu
        onToggle={() => handleClick('account')}
        open={!!openNav['account']}
      />
      {menuData?.map((item) => {
        return (
          <MobileMenuItem
            key={item.name}
            onToggle={handleClick}
            open={openNav[item.name]}
            name={item.name}
            label={item.label}
          >
            {item.subItems && (
              <List disablePadding>
                {item.subItems.map((subitem, index, arr) => {
                  if ('kind' in subitem) return <Divider />
                  const last = index + 1 === arr.length
                  const onClick = subitem.externalLink
                    ? analytics.trackOutboundClick
                    : analytics.trackClick
                  const eventLabel = `Mobile Menu - ${item.label} - ${subitem.label}`
                  const button = (
                    <ListItemButton
                      sx={{ pl: 3 }}
                      divider={last}
                      data-event={eventLabel}
                      onClick={onClick}
                    >
                      <Typography data-event={eventLabel} component="span">
                        {subitem.label}
                      </Typography>
                      {subitem.externalLink && (
                        <OpenInNew
                          fontSize="small"
                          sx={{ ml: 2 }}
                          data-event={eventLabel}
                        />
                      )}
                    </ListItemButton>
                  )

                  const noNextLink = subitem.externalLink || subitem.noNextLink

                  return noNextLink ? (
                    <MuiLink
                      href={subitem.href}
                      key={index}
                      sx={{ color: 'white' }}
                      target={subitem.externalLink ? '_blank' : undefined}
                      rel={subitem.rel ?? 'noreferrer noopener nofollow'}
                      display="flex"
                    >
                      {button}
                    </MuiLink>
                  ) : (
                    <Link
                      passHref
                      href={subitem.href}
                      key={index}
                      prefetch={false}
                      legacyBehavior
                    >
                      {button}
                    </Link>
                  )
                })}
              </List>
            )}
          </MobileMenuItem>
        )
      })}
    </MenuList>
  )
}
export default memo(MobileMenuList)
