import { memo, useEffect, useState, useMemo } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { Box, Grid, Hidden } from '@mui/material'
import Layout from 'components/layout'
import ArticleTabs from 'components/article/ArticleTabs'
import ArticleSideBar from 'components/article/sidebar/ArticleSideBar'
import ArticleVideo from 'components/article/video'

import { ChapterProvider } from 'components/article/video/useChapters'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { GetStaticPaths, GetStaticProps } from 'next'
import { buildArticleMetadata } from 'backend/seo/buildArticleMetadata'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { logger } from 'logger/logger'
import {
  ArticlesBySlugQuery,
  ArticlesBySlugQueryVariables,
  ArticlesBySlugDocument
} from 'graphql/queries/article-by-slug.generated'

// import Error404 from 'components/error-pages/Error404'
// import ArticlePassword from 'components/article/ArticlePassword'
import LanguageSwitcher from 'components/article/LanguageSwitcher'
import { LOCALES } from 'common/constants'
import { buildArticleStructuredData } from 'backend/seo/buildArticleStructuredData'
import AuthorsSection from 'components/article/AuthorsSection'
import CategoryBadges from 'components/article/CategoryBadges'
import ArticleLocalesMetadata from 'components/article/ArticleLocalesMetadata'
import TitleSection from 'components/article/TitleSection'
import PreprintNotice from 'components/article/PreprintNotice'
import TranslationDisclaimer from 'components/article/TranslationDisclaimer'
import dynamic from 'next/dynamic'
import { ArticlesForSlugDocument, ArticlesForSlugQuery } from 'graphql/queries/articles-for-slug.generated'
import ArticleEffects from 'components/article/ArticleEffects'
import { fixImages } from 'components/article/fixImages'
import cheerio from 'cheerio'
import {
  SiteWideAnnouncementsQuery,
  SiteWideAnnouncementsDocument
} from 'graphql/queries/announcement-for-user.generated'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import Error404 from 'components/error-pages/Error404'
const ArticlePassword = dynamic(() => import('components/article/ArticlePassword'))

type SingleArticleProps = {
  article: ArticlesBySlugQuery['articleBySlug']
} & DefaultPageProps

const isProduction = process.env.APP_ENV === 'production'
/**
 * Article Page
 * @param param0
 * @returns
 */
function SingleArticle({ article }: SingleArticleProps) {
  const [showArticle, setShowArticle] = useState(!article?.isPasswordProtected)

  const onComplete = () => {
    setShowArticle(true)
  }

  const ArticleContent = useMemo(() => {
    if (!article) return <Error404 />
    return (
      <div>
        <ArticleEffects article={article} />
        <ArticleLocalesMetadata article={article} />
        <PreprintNotice article={article} />
        <ChapterProvider chapters={article?.chapters}>
          <ArticleVideo article={article} />
        </ChapterProvider>

        <Box display={{ xs: 'block', md: 'none' }}>
          <LanguageSwitcher enabledLanguages={article.enabled_languages} />
        </Box>
        <TranslationDisclaimer article={article} />
        <Grid container mt={2} rowGap={1}>
          <Grid
            item
            bgcolor={'background.paper'}
            lg={9}
            xs={12}
            sx={{
              borderTopLeftRadius: { xs: 0, lg: 11 },
              borderBottomLeftRadius: { xs: 0, lg: 11 }
            }}
            component="main"
          >
            <article>
              <header>
                <TitleSection article={article} />
                <AuthorsSection article={article} />
              </header>
              <CategoryBadges article={article} />

              <ArticleTabs article={article} />
            </article>
          </Grid>
          <Grid
            item
            bgcolor={'background.paper'}
            lg={3}
            xs={12}
            sx={{
              borderTopRightRadius: { xs: 0, lg: 11 },
              borderBottomRightRadius: { xs: 0, lg: 11 }
            }}
            component="div"
          >
            <ArticleSideBar article={article} />
          </Grid>
        </Grid>
      </div>
    )
  }, [article])

  if (article?.isPasswordProtected && !showArticle) {
    return <ArticlePassword onComplete={onComplete} publication_id={article.publication_id} />
  }

  return <Layout>{ArticleContent}</Layout>
}
export default memo(SingleArticle)

interface IParams extends ParsedUrlQuery {
  slug: string[]
}
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const client = getApolloAdminClient()
  const { data } = await client.query<ArticlesForSlugQuery>({
    query: ArticlesForSlugDocument,
    fetchPolicy: 'no-cache'
  })

  const paths = data?.articlesForSlug?.map(({ slug, title, publication_id }) => {
    return {
      params: {
        slug: [publication_id, slug]
      }
    }
  })

  return {
    paths: isProduction ? paths : [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<SingleArticleProps, IParams> = async ({ params }) => {
  try {
    let param = Array.isArray(params.slug) ? params.slug : [params.slug]
    const [publication_id] = params.slug
    const tabs = ['procedure-outline', 'transcript']

    const client = getApolloAdminClient()
    const lang = param.find((param) => LOCALES.includes(param)) ?? 'en'
    const { data } = await client.query<ArticlesBySlugQuery, ArticlesBySlugQueryVariables>({
      variables: {
        publication_id,
        locale: lang
      },
      query: ArticlesBySlugDocument,
      fetchPolicy: 'no-cache'
    })

    const article = data.articleBySlug
    const enabled_languages = article?.enabled_languages?.map((l) => l.toLowerCase()) ?? []
    if (!article) {
      throw new Error(`Article /${param.join('/')} not found`)
    }
    //#region redirect_check
    // check if a redirect is needed based on the params
    let redirectDestination = null
    if (param.length > 4) {
      param = param.slice(0, 4)
      redirectDestination = param.join('/')
    }

    if (param.length > 3) {
      const [id, slug, option, language] = param
      if (!enabled_languages.includes(language)) {
        param = [id, slug, option]
        redirectDestination = param.join('/')
      }
    }

    if (param.length > 2) {
      const [id, slug, optionOrLanguage] = param
      if (![...tabs, ...enabled_languages].includes(optionOrLanguage)) {
        param = [id, slug]
        redirectDestination = param.join('/')
      }
    }

    if (param.length > 1) {
      const [id, slug] = param
      if (slug !== data.articleBySlug?.slug) {
        param = [id, data.articleBySlug?.slug]
        redirectDestination = param.join('/')
      }
    }

    if (param.length === 1) {
      const [id] = param
      redirectDestination = [id, data.articleBySlug?.slug].join('/')
    }

    if (redirectDestination) {
      return {
        redirect: {
          destination: `/article/${redirectDestination}`,
          statusCode: 301
        }
      }
    }

    const content = data.articleBySlug.content
    let citations = content.citations
    if (citations) {
      const $ = cheerio.load(citations)
      //modify outbound links to have nofollow
      $('a').each(function () {
        var href = $(this).attr('href')
        if (href?.startsWith('http')) {
          $(this).attr('rel', 'nofollow')
        }
      })

      $('li').each(function (index) {
        $(this).attr('id', `citation-${index + 1}`)
      })

      citations = $('body').html()
    }
    const fixedImageLinks = fixImages(content.article, publication_id)
    const procedureOutline = fixImages(content.outline, publication_id)
    //#endregion
    await client.query<SiteWideAnnouncementsQuery>({
      query: SiteWideAnnouncementsDocument
    })
    return {
      props: {
        article: {
          ...data?.articleBySlug,
          content: {
            ...content,
            article: fixedImageLinks,
            citations: citations,
            outline: procedureOutline
          }
        },
        meta_data: buildArticleMetadata(data.articleBySlug, lang as string),
        structured_data: buildArticleStructuredData(data.articleBySlug),
        [APOLLO_STATE_PROP_NAME]: client.cache.extract()
      },
      revalidate: 3600
    }
  } catch (e) {
    logger.error(`Error in regenerating article ${e.message}`, {
      stack: e.stack,
      params: params
    })
    return {
      notFound: true,
      revalidate: 10
    }
  }
}
