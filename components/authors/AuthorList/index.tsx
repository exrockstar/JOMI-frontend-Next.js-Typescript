import { memo } from 'react'
import Grid from '@mui/material/Grid'
import { Box, Link as MUILink } from '@mui/material'
import Link from 'next/link'
import { Author } from 'graphql/types'

type Props = {
  authors: any
}

function AuthorList({ authors }: Props) {
  return (
    <>  <Grid item xs={12} md={6}>
      <Box mb={2}>
        {authors.map((author: Author) => {
          const authorUrl = `/author/${author.slug}`
          return (
            <MUILink
              key={author._id}
              component={Link}
              href={authorUrl}
              prefetch={false}
              underline="hover"
              sx={{ display: "block"}}
            >
              {author.display_name}
            </MUILink>
          )
        })}
      </Box>
    </Grid>
    </>
  )
}

export default memo(AuthorList)