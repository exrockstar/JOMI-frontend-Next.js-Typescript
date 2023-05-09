import {
  Button,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
  Divider
} from '@mui/material'
import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import Link from 'next/link'
import { NavMenuItem } from './NavMenuItem'

export type NavMenuProps = {
  buttonText: string
  items: NavMenuItem[]
}
const NavMenu = ({ buttonText, items }: NavMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
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
  return (
    <div>
      <NavButton
        id="nav-button"
        aria-controls={open ? 'nav-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={!open ? <ExpandMore /> : <ExpandLess />}
        sx={{
          color: open ? 'grey.50' : undefined
        }}
      >
        {buttonText}
      </NavButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        style={{ zIndex: 4000 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'left top'
            }}
          >
            <Paper
              sx={{
                py: 2,
                borderRadius: 2,
                borderTopLeftRadius: 0
              }}
              elevation={8}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {items.map((item, i) => {
                    if (item === 'divider') {
                      return <Divider sx={{ my: 4 }} key={i} />
                    }
                    return (
                      <MenuItem
                        onClick={handleClose}
                        sx={{ px: 2.5 }}
                        component={Link}
                        href={item.url}
                        target={item.target}
                        rel={item.rel}
                        autoFocus={i === 0}
                        tabIndex={i === 0 ? 0 : -1} //enables arrow keys for accessibility
                        key={i}
                      >
                        {item.text}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default NavMenu

export const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[400],
  textTransform: 'none',
  '&:hover': {
    color: theme.palette.grey[50],
    backgroundColor: 'inherit',
    boxShadow: 'none'
  }
}))
