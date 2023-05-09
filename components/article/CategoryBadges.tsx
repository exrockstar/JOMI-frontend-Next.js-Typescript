import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Link as MuiLink } from '@mui/material'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { analytics } from 'apis/analytics'
import Link from 'next/link'

type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}
const CategoryBadges = ({ article }: Props) => {
  if (!article) return null
  return (
    <Wrapper py={1} px={2} pb={2}>
      {article.categories.map((category) => {
        const url = '/categories/' + category.slug
        const title = `View all ${category.displayName} articles`
        const event = `Article Page - Category Badge ${category.displayName}`
        return (
          <Link
            href={url}
            passHref
            key={category._id}
            prefetch={false}
            legacyBehavior
          >
            <MuiLink
              title={title}
              bgcolor={category.color}
              underline="hover"
              mr={1}
              py={0.375}
              px={1}
              color={'primary.contrastText'}
              onClick={analytics.trackClick}
              data-event={event}
            >
              {category.displayName}
            </MuiLink>
          </Link>
        )
      })}
    </Wrapper>
  )
}

export default CategoryBadges

const Wrapper = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.fontSize,
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'flex-start'
}))
