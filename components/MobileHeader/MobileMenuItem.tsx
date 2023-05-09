import { ChevronRight } from '@mui/icons-material'
import {
  ListItem,
  IconButton,
  ListItemText,
  Collapse,
  List,
  ListItemProps
} from '@mui/material'
import React from 'react'

export type MobileMenuItemProps = {
  open: boolean
  name: string
  label?: string
  onToggle(name: string): void
}

const MobileMenuItem: React.FC<ListItemProps & MobileMenuItemProps> = ({
  open,
  name,
  children,
  label,
  onToggle
}) => {
  return (
    <div>
      <ListItem
        secondaryAction={
          children && (
            <IconButton onClick={() => onToggle(name)}>
              <ChevronRight
                sx={{
                  transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'all .2s ease'
                }}
              />
            </IconButton>
          )
        }
        divider
        onClick={() => onToggle(name)}
      >
        <ListItemText primary={label} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>{children}</List>
      </Collapse>
    </div>
  )
}

export default MobileMenuItem
