import { amplitudeTrackArticleView } from 'apis/amplitude'
import { analytics } from 'apis/analytics'
import { useAppState } from 'components/_appstate/useAppState'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { useTrackArticleMutation } from 'graphql/mutations/track-article.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}
const ArticleEffects = ({ article }: Props) => {
  const { state, setArticlesViewed } = useAppState()
  const router = useRouter()
  const [trackArticle, { data }] = useTrackArticleMutation({})
  const { referredFrom, referrerPath, anon_link_id } =
    useGoogleAnalyticsHelpers()
  const [hasTracked, setHasTracked] = useState(false)
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
      if (hasTracked) return
      setHasTracked(true)
      //track in GA4
      analytics.trackArticleView({
        categories: article.categories.map((c) => {
          return c.displayName
        }),
        title: article.title,
        authors: article.authors.map((a) => {
          return a.display_name
        }),
        tags: article.tags
      })
      //track in amplitude
      amplitudeTrackArticleView({
        categories: article.categories.map((c) => {
          return c.displayName
        }),
        title: article.title,
        authors: article.authors.map((a) => {
          return a.display_name
        }),
        tags: article.tags
      })
      //track in DB
      if (state.articlesViewed.find((id) => id === article.publication_id)) {
        trackArticle({
          variables: {
            input: {
              publication_id: article.publication_id,
              referredFrom,
              referrerPath,
              anon_link_id
            }
          }
        })
      } else {
        trackArticle({
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
        setArticlesViewed(article.publication_id)
      }
    }
    document.addEventListener('touch', handler)
    document.addEventListener('scroll', handler)
    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('touch', handler)
      document.removeEventListener('scroll', handler)
      document.removeEventListener('click', handler)
    }
  }, [
    article.publication_id,
    hasTracked,
    state.articlesViewed,
    trackArticle,
    referredFrom,
    referrerPath,
    anon_link_id,
    setArticlesViewed
  ])
  return null
}

export default ArticleEffects
