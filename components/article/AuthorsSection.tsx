import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Link as MuiLink, Tooltip, Typography } from '@mui/material'
import slugify from 'slug'
import Link from 'next/link'
import { analytics } from 'apis/analytics'
type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}
const AuthorsSection = ({ article }: Props) => {
  const handleClick = (author: Unpacked<typeof article['authors']>) => {
    const eventName = `Articles Page - Author Link ${author.display_name}`
    analytics.event('Click', eventName)
  }

  if (!article) return null

  //render custom html from cms if set
  if (article.authors_attr_html) {
    let html = article.authors_attr_html

    article.authors.forEach((author) => {
      const slug = author.slug ?? author?.display_name

      html = html.replace(author._id, encodeURIComponent(slug))
    })

    return (
      <Wrapper py={0.5} px={2.5} mt={1}>
        <ArticleAuthorInfo dangerouslySetInnerHTML={{ __html: html }} />
      </Wrapper>
    )
  }

  return (
    <Wrapper py={0.5} px={2.5} mt={1}>
      {article.authors.map((author) => {
        const slug = slugify(author.slug || author.display_name)

        return (
          <Tooltip
            title={`View all articles by ${author.display_name}`}
            key={author._id}
          >
            <Link
              href={'/author/' + slug}
              passHref
              prefetch={false}
              legacyBehavior
            >
              <MuiLink
                className="author-link"
                title={`View all articles by ${author.display_name}`}
                color="linkblue.main"
                onClick={() => handleClick(author)}
              >
                {author.display_name}
              </MuiLink>
            </Link>
          </Tooltip>
        )
      })}
    </Wrapper>
  )
}

export default AuthorsSection

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '.institution, sup': {
    color: theme.palette.grey[800]
  }
}))

const ArticleAuthorInfo = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  '& a': {
    color: theme.palette.linkblue.main,
    ':hover': {
      color: theme.palette.linkblue.dark
    }
  }
}))
