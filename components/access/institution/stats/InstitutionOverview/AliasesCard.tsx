import { Card, Box, Typography } from '@mui/material'
import React from 'react'
type Props = {
  aliases: string[]
}
const AliasesCard = ({ aliases }: Props) => {
  return (
    <Card>
      <Box p={2}>
        <Typography color="text.primary" variant="h5">
          Aliases
        </Typography>
        {aliases.map((alias) => {
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

export default AliasesCard
