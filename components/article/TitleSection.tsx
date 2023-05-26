import { Box, Chip, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'

import React from 'react'
type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}
const TitleSection = ({ article }: Props) => {
  if (!article) return null
  const viewCount = article.stats?.views
  const viewCountLabel = `${viewCount} views`
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2} px={2}>
      <Typography
        component="h1"
        fontSize={{ xs: '1.2em', lg: '1.6em' }}
        lineHeight={{ xs: '1em', lg: '1.4em' }}
        sx={{
          color: 'grey.900'
        }}
      >
        {article.title}
      </Typography>
      {!!viewCount && (
        <Box>
          <ArticlePlayStatsContainer label={viewCountLabel} />
        </Box>
      )}
    </Stack>
  )
}

export default TitleSection

const ArticlePlayStatsContainer = styled(Chip)(({ theme }) => ({
  borderRadius: '5px',
  backgroundColor: theme.palette.grey[500],
  color: '#fff',
  lineHeight: 1
}))
