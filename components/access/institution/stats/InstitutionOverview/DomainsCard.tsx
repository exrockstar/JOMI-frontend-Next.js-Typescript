import { Card, Box, Typography } from '@mui/material'
import React from 'react'
type Props = {
  domains: string[]
}
const DomainsCard = ({ domains }: Props) => {
  return (
    <Card>
      <Box p={2}>
        <Typography color="text.primary" variant="h5">
          Domains
        </Typography>
        {domains.map((alias) => {
          return (
            <Typography color="text.secondary" key={alias}>
              {alias}
            </Typography>
          )
        })}
      </Box>
    </Card>
  )
}

export default DomainsCard
