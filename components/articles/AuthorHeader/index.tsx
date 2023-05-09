import { Stack, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { memo } from 'react'
import Image from 'next/legacy/image'

import { BASE_URL } from 'common/constants'
import { AuthorBySlugQuery } from 'graphql/queries/author-by-slug.generated'

// AuthorHeader is the block located on the sideline of the article.

type Props = {
  author: AuthorBySlugQuery['authorBySlug']
}

const AuthorHeader = ({ author }: Props) => {
  if (!author) return null
  const getImageUrl = (filename: string) => {
    const imageFilename = filename
    if (!imageFilename) {
      return '/img/user-profile-icon.png'
    }

    const isHttp = imageFilename.startsWith('http')
    const profileImageUrl = isHttp
      ? imageFilename
      : `${BASE_URL}/api/files/${imageFilename}`

    return profileImageUrl
  }
  const imageUrl = getImageUrl(author.image?.filename)

  return (
    <Wrapper
      direction="row"
      pb={2}
      alignItems="center"
      justifyContent="center"
      py={{ xs: 2, md: 1 }}
    >
      <ImageWrapper>
        <Image
          src={imageUrl}
          layout="fill"
          objectFit="contain"
          alt={`author-image-${author.display_name}`}
        />
      </ImageWrapper>

      <Typography
        color="textSecondary"
        variant="h4"
        fontSize={{ xs: '1rem', md: '1.5rem' }}
        ml={2}
        component="h1"
      >
        Viewing All Articles By {author.display_name}
      </Typography>
    </Wrapper>
  )
}

export default memo(AuthorHeader)

const Wrapper = styled(Stack)({
  borderBottom: '1px dashed rgba(255,255,255,.4)',
  marginBottom: 32
})

const ImageWrapper = styled(Box)({
  width: 50,
  height: 50,
  position: 'relative'
})
