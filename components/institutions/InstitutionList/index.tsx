import { memo } from 'react'
import Grid from '@mui/material/Grid'
import { Box, Link as MUILink } from '@mui/material'
import Link from 'next/link'

type Props = {
  institutions: string[]
}

function InstitutionList({ institutions }: Props) {
  return (
    <Grid item xs={12} md={6} sx={{ pt: 0 }}>
      <Box >
        {institutions.map((inst: string) => {
          const instUrl = `/search?q=${inst}`
          return (
            <MUILink
              key={inst}
              component={Link}
              href={instUrl}
              prefetch={false}
              underline="hover"
              sx={{ 
                display: "block",
              }}
            >
              {inst}
            </MUILink>
          )
        })}
      </Box>
    </Grid>
  )
}

export default memo(InstitutionList)