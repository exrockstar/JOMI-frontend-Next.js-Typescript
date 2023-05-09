import { useCallback, useEffect, useState } from 'react'
import Script from 'next/script'
import { sleep } from 'common/utils'
import { VideoContainer, VideoOverlay } from './Videoplayer.styles'
import { WistiaVideo } from './types'
import { isTouchDevice } from 'components/utils/helpers'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'

const playbackSpeeds = [-1, 0, 1, 1.25, 1.5, 2, 3, 6, 12] as const
type PlaybackRate = typeof playbackSpeeds[number]

const forwardKeys = 'lL>.'
const backWardKeys = 'jJ<,'
const playPauseKeys = ' kK'
const playbackKeys = forwardKeys + backWardKeys + playPauseKeys

type VideoPlayerProps = {
  wistiaId: string
  disableJKL?: boolean //disable J,K,L hotkeys on keyboard
  hasBlock?: boolean
  videoLength: string
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
}

type OverlayText =
  | 'playing'
  | 'paused'
  | '-5s'
  | 'jkl keys enabled'
  | `${PlaybackRate}x`

/**
 * Wistia video player in typescript react
 * Reference: https://wistia.com/support/developers/player-api#get-started
 * @returns
 */
export const VideoPlayer = (props: VideoPlayerProps) => {
  const { wistiaId, disableJKL, hasBlock, time } = props
  const [video, setVideo] = useState<WistiaVideo>(null)
  const router = useRouter()
  const [isShowOverlay, setIsShowOverlay] = useState(true)

  const [overlayText, setOverlayText] =
    useState<OverlayText>('jkl keys enabled')
  const [allowVideoInput, setAllowVideoInput] = useState(false)
  //#region callbacks

  const jklControlsHandler = useCallback(
    (e: KeyboardEvent) => {
      const activeElement = document.activeElement?.tagName.toLowerCase()
      const inputs = ['input', 'textarea']
      if (!allowVideoInput || hasBlock) return
      if (!video?.ready()) return
      if (inputs.includes(activeElement)) return
      if (!playbackKeys.includes(e.key)) return

      e.preventDefault()
      video.exitInputContext('player-mouseover')
      video.exitInputContext('playbar-focus')

      console.debug('key pressed', video.getInputContext())
      console.debug('key pressed', e)
      //space or k
      if (playPauseKeys.includes(e.key)) {
        if (video.state() === 'playing') {
          video.pause()
          video.playbackRate(0)
          setOverlayText('paused')
          setIsShowOverlay(true)
        } else {
          video.play()
          video.playbackRate(1)
          setOverlayText('1x')
          setIsShowOverlay(true)
        }
        return
      }

      let speedIndex = playbackSpeeds.findIndex(
        (speed) => video.playbackRate() === speed
      )

      //forward keys handler
      if (forwardKeys.includes(e.key)) {
        if (video.state() !== 'playing') {
          video.play()
        }
        speedIndex = Math.min(speedIndex + 1, playbackSpeeds.length - 1)
        const newPlaybackRate = playbackSpeeds[speedIndex]
        video.playbackRate(newPlaybackRate)
        setOverlayText(`${newPlaybackRate}x`)
        setIsShowOverlay(true)
        return
      }

      //backward keys "jJ,"
      speedIndex = Math.max(speedIndex - 1, 0)
      const newPlaybackRate = playbackSpeeds[speedIndex]
      if (newPlaybackRate > 0) {
        video.playbackRate(newPlaybackRate)
        setOverlayText(`${newPlaybackRate}x`)
        setIsShowOverlay(true)
        return
      }

      video.pause()
      video.playbackRate(0)

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
    [allowVideoInput, hasBlock, video]
  )

  //#endregion callbacks

  //#region useEffects

  /**
   * Loads the wistia api script and cleans up when it transitions to another page.
   * This is important to reset the state of the wistia script
   */
  useEffect(() => {
    const wistiaScript = document.createElement('script')
    wistiaScript.src = 'https://fast.wistia.com/assets/external/E-v1.js'
    wistiaScript.id = `wistia-jomi-${wistiaId}`
    wistiaScript.async = true
    document.body.appendChild(wistiaScript)

    const handleRouteChangeStart = (path) => {
      if (router.asPath.startsWith(path)) return

      const s1 = document.getElementById(`wistia-jomi-${wistiaId}`)
      s1?.remove()
    }
    router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])

  //This checks if video is available
  useEffect(() => {
    if (!video) {
      let timer1 = setTimeout(async () => {
        if (window.Wistia?.api) {
          let vid = window.Wistia.api(wistiaId)
          setVideo(vid)
          if (!disableJKL || isTouchDevice()) {
            setAllowVideoInput(true)
            await sleep(3000)
            setIsShowOverlay(false)
          }
        }
      }, 100)
      return () => clearTimeout(timer1)
    }
  })

  useEffect(() => {
    if (!video) return
    document.addEventListener('keydown', jklControlsHandler)
    return () => {
      document.removeEventListener('keydown', jklControlsHandler)
    }
  }, [video, jklControlsHandler])

  useEffect(() => {
    ;(async () => {
      if (!isShowOverlay) return
      await sleep(3000)
      setIsShowOverlay(false)
    })()
  }, [isShowOverlay])

  useEffect(() => {
    if (!video) return
    const secondChangeHandler = (seconds: number) => {
      props.onSecondChange(seconds, video.secondsWatched(), video)
    }
    const onPlayHandler = () => {
      props.onPlay(video.time(), video.secondsWatched(), video)
    }
    props.onSecondChange && video.bind('secondchange', secondChangeHandler)
    props.onPlay && video.bind('play', onPlayHandler)

    return () => {
      video.unbind('secondchange', secondChangeHandler)
      video.unbind('play', onPlayHandler)
    }
  }, [video, props.onSecondChange, props.onPlay, props])

  useEffect(() => {
    if (!video) return
    if (typeof time === 'undefined') return
    video.time(time)
  }, [time, video])

  //#endregion useEffects
  // console.log(video)
  return (
    <VideoContainer>
      <Script src={`https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`} />
      <Box
        className={`wistia_embed wistia_async_${wistiaId} videoFoam=true seo=true`}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}
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
    </VideoContainer>
  )
}
