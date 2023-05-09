import { Box, useMediaQuery } from '@mui/material'
import Script from 'next/script'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import VideoPreload from './VideoPreload'
import { styled, useTheme } from '@mui/material/styles'
import { WistiaVideo } from 'components/wistia'
import { VideoOverlay } from 'components/wistia/Videoplayer.styles'
import { sleep } from 'common/utils'
import { isServer } from 'components/utils/isServer'

const playbackSpeeds = [-1, 0, 1, 1.25, 1.5, 2, 3, 6, 12] as const
type PlaybackRate = typeof playbackSpeeds[number]

const forwardKeys = 'lL>.'
const backWardKeys = 'jJ<,'
const playPauseKeys = ' kK'
const playbackKeys = forwardKeys + backWardKeys + playPauseKeys

type OverlayText =
  | 'playing'
  | 'paused'
  | '-5s'
  | 'jkl keys enabled'
  | `${PlaybackRate}x`

import { isMobile as isMobileDevice } from 'components/utils/isMobile'
import { Chapter } from 'graphql/types'

type Props = {
  wistiaId: string
  thumbnailUrl: string
  disableJKL?: boolean //disable J,K,L hotkeys on keyboard
  onPlay?: (
    seconds: number,
    secondsWatched: number,
    video: WistiaVideo
  ) => Promise<void>
  onSecondChange?: (
    seconds: number,
    secondsWatched: number,
    video: WistiaVideo
  ) => void
  time?: number
  chapters: Chapter[]
}

const VideoPlayer = (props: Props) => {
  const { wistiaId, disableJKL, thumbnailUrl, time, chapters } = props
  const [video, setVideo] = useState<WistiaVideo>(null)
  const [initialize, setInitialize] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const rootTheme = useTheme()
  const isMobile = useMediaQuery(rootTheme.breakpoints.down('md'))

  const [isShowOverlay, setIsShowOverlay] = useState(true)

  const [overlayText, setOverlayText] =
    useState<OverlayText>('jkl keys enabled')
  const [allowVideoInput, setAllowVideoInput] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  //#region callbacks
  const chapterList = chapters.flatMap((chapter) => {
    const subs = chapter.subchapters?.map((sub) => {
      const chapterNumber = chapter.title.substring(0, 1)
      const title = chapterNumber + '.' + sub.title
      return { title: title, time: sub.time }
    })
    return [{ title: chapter.title, time: chapter.time }, ...subs]
  })

  const jklControlsHandler = useCallback(
    (e: KeyboardEvent) => {
      const activeElement = document.activeElement?.tagName.toLowerCase()
      const inputs = ['input', 'textarea']
      if (!allowVideoInput) return
      if (!video?.ready()) return
      if (inputs.includes(activeElement)) return
      if (!playbackKeys.includes(e.key)) return

      e.preventDefault()
      video.exitInputContext('player-mouseover')
      video.exitInputContext('playbar-focus')
      video.exitInputContext('background-focus')
      //prevent limiting speed to 2x by wistia itself or double fire of keyboard event
      video.exitInputContext('player-focus')

      console.debug('key pressed', video.getInputContext())
      console.debug('key pressed', e)
      //space or k
      if (playPauseKeys.includes(e.key)) {
        if (video.state() === 'playing') {
          video.pause()
          video.playbackRate(0)
          setPlaybackRate(0)
          setOverlayText('paused')
          setIsShowOverlay(true)
        } else {
          //only need to call video.play() here since the onPlayHandler handles playback rate
          video.play()
          setOverlayText('1x')
          setIsShowOverlay(true)
        }
        return
      }

      let speedIndex = playbackSpeeds.findIndex(
        (speed) => playbackRate === speed
      )

      //forward keys handler
      if (forwardKeys.includes(e.key)) {
        if (video.state() !== 'playing') {
          video.play()
        }
        speedIndex = Math.min(speedIndex + 1, playbackSpeeds.length - 1)
        const newPlaybackRate = playbackSpeeds[speedIndex]
        video.playbackRate(newPlaybackRate)
        setPlaybackRate(newPlaybackRate)
        setOverlayText(`${newPlaybackRate}x`)
        setIsShowOverlay(true)
        return
      }

      //backward keys "jJ,"
      speedIndex = Math.max(speedIndex - 1, 0)
      const newPlaybackRate = playbackSpeeds[speedIndex]
      if (newPlaybackRate > 0) {
        video.playbackRate(newPlaybackRate)
        setPlaybackRate(newPlaybackRate)
        setOverlayText(`${newPlaybackRate}x`)
        setIsShowOverlay(true)
        return
      }

      video.pause()
      video.playbackRate(0)
      setPlaybackRate(newPlaybackRate)
      if (newPlaybackRate < 0) {
        const time = Math.max(video.time() - 5, 0)
        if (!time) return
        video.time(time)
        setOverlayText('-5s')
        setIsShowOverlay(true)
      } else {
        setOverlayText('paused')
        setIsShowOverlay(true)
      }
    },
    [allowVideoInput, video, playbackRate]
  )

  //loads wistia api for desktop
  useEffect(() => {
    setInitialize(true)
    // console.log(isMobileDevice())
    // if (!isMobileDevice()) {
    //   console.log('loading wistia api')
    //   setInitialize(true)
    // } else {
    //   const handler = () => {
    //     console.log('input event')
    //     setInitialize(true)
    //   }
    //   window.addEventListener('touchstart', handler)
    //   window.addEventListener('scroll', handler)
    //   return () => {
    //     window.removeEventListener('touchstart', handler)
    //     window.removeEventListener('scroll', handler)
    //   }
    // }
  }, [])

  useEffect(() => {
    if (!video) return
    document.addEventListener('keydown', jklControlsHandler)
    return () => {
      document.removeEventListener('keydown', jklControlsHandler)
    }
  }, [video, jklControlsHandler])

  //adds wistia_id to wsitia_queue (window._wq) for loading
  useEffect(() => {
    console.log('onload')
    //gets the optimal width for the image depending on windowInnerWidth
    function getWidth() {
      if (window.innerWidth <= 640) return 640
      if (window.innerWidth <= 750) return 750
      if (window.innerWidth <= 828) return 828
      if (window.innerWidth <= 1080) return 1080
      if (window.innerWidth <= 1200) return 1200
      return 1920
    }
    window._wq = window._wq || []
    const width = getWidth()
    const nextImageUrl = `/_next/image?url=${encodeURIComponent(
      thumbnailUrl
    )}&w=${width}&q=80`
    const config = {
      id: wistiaId,
      onReady: async (video) => {
        console.log('I got a handle to the video!', video.name())
        setVideo(video)
        if (!disableJKL || !isMobile) {
          setAllowVideoInput(true)
          await sleep(3000)
          setIsShowOverlay(false)
        }
      },
      options: {
        videoFoam: true,
        seo: true,
        preload: 'none',
        stillUrl: nextImageUrl,
        plugin: {
          chapters: {
            on: true,
            chapterList: chapterList
          }
        }
      }
    }
    window._wq.push(config)
  }, [])

  //adds on play and secondchange handler if video is detected
  useEffect(() => {
    if (!video) return
    const secondChangeHandler = (seconds: number) => {
      props.onSecondChange(seconds, video.secondsWatched(), video)
    }
    const onPlayHandler = () => {
      video.playbackRate(1)
      setPlaybackRate(1)
      props.onPlay(video.time(), video.secondsWatched(), video)
    }
    props.onSecondChange && video.bind('secondchange', secondChangeHandler)
    props.onPlay && video.bind('play', onPlayHandler)

    //fix for bug when after full screen and back the video doesn't resize properly in mobile.
    //needs real device to test.
    const cancelFullScreenHandler = () => {
      if (isMobileDevice()) {
        console.debug(ref.current.clientWidth)
        //set video width to the width of its container
        video.width(ref.current.clientWidth, { constrain: true })
      }
    }
    video.bind('cancelfullscreen', cancelFullScreenHandler)

    return () => {
      console.log('cleanup handlers')
      video.unbind('secondchange', secondChangeHandler)
      video.unbind('play', onPlayHandler)
      video.unbind('cancelfullscreen', cancelFullScreenHandler)
    }
  }, [video, props.onSecondChange, props.onPlay, props])

  useEffect(() => {
    if (!video && time > 0) {
      setInitialize(true)
    }
    if (typeof time === 'undefined') return
    video?.time(time)
    if (video?.volume() <= 0) {
      video?.volume(0.5)
    }
  }, [time, video])

  useEffect(() => {
    if (!video) return
    console.log('video loaded')
    return () => {
      console.log('removing video')
      video.remove()
    }
  }, [video])

  // console.log(!isServer && JSON.stringify(window._wq, null, 4))

  return (
    <>
      <Script
        src={`https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`}
        strategy="beforeInteractive"
      />
      {initialize && (
        <Script src={`https://fast.wistia.com/assets/external/E-v1.js`} />
      )}

      <Wrapper ref={ref}>
        {!video && (
          <VideoPreload
            thumbnailUrl={thumbnailUrl}
            onPlay={() => {
              setInitialize(true)
            }}
          />
        )}

        <Box
          className={`wistia_embed wistia_async_${wistiaId} videoFoam=true seo=true`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        ></Box>

        {!disableJKL && (
          <VideoOverlay
            style={{
              opacity: isShowOverlay ? 1 : 0
            }}
          >
            {overlayText}
          </VideoOverlay>
        )}
      </Wrapper>
    </>
  )
}

export default memo(VideoPlayer)

const Wrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#000',
  paddingTop: '56.25%'
}))
