import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import Layout from 'components/layout'
import Grid from '@mui/material/Grid'
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GetServerSideProps, GetStaticProps } from 'next'

import ArticleControls from 'components/articles/ArticleControls'
import { ArticlesProvider } from 'components/articles/useArticles'
import ArticleList from 'components/articles/ArticleList'
import Pagination from 'components/articles/ArticleControls/Pagination'
import CategorySidebar from 'components/articles/CategorySidebar'

import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import Head from 'next/head'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { cleanObj } from 'common/utils'
import {
  useArticlesQuery,
  ArticlesQuery,
  ArticlesQueryVariables,
  ArticlesDocument
} from 'graphql/queries/articles.generated'
import {
  useCategoriesQuery,
  CategoriesQuery,
  CategoriesQueryVariables,
  CategoriesDocument
} from 'graphql/queries/categories.generated'
import { ArticleSort } from 'graphql/types'
import { buildArticleListStructuredData } from 'backend/seo/buildArticleListStructuredData'

type Props = {
  [APOLLO_STATE_PROP_NAME]: any
} & DefaultPageProps

function Articles() {
  const router = useRouter()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const query = router.query
  const page = +query.page || 1
  const { data } = useArticlesQuery({
    variables: {
      input: cleanObj({
        page: page,
        sort_by: (query.sort_by as ArticleSort) || ArticleSort.None
      })
    }
  })
  const { data: categories } = useCategoriesQuery()
  const { articles, totalCount } = data?.articleOutput || {}

  const component = useMemo(() => {
    return (
      <Layout enableGutters={isMdUp}>
        <Head>
          <link rel="next" href={`/articles/page=${page + 1}`} />
        </Head>
        <Typography component="h1" display="none">
          {' '}
          All Articles
        </Typography>

        <Grid container my={8}>
          <Grid item xs={12} md={9} component="section">
            <ArticleControls totalCount={totalCount} itemsPerPage={15} />
            <ArticleList
              articles={articles}
              totalCount={totalCount}
              itemsPerPage={15}
            />
            <Box alignSelf="flex-end" mt={1}>
              <Pagination totalCount={totalCount} itemsPerPage={15} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3} component="nav">
            <CategorySidebar categories={categories?.categories ?? []} />
          </Grid>
        </Grid>
      </Layout>
    )
  }, [articles, categories?.categories, isMdUp, page, totalCount])

  return component
}

export default Articles

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  console.log('Regenerating articles page')
  const query = context.query
  const page = parseInt(query.page as string) || 1
  const sort_by = (query.sort_by as unknown as ArticleSort) || ArticleSort.None
  const resetCache = !!query.resetCache || false
  const client = getApolloAdminClient(resetCache)

  const { data } = await client.query<ArticlesQuery, ArticlesQueryVariables>({
    variables: {
      input: {
        page: page,
        sort_by: sort_by
      }
    },
    query: ArticlesDocument
  })

  await client.query<CategoriesQuery, CategoriesQueryVariables>({
    query: CategoriesDocument
  })

  // if (process.env.NODE_ENV === 'production') {
  //   context.res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=10, stale-while-revalidate=30'
  //   )
  // }
  const articles = data?.articleOutput?.articles
  return {
    props: {
      //return cache from serverside as props to eliminate extra calls to api
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      meta_data: buildGenericMetadata({
        title: 'All Articles',
        meta_desc: "Explore all of JOMI's surgical video articles",
        slug: 'articles'
      }),
      structured_data: buildArticleListStructuredData(articles)
    }
  }
}
