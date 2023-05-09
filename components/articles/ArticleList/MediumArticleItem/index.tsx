import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/legacy/image'
import ArticleFooter from './ArticleFooter'
import { VidLength } from '../common/VidLength'
import Badges from '../common/Badges'
import { Article } from 'graphql/types'
import { BASE_URL } from 'common/constants'
const MediumArticleItem = (
  props: Article & { showAuthors: boolean; priority: boolean }
) => {
  const imageUrl = `${BASE_URL}/api/files/${props.image?.filename}`

  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          alt={props.slug}
          priority={props.priority}
        />
      </ImageWrapper>
      <VidLength sx={{ fontSize: 12 }}>{props.vid_length}</VidLength>
      <Badges article={props} type="compact" direction="row"></Badges>
      <ArticleFooter {...props} />
    </Wrapper>
  )
}

export default MediumArticleItem

const Wrapper = styled(Box)({
  display: 'flex',
  position: 'relative',
  height: 107,
  width: '100%',
  transition: 'all .2s ease',
  ':hover': {
    filter: 'brightness(0.8)'
  },
  '@media (max-width:600px)': {
    height: 150
  }
})

const ImageWrapper = styled(Box)({
  position: 'relative',
  height: '100%',
  width: '100%',
  '@media (min-width:600px)': {
    width: '40%'
  }
})
