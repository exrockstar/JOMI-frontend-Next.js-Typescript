import { Button, ButtonProps } from '@mui/material'
import React from 'react'

const FeedbackButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      size="small"
      color="warning"
      sx={{ height: 40, width: 40, minWidth: 40, borderRadius: '100%' }}
    />
  )
}

export default FeedbackButton
