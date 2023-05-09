import React, { memo } from 'react'
import { useMediaQuery } from '@mui/material'
import { frontPageTheme } from 'components/theme'
import backgroundMobile from 'public/img/background_mobile.jpg'
import Image from 'next/legacy/image'
import { styled } from '@mui/material/styles'
import Darkener from './Darkener'
const BackgroundVideo = () => {
  const smallDown = useMediaQuery(frontPageTheme.breakpoints.down('sm'))

  return (
    <Wrapper>
      <Darkener />
      {smallDown ? (
        <Image
          src={backgroundMobile}
          layout="fill"
          objectFit="cover"
          alt="background-mobile"
        />
      ) : (
        <StyledVideo id="frontpage-bg-video" autoPlay loop muted>
          <source
            id="video-source-webm"
            src="/video/background.webm"
            type="video/webm"
          />
          <source
            id="video-source"
            src="/video/background.mp4"
            type="video/mp4"
          />
        </StyledVideo>
      )}
    </Wrapper>
  )
}

export default memo(BackgroundVideo)

const StyledVideo = styled('video')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0
})

const Wrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: '56.25%', //16:9 aspect ratio for desktop
  height: '0px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '177.7%' //9:16 aspect ratio for vertical screen
  }
}))
