import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import Layout from 'components/layout'
import Grid from '@mui/material/Grid'
import { Box, CircularProgress, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import { frontPageTheme } from 'components/theme'
import ArticleControls from 'components/articles/ArticleControls'
import { ArticlesProvider } from 'components/articles/useArticles'
import ArticleList from 'components/articles/ArticleList'
import Pagination from 'components/articles/ArticleControls/Pagination'
import CategorySidebar from 'components/articles/CategorySidebar'
import CategoryHeader from 'components/articles/CategoryHeader'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
  CategoriesQuery,
  useCategoriesQuery,
  CategoriesQueryVariables,
  CategoriesDocument
} from 'graphql/queries/categories.generated'
import { ArticleSort } from 'graphql/types'
import { buildArticleListStructuredData } from 'backend/seo/buildArticleListStructuredData'
import { logger } from 'logger/logger'
import {
  SiteWideAnnouncementsQuery,
  SiteWideAnnouncementsDocument
} from 'graphql/queries/announcement-for-user.generated'

type Props = {
  category: Unpacked<CategoriesQuery['categories']>
  [APOLLO_STATE_PROP_NAME]: any
} & DefaultPageProps

export default function Articles({ category }: Props) {
  const router = useRouter()
  const query = router.query
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const { data: categories } = useCategoriesQuery()
  const { data } = useArticlesQuery({
    variables: {
      input: cleanObj({
        page: +query.page || 1,
        sort_by: (query.sort_by as ArticleSort) || ArticleSort.None,
        categoryId: category._id
      })
    }
  })
  const { articles, totalCount } = data?.articleOutput || {}
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (totalCount) {
      setCount(totalCount)
    }
  }, [totalCount])

  return (
    <Layout enableGutters={isMdUp}>
      <ThemeProvider theme={frontPageTheme}>
        <CategoryHeader category={category} />
      </ThemeProvider>
      <Grid container>
        <Grid item xs={12} md={9} component="section">
          <ArticlesProvider totalCount={count}>
            <ArticleControls itemsPerPage={15} totalCount={count} />
          </ArticlesProvider>
          <ArticleList articles={articles} totalCount={count} itemsPerPage={15} />
          <Box alignSelf="flex-end">
            <Pagination itemsPerPage={15} totalCount={count} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3} component="nav">
          <CategorySidebar categories={categories?.categories ?? []} />
        </Grid>
      </Grid>
    </Layout>
  )
}

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   const client = getApolloAdminClient()
//   const { data: categoriesData } = await client.query<
//     CategoriesQuery,
//     CategoriesQueryVariables
//   >({
//     query: CategoriesDocument
//   })

//   return {
//     paths: categoriesData.categories.map((c) => `/categories/${c.slug}`),
//     fallback: 'blocking'
//   }
// }

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  try {
    const query = context.query
    const page = parseInt(query.page as string) || 1
    const sort_by = (query.sort_by as unknown as ArticleSort) || ArticleSort.None
    const { category: categorySlug } = context.params
    const client = getApolloAdminClient()

    const { data: categoriesData } = await client.query<CategoriesQuery, CategoriesQueryVariables>({
      query: CategoriesDocument
    })

    const category = categoriesData.categories.find((c) => c.slug === categorySlug)
    const { data } = await client.query<ArticlesQuery, ArticlesQueryVariables>({
      variables: {
        input: {
          page: page,
          sort_by: sort_by,
          categoryId: category._id
        }
      },
      query: ArticlesDocument
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

    const articles = data?.articleOutput?.articles

    return {
      props: {
        //return cache from serverside as props to eliminate extra calls to api
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
        category: category,
        meta_data: buildGenericMetadata({
          title: `${category.displayName} Articles`,
          meta_desc: `View all of JOMI's ${category.displayName} surgical video articles`,
          slug: `categories/${category.slug}`
        }),
        structured_data: buildArticleListStructuredData(articles)
      }
    }
  } catch (e) {
    logger.error(`Regenerating category error ${e.message}`, {
      stack: e.stack
    })
    return {
      notFound: true
    }
  }
}
