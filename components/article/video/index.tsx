import React, { memo, useEffect, useState } from 'react'
import { Box, Grid, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Chapters from './chapters/Chapters'
import VideoBlock from './VideoBlock'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'

type ArticleVideoProps = {
  article: ArticlesBySlugQuery['articleBySlug']
}

const ArticleVideo: React.FC<ArticleVideoProps> = ({
  article
}: ArticleVideoProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const hasChapters = article.chapters?.length > 0 ? true : false

  return (
    <Box ml={0}>
      <Grid container>
        {isMobile &&
          <Grid item xs={12} md={10} flexGrow={1}>
            <VideoBlock article={article} />
          </Grid>
        }
        {hasChapters && 
          <ChaptersListGrid
            item
            md={2}
            xs={12}
            pr={{ xs: 0, md: 1 }}
            flexGrow={1}
          >
            <Chapters />
          </ChaptersListGrid>
        }
        {!isMobile && 
          <Grid item xs={12} md={hasChapters ? 10 : 12} flexGrow={1}>
            <VideoBlock article={article} />
          </Grid> 
        }
      </Grid>
    </Box>
  )
}

export default memo(ArticleVideo)

const ChaptersListGrid = styled(Grid)(({ theme }) => ({
  color: '#fff',
  width: '100%'
}))
