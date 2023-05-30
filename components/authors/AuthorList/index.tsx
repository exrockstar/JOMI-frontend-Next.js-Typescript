import { memo } from 'react'
import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
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
          const authorUrl = `/search?q=${author.slug}`
          return (<Box key={author._id} sx={{
            cursor: "pointer",
            ':hover': {
              textDecoration: "underline"
            }
          }}>
            <Link href={authorUrl} passHref prefetch={false} legacyBehavior>
              <Typography>
                {author.display_name}
              </Typography>
            </Link>
          </Box>
          )
        })}
      </Box>
    </Grid>
    </>
  )
}

export default memo(AuthorList)