import { Box, Paper, Link as MuiLink, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { analytics } from 'apis/analytics'
import { frontPageTheme } from 'components/theme'
import { slugify } from 'components/utils/helpers'
import Link from 'next/link'
import React from 'react'
import slug from 'slug'
import { Article } from '../types'

const ArticleFooter = (props: Article) => {
  const articleUrl = `/article/${props.publication_id}/${props.slug}`
  return (
    <Wrapper>
      <Paper
        sx={{
          borderRadius: 0,
          p: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: { xs: 'rgba(0,0,0,0.4)', sm: '#121212' }
        }}
      >
        <Link href={articleUrl} passHref prefetch={false} legacyBehavior>
          <Typography
            component={MuiLink}
            color="rgba(255,255,255,0.8)"
            variant="body2"
            sx={{
              ':hover': {
                textDecoration: 'underline',
                color: 'common.white'
              },
              maxWidth: { xs: '100%', sm: '70%' },
              flex: 1
            }}
            onClick={analytics.trackClick}
            data-event="Medium Articles - Article Title Link"
          >
            {props.title}
          </Typography>
        </Link>
        <Stack direction="row" flexWrap="wrap" spacing={1} mt={0.75}>
          {props.authors?.map((author) => {
            const name = `${author.display_name}`
            const authorUrl = `/author/${
              author.slug ?? slugify(author.display_name)
            }`
            return (
              <Link
                key={author._id}
                href={authorUrl}
                passHref
                prefetch={false}
                legacyBehavior
              >
                <TextLink
                  underline="hover"
                  variant="caption"
                  fontSize={11}
                  onClick={analytics.trackClick}
                  data-event="Medium Articles - Author Link"
                >
                  {name}
                </TextLink>
              </Link>
            )
          })}
        </Stack>
        <Typography
          color={frontPageTheme.palette.text.secondary}
          variant="caption"
          fontSize={11}
        >
          {props.hospital.name}
        </Typography>
      </Paper>
    </Wrapper>
  )
}

export default ArticleFooter

const Wrapper = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: 'auto',
  bottom: 0,
  '@media (min-width:600px)': {
    flex: 1,
    display: 'flex',
    position: 'unset',
    alignItems: 'stretch',
    justifyCOntent: 'stretch'
  }
})

const TextLink = styled(MuiLink)({
  color: 'rgba(255,255,255,0.7)',
  ':hover': {
    color: 'white'
  }
})
