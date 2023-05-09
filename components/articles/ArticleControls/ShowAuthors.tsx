import {
  Box,
  FormControlLabel,
  Typography,
  Checkbox,
  CheckboxProps
} from '@mui/material'

import React from 'react'
import { analytics } from 'apis/analytics'

const ShowAuthors = (props: CheckboxProps & { itemsShown: number }) => {
  const itemsShown = props.itemsShown

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: 'grey.200',
        px: 2
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={props.onChange}
            inputProps={{ 'aria-label': 'controlled' }}
            size="small"
            color="info"
            onClick={analytics.trackClick}
            data-event="Articles - Show Authors"
          />
        }
        label={
          <Typography
            variant="caption"
            fontWeight="bold"
            lineHeight="normal"
            data-event="Articles - Show Authors"
          >
            Show authors
          </Typography>
        }
      />
      <Typography variant="body2" color="#000">
        {itemsShown} shown
      </Typography>
    </Box>
  )
}

export default ShowAuthors
