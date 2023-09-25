import {
  AvatarGroup,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography
} from '@mui/material'
import { BASE_URL } from 'common/constants'
import { FrontPageQuery } from 'graphql/queries/frontpage.generated'
import { Category } from 'graphql/types'
import React from 'react'
import Image from 'next/image'

import { PlayArrow } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ArticleTitle from 'components/frontpage/latest-articles/ArticleTitle'
import CategoryBadge from 'components/frontpage/latest-articles/CategoryBadge'
import { frontPageTheme } from 'components/theme'
type Props = {
  article: Unpacked<FrontPageQuery['latestArticles']>
}
const ConfArticleCard = ({ article }: Props) => {
  const imageUrl = `${BASE_URL}/api/files/${article.image?.filename}`
  const articleLink = `/article/${article.publication_id}/${article.slug}`
  const router = useRouter()
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        flexGrow: 1,
        backgroundColor: 'transparent',
        ':hover': {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'background.paper',
          '& .play-button': {
            background: `rgba(79, 70, 229, 0.75)`,
            backdropFilter: 'blur(2px)'
          }
        },
        cursor: 'pointer',
        borderColor: 'darkgray',
        borderWidth: 1.5,
        minHeight: 370,
        maxHeight: 370,
      }}
      component="article"
      onClick={() => {
        router.push(articleLink)
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '50.25%',
          mb: 4
        }}
      >
        <Image
          src={imageUrl}
          alt={article.slug}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <Link href={articleLink} passHref legacyBehavior>
          <IconButton
            className="play-button"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#18181B80',
              // background:'#00000000',
              ':hover': {
                background: `rgba(79, 70, 229, 0.75)`,
                backdropFilter: 'blur(2px)'
              }
            }}
          >
            <PlayArrow fontSize={'large'} htmlColor='white' />
          </IconButton>
        </Link>
      </Box>
      <CategoryBadge category={article.categories[0] as Category} />
      <Link href={articleLink} legacyBehavior passHref>
        <ArticleTitle>
          <Typography variant="h5" component="h3" 
            sx={{
              ...frontPageTheme.typography.h5
            }}
          >
            {article.title}
          </Typography>
        </ArticleTitle>
      </Link>
      <Typography
        overflow="hidden"
        textOverflow={{ md: 'ellipsis' }}
        whiteSpace={{ md: 'nowrap' }}
        variant="body2"
        fontSize="0.75rem"
        fontWeight={600}
        color="grey.700"
        sx={{
          ...frontPageTheme.typography.body2
        }}
      >
        {article.authors.map((author) => author.display_name).join(', ')}
      </Typography>
      <Typography
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        variant="body2"
        fontSize="0.75rem"
        color="grey.700"
        sx={{
          ...frontPageTheme.typography.body2
        }}
      >
        {article.hospital?.name}
      </Typography>
    </Card>
  )
}

export default ConfArticleCard
