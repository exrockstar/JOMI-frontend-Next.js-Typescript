import { amplitudeTrackArticleView } from 'apis/amplitude'
import { analytics } from 'apis/analytics'
import { useAppState } from 'components/_appstate/useAppState'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { getIpAddress } from 'components/utils/getIpAddress'
import dayjs from 'dayjs'
import { useTrackArticleMutation } from 'graphql/mutations/track-article.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { logtail } from 'logger/logtail'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'
type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}
const ArticleEffects = ({ article }: Props) => {
  const { data: session } = useSession()
  const [articlesViewed, setArticlesViewed] = useSessionStorage(
    'unique-articles-viewed',
    []
  )
  const router = useRouter()
  const [timesTracked, setTimesTracked] = useSessionStorage('times-tracked', [])
  const { referredFrom, referrerPath, anon_link_id } =
    useGoogleAnalyticsHelpers()
  const [trackArticle, { data }] = useTrackArticleMutation({
    onCompleted() {
      setTimesTracked([...timesTracked, dayjs().toISOString()])
    }
  })

  useEffect(() => {
    const length = timesTracked.length
    const first = timesTracked[0]
    const last = timesTracked[length - 1]
    if (first !== last && length > 1) {
      const difference = dayjs(last).diff(first, 'minutes')
      if (difference <= 60 && length > 30) {
        logtail.error('Track Article Anomaly. Please investigate', {
          anon_link_id: anon_link_id,
          user_id: session?.user?._id ?? 'N/A',
          path: window.location.href,
          ip: getIpAddress(),
          user_agent: navigator.userAgent,
          timesTrackedArticle: length,
          spanInMinutes: difference
        })
      }
    }
  }, [timesTracked])
  useEffect(() => {
    if (router.query.slug.length < 2) {
      const query = {
        slug: [article.publication_id, article.slug]
      }
      router.replace({ query }, null, { shallow: true })
    }
  }, [article.publication_id, article.slug, router, router.query])

  useEffect(() => {
    const handler = () => {
      //track in GA4
      analytics.trackArticleView({
        categories: article.categories.map((c) => {
          return c.displayName
        }),
        title: article.title,
        authors: article.authors.map((a) => {
          return a.display_name
        }),
        tags: article.tags,
        publicationId: article.publication_id ?? article.production_id
        // userId: session && session.user ? session.user._id : 'anon',
      })

      //track in Amplitude
      amplitudeTrackArticleView({
        categories: article.categories.map((c) => {
          return c.displayName
        }),
        title: article.title,
        authors: article.authors.map((a) => {
          return a.display_name
        }),
        tags: article.tags,
        publicationId: article.publication_id ?? article.production_id,
        // userId: session && session.user ? session.user._id : 'anon',
        anon_link_id: anon_link_id ?? null
      })
    }
    handler()
  }, [])

  useEffect(() => {
    const performanceEntries = performance.getEntriesByType('navigation')

    if (performanceEntries.length > 0) {
      const navigationTiming = performanceEntries[0]
      //@ts-ignore
      const type = navigationTiming.type
      // only track articles when user navigates to the page. this elimnates any tracking by rerendering the component react.
      if (type !== 'reload' && type !== 'navigate') return
      //track in DB
      const isViewed = articlesViewed.includes(article.publication_id)

      trackArticle({
        variables: {
          input: {
            publication_id: article.publication_id,
            referredFrom,
            referrerPath,
            anon_link_id,
            uniqueView: !isViewed
          }
        }
      })
      if (!isViewed) {
        setArticlesViewed([...articlesViewed, article.publication_id])
      }
    }
  }, [])
  return null
}

export default ArticleEffects
