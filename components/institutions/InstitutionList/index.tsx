import { memo } from 'react'
import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

type Props = {
  institutions: string[]
}

function InstitutionList({ institutions }: Props) {
  return (<Grid item xs={12} md={6} sx={{ pt: 0 }}>
    <Box >
      {institutions.map((inst: string, index: number) => {
        const instUrl = `/search?q=${inst}`
        return (<Box key={index} sx={{
          cursor: "pointer",
          ':hover': {
            textDecoration: "underline"
          }
        }}><Link href={instUrl} passHref prefetch={false} legacyBehavior>
            <Typography>
              {inst}
            </Typography>
          </Link>
        </Box>)
      })}
    </Box>
  </Grid>
  )
}

export default memo(InstitutionList)