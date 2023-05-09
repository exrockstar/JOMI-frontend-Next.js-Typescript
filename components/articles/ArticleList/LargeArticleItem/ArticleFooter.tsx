import { Stack, Typography, Link as MuiLink } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

import Link from 'next/link'
import { Article } from '../types'
import { slugify } from 'components/utils/helpers'
import { analytics } from 'apis/analytics'
import { frontPageTheme } from 'components/theme'

const ArticleFooter = (article: Article) => {
  const { publication_id } = article
  const articleUrl = `/article/${publication_id}/${article.slug}`
  return (
    <Wrapper direction="column" p={1} component="header">
      <Link href={articleUrl} passHref prefetch={false} legacyBehavior>
        <MuiLink
          sx={{
            color: 'rgba(255,255,255,0.8)',
            ':hover': {
              textDecoration: 'underline',
              color: 'common.white'
            }
          }}
          onClick={analytics.trackClick}
          data-event="Large Articles - Article Title Link"
        >
          <Typography
            variant="h5"
            component="h2"
            fontSize={{ xs: 16, sm: '1.25rem' }}
            fontWeight={{ xs: 300, md: 400 }}
            lineHeight={1.2}
          >
            {article.title}
          </Typography>
        </MuiLink>
      </Link>

      <Typography variant="caption" component="p" mt={0.75} lineHeight={0}>
        {article.authors?.map((author, index, arr) => {
          const name = `${author.display_name}`
          const authorUrl = `/author/${
            author.slug ?? slugify(author.display_name)
          }`
          const comma = index < arr.length - 1 ? ', ' : ''
          return (
            <Link
              key={author._id}
              href={authorUrl}
              passHref
              prefetch={false}
              legacyBehavior
            >
              <TextLink
                variant="caption"
                underline="hover"
                onClick={analytics.trackClick}
                data-event="Large Articles - Author Link"
                lineHeight={1.2}
              >
                {name}
                {comma}
              </TextLink>
            </Link>
          )
        })}
      </Typography>
      <Typography
        color={frontPageTheme.palette.text.secondary}
        variant="caption"
        component="p"
        mt={0.5}
      >
        {article.hospital.name}
      </Typography>
    </Wrapper>
  )
}

export default ArticleFooter

const Wrapper = styled(Stack)<{ component?: any }>({
  position: 'absolute',
  width: '100%',
  height: 'auto',
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.8)',
  cursor: 'pointer'
})

const TextLink = styled(MuiLink)({
  color: 'rgba(255,255,255,0.7)',
  ':hover': {
    color: 'white'
  }
})
