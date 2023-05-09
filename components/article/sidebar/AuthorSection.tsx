import { useMemo, memo } from 'react'
import { Box, Stack, Link as MuiLink, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { BlueLink } from 'components/common/BlueLink'
import { slugify } from 'components/utils/helpers'
import { BASE_URL } from 'common/constants'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { analytics } from 'apis/analytics'
import Link from 'next/link'
import Image from 'next/legacy/image'
type Props = {
  authors: ArticlesBySlugQuery['articleBySlug']['authors']
}
type Author = Unpacked<Props['authors']>

const AuthorSection = (props: Props) => {
  if (!props.authors) return null

  const getImageUrl = (author: Author) => {
    const imageFilename = author.image?.filename
    if (!imageFilename) {
      return '/img/user-profile-icon.png'
    }

    const isHttp = imageFilename.startsWith('http')
    const profileImageUrl = isHttp
      ? imageFilename
      : `${BASE_URL}/api/files/${imageFilename}`

    return profileImageUrl
  }

  const getAuthorDisplayName = (author: Author) => {
    return author.display_name ?? `${author.name?.first} ${author.name?.last}`
  }

  return (
    <Stack
      alignItems={{ xs: 'center', lg: 'flex-start' }}
      padding={1.25}
      spacing={1}
      mt={2}
      component="section"
    >
      <Typography
        component="h2"
        sx={{
          fontWeight: 'bold',
          alignSelf: 'center',
          marginBottom: '5px'
        }}
      >
        Authors
      </Typography>
      <AuthorList>
        {props.authors?.map((author) => {
          const authorImage = getImageUrl(author)
          const author_slug = author.slug || slugify(author.display_name ?? '')
          const url = `/author/${author_slug}`
          const displayName = getAuthorDisplayName(author)
          const title = `View Articles by ${displayName}`
          return (
            <Link
              href={url}
              passHref
              key={author._id}
              prefetch={false}
              legacyBehavior
            >
              <li>
                <Stack
                  direction="row"
                  spacing={1}
                  title={title}
                  alignItems="center"
                  justifyContent={{ xs: 'center', lg: 'flex-start' }}
                  mt={1}
                >
                  <ImageContainer href={url}>
                    <Image
                      src={authorImage}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center top"
                      alt={`Author ${author.display_name}`}
                      onClick={() => {
                        analytics.event('Click', 'Author Section - Image Link')
                      }}
                    />
                  </ImageContainer>

                  <BlueLink
                    href={url}
                    onClick={() => {
                      analytics.event('Click', 'Author Section - Name Link')
                    }}
                  >
                    {displayName}
                  </BlueLink>
                </Stack>
              </li>
            </Link>
          )
        })}
      </AuthorList>
    </Stack>
  )
}

export default memo(AuthorSection)

const AuthorList = styled('ul')({
  listStyle: 'none',
  paddingLeft: 0
})

const ImageContainer = styled(MuiLink)(({ theme }) => ({
  height: 48,
  minWidth: 48,
  width: 48,

  position: 'relative',
  border: '1px solid',
  borderColor: theme.palette.grey[200]
}))
