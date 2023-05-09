import React, { useRef } from 'react'
import Image from 'next/legacy/image'
import { styled } from '@mui/material/styles'
import ArticleFooter from './ArticleFooter'
import Link from 'next/link'
import { VidLength } from '../common/VidLength'
import Badges from '../common/Badges'

import { BASE_URL } from 'common/constants'
import { Article } from '../types'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const LargeArticleItem = (
  props: Article & { showAuthors: boolean; priority: boolean }
) => {
  const imageUrl = `${BASE_URL}/api/files/${props.image?.filename}`
  const articleUrl = `/article/${props.publication_id}/${props.slug}`
  // console.log(props.publication_id, props.wistia?.duration)
  const duration = dayjs.duration(props.wistia?.duration ?? 0, 'seconds')
  const separated = dayjs.duration({
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  })
  const formatted = separated.toISOString()

  return (
    <Wrapper>
      <Link href={articleUrl} passHref prefetch={false} legacyBehavior>
        <ImageWrapper>
          <Image
            src={imageUrl}
            layout="fill"
            objectFit="cover"
            alt={props.slug}
            priority={props.priority}
          />
        </ImageWrapper>
      </Link>
      <VidLength dateTime={formatted}>{props.vid_length}</VidLength>
      <Badges article={props} type="regular" direction="column"></Badges>
      <ArticleFooter {...props} />
    </Wrapper>
  )
}

export default LargeArticleItem

const Wrapper = styled('article')(({ theme }) => ({
  display: 'block',
  position: 'relative',
  height: '252px',
  width: '100%',
  transition: 'all .2s ease',
  ':hover': {
    filter: 'brightness(0.8)'
  },
  backgroundColor: theme.palette.grey[800]
}))

const ImageWrapper = styled('a')({})
