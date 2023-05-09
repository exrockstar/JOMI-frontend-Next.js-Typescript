import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Box, Typography } from '@mui/material'

type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}
const PreprintNotice = ({ article }: Props) => {
  if (article.status !== 'preprint') return null

  return (
    <Wrapper>
      <Typography letterSpacing={1.5} fontWeight={500} lineHeight="100%">
        PREPRINT
      </Typography>
    </Wrapper>
  )
}

export default PreprintNotice

const Wrapper = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.grey[900],
  backgroundColor: '#111',
  borderBottom: '5px solid #7a0000',
  color: theme.palette.grey[300],
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  marginBottom: 8,
  marginTop: 8
}))
