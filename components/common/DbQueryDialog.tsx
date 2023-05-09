import { Close } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton
} from '@mui/material'
import React from 'react'

type Props = {
  queryStr: string
} & DialogProps
const DbQueryDialog = ({ queryStr, ...props }: Props) => {
  return (
    <Dialog {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          pr: 1
        }}
      >
        <DialogTitle>MongoDB Aggregate Query</DialogTitle>
        <IconButton
          onClick={() => props.onClose && props.onClose('', 'backdropClick')}
        >
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <pre>{queryStr}</pre>
      </DialogContent>
    </Dialog>
  )
}

export default DbQueryDialog
