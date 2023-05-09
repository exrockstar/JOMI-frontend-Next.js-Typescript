import { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
// import ArticleAccessDialog from 'components/ArticleAccessDialog/ArticleAccessDialog'

import { useChapters } from './useChapters'
import { WistiaVideo } from 'components/wistia'

import {
  useTrackVideoBlockMutation,
  useTrackVideoPlayMutation,
  useTrackVideoTimeMutation
} from 'graphql/mutations/track-article.generated'
import { useArticleAccessQuery } from 'graphql/queries/article-access.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { AccessTypeEnum } from 'graphql/types'
import { useRouter } from 'next/router'
import VideoPlayer from 'components/common/VideoPlayer/VideoPlayer'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { isMobile } from 'components/utils/isMobile'
import { useAppState } from 'components/_appstate/useAppState'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
const ArticleAccessDialog = dynamic(
  () => import('components/ArticleAccessDialog/ArticleAccessDialog'),
  {
    ssr: false
  }
)

const TRACK_TIME_INTERVAL = 15
type VideoBlockProps = {
  article: ArticlesBySlugQuery['articleBySlug']
}

const BLOCK_INTERVAL_SECONDS = 300 //seconds
const INITIAL_BLOCK_SECONDS = 180
export default function VideoBlock({ article }: VideoBlockProps) {
  const { state, setVideosViewed, setVideosBlocked } = useAppState()
  const [shouldTrackVideoBlock, setShouldTrackVideoBlock] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const { data: session, status } = useSession()
  const { anon_link_id, referredFrom, referrerPath } =
    useGoogleAnalyticsHelpers()
  const [trackVideoPlay] = useTrackVideoPlayMutation()
  const [trackVideoTime] = useTrackVideoTimeMutation({
    onCompleted() {
      console.debug('track video time')
    }
  })
  const [trackVideoBlock] = useTrackVideoBlockMutation({
    onCompleted() {
      console.debug('track video block')
    }
  })
  const [lastTimeLogged, setLastTimeLogged] = useState(0)
  const [nextBlockTime, setNextBlockTime] = useState(0)
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()
  const {
    chapters,
    videoTime,
    setActiveChapter,
    subchapters,
    activeSubChapter,
    setActiveSubChapter,
    setVideoTime
  } = useChapters()

  const [vidWatchId, setVidwatchId] = useState<string>(null)

  const { data, refetch } = useArticleAccessQuery({
    skip: status === 'loading',
    variables: {
      publication_id: article.publication_id
    }
  })
  const articleAccess = data?.article?.articleAccessType

  useEffect(() => {
    refetch()
  }, [session?.user?.email, refetch])

  useEffect(() => {
    if (router.isReady && router.query.t) {
      const time = parseInt(router.query.t as string)

      if (typeof time === 'number' && !isNaN(time) && time > 0) {
        setVideoTime(time)
      }
    }
  }, [router.isReady])

  const handleChapterChange = useCallback(
    async (seconds: number) => {
      const chapter =
        chapters.find((c, index) => {
          const next = chapters[index + 1]
          if (!next) return c.time <= seconds
          return c.time <= seconds && next.time > seconds
        }) ?? chapters[0]

      setActiveChapter(chapter)

      if (chapter?.subchapters.length <= 0) {
        setActiveSubChapter(null)
        return
      }

      const subchapter = subchapters.find((c, index) => {
        const next = subchapters[index + 1]
        if (!next) return c.time <= seconds

        return c.time <= seconds && next.time > seconds
      })

      if (
        subchapter &&
        subchapter !== activeSubChapter &&
        chapter.subchapters.includes(subchapter)
      ) {
        setActiveSubChapter(subchapter)
      }
    },
    [
      activeSubChapter,
      chapters,
      setActiveChapter,
      setActiveSubChapter,
      subchapters
    ]
  )

  const checkBlock = useCallback(
    async (seconds: number, secondsWatched: number, video: WistiaVideo) => {
      const threeMinutes = 60 * 3

      const hasServiceInCountry =
        articleAccess &&
        (articleAccess.accessType === AccessTypeEnum.LimitedAccess ||
          articleAccess.accessType === AccessTypeEnum.RequireSubscription ||
          articleAccess.accessType === AccessTypeEnum.AwaitingEmailConfirmation)

      if (hasServiceInCountry) {
        const shouldPause = seconds >= threeMinutes
        if (shouldPause) {
          video.pause()
          setShowDialog(true)
          if (
            state.videosBlocked.find((id) => id === article.publication_id) &&
            shouldTrackVideoBlock === true
          ) {
            trackVideoBlock({
              variables: {
                input: {
                  publication_id: article.publication_id,
                  uniqueView: false,
                  referredFrom,
                  referrerPath,
                  anon_link_id
                }
              }
            })
          } else if (shouldTrackVideoBlock) {
            trackVideoBlock({
              variables: {
                input: {
                  publication_id: article.publication_id,
                  uniqueView: true,
                  referredFrom,
                  referrerPath,
                  anon_link_id
                }
              }
            })
            setVideosBlocked(article.publication_id)
          }
        } else {
          setShowDialog(false)
        }
      } else if (
        articleAccess &&
        articleAccess.accessType === AccessTypeEnum.Evaluation
      ) {
        const shouldPause =
          seconds > threeMinutes && secondsWatched >= nextBlockTime
        console.log(secondsWatched, nextBlockTime)

        if (shouldPause) {
          video.pause()
          setVideoTime(seconds)
          setShowDialog(true)
          if (
            state.videosBlocked.find((id) => id === article.publication_id) &&
            shouldTrackVideoBlock === true
          ) {
            trackVideoBlock({
              variables: {
                input: {
                  publication_id: article.publication_id,
                  uniqueView: false,
                  referredFrom,
                  referrerPath,
                  anon_link_id
                }
              }
            })
          } else if (shouldTrackVideoBlock) {
            trackVideoBlock({
              variables: {
                input: {
                  publication_id: article.publication_id,
                  uniqueView: true,
                  referredFrom,
                  referrerPath,
                  anon_link_id
                }
              }
            })
            setVideosBlocked(article.publication_id)
          }
        } else {
          setShowDialog(false)
        }
      }
    },
    [
      anon_link_id,
      article.publication_id,
      articleAccess,
      nextBlockTime,
      referredFrom,
      referrerPath,
      setVideoTime,
      setVideosBlocked,
      shouldTrackVideoBlock,
      state.videosBlocked,
      trackVideoBlock
    ]
  )

  const trackPlayTime = useCallback(
    async (_, secondsWatched: number) => {
      if (!vidWatchId) return
      const diff = secondsWatched - lastTimeLogged
      if (secondsWatched % TRACK_TIME_INTERVAL !== 0) return

      setLastTimeLogged(secondsWatched)
      trackVideoTime({
        variables: {
          input: {
            time_watched: secondsWatched,
            vidWatchId: vidWatchId,
            increment: TRACK_TIME_INTERVAL
          }
        }
      })
    },
    [lastTimeLogged, trackVideoTime, vidWatchId]
  )

  //#region handlers
  const handleSecondChange = useCallback(
    (seconds: number, secondsWatched: number, video: WistiaVideo) => {
      setShouldTrackVideoBlock(true)
      handleChapterChange(seconds)
      checkBlock(seconds, secondsWatched, video)
      trackPlayTime(seconds, secondsWatched)
    },
    [checkBlock, handleChapterChange, trackPlayTime]
  )
  const onPlayHandler = useCallback(
    async (seconds: number, secondsWatched: number, video: WistiaVideo) => {
      setShouldTrackVideoBlock(false)
      checkBlock(seconds, secondsWatched, video)
      //do not add tracking id if there's already one
      if (vidWatchId) return
      if (state.videosViewed.find((id) => id === article.publication_id)) {
        const { data } = await trackVideoPlay({
          variables: {
            input: {
              publication_id: article.publication_id,
              uniqueView: false,
              referredFrom,
              referrerPath,
              anon_link_id
            }
          }
        })
        console.log('setting  video watch id')
        setVidwatchId(data.trackVideoPlay)
      } else {
        setVideosViewed(article.publication_id)
        const { data } = await trackVideoPlay({
          variables: {
            input: {
              publication_id: article.publication_id,
              uniqueView: true,
              referredFrom,
              referrerPath,
              anon_link_id
            }
          }
        })
        console.log('setting  video watch id')
        setVidwatchId(data.trackVideoPlay)
      }
    },
    [
      anon_link_id,
      article.publication_id,
      checkBlock,
      referredFrom,
      referrerPath,
      setVideosViewed,
      state.videosViewed,
      trackVideoPlay,
      vidWatchId
    ]
  )

  const handleAccessDialog = (open: boolean) => {
    setShowDialog(open)
    if (!open) {
      setNextBlockTime(nextBlockTime + BLOCK_INTERVAL_SECONDS)
    }
  }
  const imageUrl = article?.wistia?.thumbnail?.url.replace(
    /\?image_crop_resized.*/,
    ''
  )
  // if (status === 'loading') return null

  //#endregion handlers
  return (
    <Box>
      {showDialog && (
        <ArticleAccessDialog
          open={showDialog}
          handleState={handleAccessDialog}
          publication_id={article.publication_id}
        />
      )}
      <VideoPlayer
        chapters={chapters}
        thumbnailUrl={imageUrl}
        wistiaId={article.wistia_id}
        disableJKL={isMobile()}
        key={article.wistia_id}
        onPlay={onPlayHandler}
        onSecondChange={handleSecondChange}
        time={videoTime}
      />
    </Box>
  )
}
