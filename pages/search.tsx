import Layout from 'components/layout'
import Grid from '@mui/material/Grid'
import { Box, CircularProgress, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GetServerSideProps, GetStaticProps } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import { frontPageTheme } from 'components/theme'
import ArticleControls from 'components/articles/ArticleControls'
import { ArticlesProvider } from 'components/articles/useArticles'
import ArticleList from 'components/articles/ArticleList'
import Pagination from 'components/articles/ArticleControls/Pagination'
import CategorySidebar from 'components/articles/CategorySidebar'
import { Search } from '@mui/icons-material'
import { useRouter } from 'next/router'

import { useEffect, useMemo, useState } from 'react'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { cleanObj } from 'common/utils'
import {
  ArticlesDocument,
  ArticlesQuery,
  ArticlesQueryVariables,
  useArticlesQuery
} from 'graphql/queries/articles.generated'
import { CategoriesQuery, CategoriesDocument } from 'graphql/queries/categories.generated'
import { ArticleSort } from 'graphql/types'
import { logger } from 'logger/logger'
import { buildArticleListStructuredData } from 'backend/seo/buildArticleListStructuredData'
import articles from './articles'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import useGoogleAnalyticsHelpers from 'components/hooks/useGoogleAnalyticsHelpers'
import {
  SiteWideAnnouncementsQuery,
  SiteWideAnnouncementsDocument
} from 'graphql/queries/announcement-for-user.generated'

type Props = {
  categories: CategoriesQuery['categories']
} & DefaultPageProps

export default function Articles({ categories }: Props) {
  const isClient = typeof window !== 'undefined'
  const router = useRouter()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const { q, page, sort_by } = router.query
  const noQuery = !q
  const { referredFrom, referrerPath, anon_link_id } = useGoogleAnalyticsHelpers()
  const { data } = useArticlesQuery({
    skip: noQuery,
    variables: {
      input: cleanObj({
        q: q as string,
        page: +page || 1,
        sort_by: (sort_by as ArticleSort) || ArticleSort.None,
        referredFrom,
        referrerPath,
        anon_link_id
      })
    }
  })
  const { articles, totalCount } = data?.articleOutput || {}

  const rendered = useMemo(() => {
    return (
      <Layout enableGutters={isMdUp}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <ThemeProvider theme={frontPageTheme}>
              <Stack>
                <Box display="flex" alignItems="center" px={{ xs: 2, md: 0 }} mb={1}>
                  <Search sx={{ color: 'text.secondary' }} fontSize="large" />
                  <Typography color="textSecondary" variant="h4" ml={1} fontSize={{ md: '1.5rem', xs: '1rem' }}>
                    Search for {`"${q}"`}
                  </Typography>
                </Box>
                <ArticlesProvider totalCount={totalCount ?? 0}>
                  <ArticleControls totalCount={totalCount} itemsPerPage={10} />

                  <ArticleList articles={articles} totalCount={totalCount} itemsPerPage={15} />

                  <Box alignSelf="flex-end" mt={1}>
                    <Pagination totalCount={totalCount} itemsPerPage={10} />
                  </Box>
                </ArticlesProvider>
              </Stack>
            </ThemeProvider>
          </Grid>
          <Grid item xs={12} md={3}>
            <CategorySidebar categories={categories} />
          </Grid>
        </Grid>
      </Layout>
    )
  }, [articles, categories, isMdUp, q, totalCount])
  return rendered
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  logger.info(`Regenerating search `, {
    ...context.params
  })

  const query = context.query
  const page = parseInt(query.page as string) || 1
  const sort_by = (query.sort_by as unknown as ArticleSort) || ArticleSort.None
  const q = query.q as string
  const client = getApolloAdminClient()

  const { data: categoriesData } = await client.query<CategoriesQuery>({
    query: CategoriesDocument
  })
  await client.query<SiteWideAnnouncementsQuery>({
    query: SiteWideAnnouncementsDocument
  })
  // if (process.env.NODE_ENV === 'production') {
  //   context.res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=300, stale-while-revalidate=600'
  //   )
  // }
  const input = cleanObj({
    page: page,
    sort_by: sort_by,
    q: q
  })

  const { data } = await client.query<ArticlesQuery, ArticlesQueryVariables>({
    variables: {
      input: input
    },
    query: ArticlesDocument
  })

  const articles = data?.articleOutput?.articles
  return {
    props: {
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      categories: categoriesData.categories,
      meta_data: buildGenericMetadata({
        title: 'Search',
        meta_desc: `Search for surgical video articles`,
        slug: 'search'
      }),
      structured_data: buildArticleListStructuredData(articles)
    }
  }
}
