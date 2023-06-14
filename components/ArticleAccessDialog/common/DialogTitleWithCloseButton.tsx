import { Close } from '@mui/icons-material'
import { DialogTitle, IconButton } from '@mui/material'
import React from 'react'

type Props = {
  onClose(): void
  title: string
}
const DialogTitleWithCloseButton = ({ title, onClose }: Props) => {
  return (
    <DialogTitle
      sx={{
        pr: 2,
        typography: 'h5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <span>{title}</span>
      <IconButton size="small" onClick={onClose}>
        <Close />
      </IconButton>
    </DialogTitle>
  )
}

export default DialogTitleWithCloseButton
