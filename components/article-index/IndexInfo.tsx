import { Box } from '@mui/material'
import React from 'react'
type Props = {
  indexInfo: string
}

const IndexInfo = ({ indexInfo }: Props) => {
  return (
    <Box sx={{ a: { color: 'linkblue.main' } }}>
      <div dangerouslySetInnerHTML={{ __html: indexInfo }} />
    </Box>
  )
}

export default IndexInfo
