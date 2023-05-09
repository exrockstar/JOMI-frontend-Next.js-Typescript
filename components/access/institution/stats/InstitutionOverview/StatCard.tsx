import { Card, Box, Typography, Grid } from '@mui/material'
import React from 'react'

type Props = {
  label: string
  value: any
}
const StatCard = ({ label, value }: Props) => {
  return (
    <Card>
      <Box p={2} width={250}>
        <Typography color="text.secondary" gutterBottom variant="overline">
          {label}
        </Typography>
        <Typography color="text.primary" variant="h4">
          {value}
        </Typography>
      </Box>
    </Card>
  )
}

export default StatCard
