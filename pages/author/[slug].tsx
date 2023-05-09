import { APOLLO_STATE_PROP_NAME, initializeApollo } from 'apis/apollo-client'
import Layout from 'components/layout'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { ParsedUrlQuery } from 'querystring'
import { Box, CircularProgress, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import { frontPageTheme } from 'components/theme'
import ArticleControls from 'components/articles/ArticleControls'
import { ArticlesProvider } from 'components/articles/useArticles'
import ArticleList from 'components/articles/ArticleList'
import Pagination from 'components/articles/ArticleControls/Pagination'
import CategorySidebar from 'components/articles/CategorySidebar'
import AuthorHeader from 'components/articles/AuthorHeader'

import { useRouter } from 'next/router'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { getApolloClient } from 'apis/apollo-admin-client'
import { cleanObj } from 'common/utils'
import {
  ArticleAuthorsQuery,
  ArticleAuthorsDocument
} from 'graphql/queries/article-authors.generated'
import {
  AuthorBySlugQuery,
  AuthorBySlugQueryVariables,
  AuthorBySlugDocument
} from 'graphql/queries/author-by-slug.generated'
import {
  AuthorPageQuery,
  useAuthorPageQuery,
  AuthorPageQueryVariables,
  AuthorPageDocument
} from 'graphql/queries/author-page.generated'
import { ArticleSort } from 'graphql/types'
import { logger } from 'logger/logger'
import { buildArticleListStructuredData } from 'backend/seo/buildArticleListStructuredData'
type Props = {
  author?: AuthorBySlugQuery['authorBySlug']
  categories?: AuthorPageQuery['categories']
  [APOLLO_STATE_PROP_NAME]?: any
} & Partial<DefaultPageProps>

export default function Articles({ author, categories }: Props) {
  const router = useRouter()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const { query } = router
  const { data } = useAuthorPageQuery({
    skip: !author,
    variables: {
      input: cleanObj({
        page: +query.page || 1,
        sort_by: (query.sort_by as ArticleSort) || ArticleSort.None,
        authorId: author?._id
      })
    }
  })

  const { articles, totalCount } = data?.articleOutput || {}

  return (
    <Layout enableGutters={isMdUp}>
      <ThemeProvider theme={frontPageTheme}>
        <Container maxWidth="md">
          <AuthorHeader author={author} />
        </Container>
      </ThemeProvider>
      <Grid container>
        <Grid item xs={12} md={9} component="section">
          <Stack>
            <ArticleControls totalCount={totalCount} itemsPerPage={15} />
            <ArticleList
              articles={articles}
              totalCount={totalCount}
              itemsPerPage={15}
            />
            <Box alignSelf="flex-end">
              <Pagination totalCount={totalCount} itemsPerPage={15} />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3} component="nav">
          <CategorySidebar categories={categories ?? []} />
        </Grid>
      </Grid>
    </Layout>
  )
}
interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getApolloClient()
  const { data } = await client.query<ArticleAuthorsQuery>({
    query: ArticleAuthorsDocument
  })

  const slugs = data.output.articles
    .flatMap((article) => article.authors)
    .map((author) => author.slug)
    .filter((exist) => exist)

  return {
    paths: slugs.map((slug) => `/author/${slug}/`),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { slug } = context.params as IParams
  const client = getApolloClient()

  const { data } = await client.query<
    AuthorBySlugQuery,
    AuthorBySlugQueryVariables
  >({
    variables: {
      slug: slug as string
    },
    query: AuthorBySlugDocument
  })

  const { data: pageData } = await client.query<
    AuthorPageQuery,
    AuthorPageQueryVariables
  >({
    variables: {
      input: {
        page: 1,
        sort_by: ArticleSort.None,
        authorId: data.authorBySlug?._id
      }
    },
    query: AuthorPageDocument
  })

  const authorDisplayName = data.authorBySlug?.display_name
  const articles = pageData?.articleOutput?.articles
  if (data.authorBySlug) {
    return {
      props: {
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
        author: data.authorBySlug,
        categories: pageData.categories,
        meta_data: buildGenericMetadata({
          title: `${authorDisplayName} Articles`,
          meta_desc: `View all surgical video articles published by ${authorDisplayName}`,
          slug: `author/${data.authorBySlug?.slug}`
        }),
        structured_data: buildArticleListStructuredData(articles)
      },
      revalidate: 60
    }
  } else {
    //not found
    return {
      notFound: true
    }
  }
}
