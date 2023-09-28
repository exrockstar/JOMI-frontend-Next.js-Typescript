import { amplitudeTrackArticleView } from 'apis/amplitude'
import { analytics } from 'apis/analytics'
import { useAppState } from 'components/_appstate/useAppState'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import { useTrackArticleMutation } from 'graphql/mutations/track-article.generated'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}
const ArticleEffects = ({ article }: Props) => {
  const { data: session, status } = useSession()
  const { state, setArticlesViewed } = useAppState()
  const router = useRouter()
  const [trackArticle, { data }] = useTrackArticleMutation({})
  const { referredFrom, referrerPath, anon_link_id } =
    useGoogleAnalyticsHelpers()
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
      if(status === "loading") return;

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
        publicationId: article.publication_id ?? article.production_id,
        userId: session && session.user ? session.user._id : 'anon',
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
        userId: session && session.user ? session.user._id : 'anon',
        anon_link_id: anon_link_id ?? null,
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
    handler()
  }, [status, session])
  return null
}

export default ArticleEffects
