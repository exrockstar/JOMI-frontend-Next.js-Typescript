/* eslint-disable @next/next/no-sync-scripts */
import { Box, Typography, Link as MuiLink, Button, Stack, FormControlLabel, Tooltip, Checkbox } from '@mui/material'
import { styled } from '@mui/material/styles'
import Layout from 'components/layout'
import Script from 'next/script'
import Head from 'next/head'
import { GetServerSideProps, GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'

import cheerio from 'cheerio'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { logger } from 'logger/logger'

import { PageBySlugQuery, PageBySlugQueryVariables, PageBySlugDocument } from 'graphql/queries/page-by-slug.generated'
import { transformContent } from 'components/article-index/transformContent'
import { ArticleIndexSection, Article } from 'components/article-index/types'
import TableOfContents from 'components/article-index/TableOfContents'
import ArticleSection from 'components/article-index/ArticleSection'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BlueLink } from 'components/common/BlueLink'
import { ArticlesDocument, ArticlesQuery, ArticlesQueryVariables } from 'graphql/queries/articles.generated'
import ExampleCases from 'components/article-index/ExampleCases'
import uniq from 'lodash/uniq'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import {
  SiteWideAnnouncementsQuery,
  SiteWideAnnouncementsDocument
} from 'graphql/queries/announcement-for-user.generated'
type ExampleCaseItem = {
  title: string
  slug: string
  author: string
  hospital: string
  publication_id: string
  category: string
}
type Props = {
  indexInfo: string
  sections: ArticleIndexSection[]
  exampleCases: ExampleCaseItem[]
} & DefaultPageProps
type ArticleIndexQuery = {
  soon?: boolean
  score?: boolean
}
const ArticleIndexPage = ({ sections, indexInfo, exampleCases }: Props) => {
  const router = useRouter()
  const [futureArticlesShown, setFutureArticlesShown] = useState(false)
  const [availableArticlesShown, setAvailableArticlesShown] = useState(true)
  const [scoreArticlesShown, setScoreArticlesShown] = useState(false)

  const totalArticles = sections.flatMap((section) => section.articles.filter((article) => !article.soon))
  const numArticles = uniq(totalArticles.map((a) => a.publication_id))
  useEffect(() => {
    if (router.isReady) {
      if (router.query.soon) {
        setFutureArticlesShown(true)
      }
      if (router.query.score) {
        setScoreArticlesShown(true)
        setAvailableArticlesShown(false)
        setFutureArticlesShown(false)
      }
    }
  }, [router.isReady, router.query.score, router.query.soon])

  useEffect(() => {
    const hashId = router.asPath.replace(/.*#/, '')
    const elem = document.getElementById(hashId)
    elem?.scrollIntoView()
  }, [])
  return (
    <Layout>
      <Box bgcolor="white" px={2} py={4}>
        <Typography variant="h4" component="h1">
          Article Index
        </Typography>
        <Box sx={{ a: { color: 'linkblue.main' } }}>
          <div dangerouslySetInnerHTML={{ __html: indexInfo }} />
        </Box>

        <Box>
          <ExampleCases cases={exampleCases} />
          <TableOfContents sections={sections} />
          <Typography variant="body2">Total articles : {numArticles?.length}</Typography>
          <Typography variant="body2">Select cases to display</Typography>
          <Stack direction="row" flexWrap="wrap">
            {/* <FormControlLabel
              control={
                <Tooltip arrow title="Show future articles">
                  <Checkbox
                    size="small"
                    checked={futureArticlesShown}
                    onChange={(e, checked) => {
                      setFutureArticlesShown(checked)
                      checked && setScoreArticlesShown(false)
                      if (checked) {
                        router.push({ query: { soon: true } }, null, {
                          shallow: true
                        })
                      } else {
                        router.push({ query: {} }, null, { shallow: true })
                      }
                    }}
                  />
                </Tooltip>
              }
              label="Coming soon"
            /> */}
            <FormControlLabel
              control={
                <Tooltip arrow title="Show available articles">
                  <Checkbox
                    size="small"
                    checked={availableArticlesShown}
                    onChange={(e, checked) => {
                      setAvailableArticlesShown(checked)
                      checked && setScoreArticlesShown(!checked)
                      if (checked) {
                        const query: ArticleIndexQuery = {}
                        if (futureArticlesShown) {
                          query.soon = true
                        }
                        router.push({ query }, null, { shallow: true })
                      }
                    }}
                  />
                </Tooltip>
              }
              label="Available"
            />
            <FormControlLabel
              control={
                <Tooltip arrow title="Show SCORE curriculum articles">
                  <Checkbox
                    size="small"
                    checked={scoreArticlesShown}
                    onChange={(e, checked) => {
                      setScoreArticlesShown(checked)
                      setFutureArticlesShown(!checked)
                      setAvailableArticlesShown(!checked)
                      if (checked) {
                        router.push({ query: { score: true } }, null, {
                          shallow: true
                        })
                      } else {
                        router.push({ query: {} }, null, { shallow: true })
                      }
                    }}
                  />
                </Tooltip>
              }
              label="Show only SCORE curriculum"
            />
          </Stack>
          {sections.map((section, index) => {
            return (
              <ArticleSection
                section={section}
                key={index}
                showComingSoon={futureArticlesShown}
                showAvailable={availableArticlesShown}
                showScore={scoreArticlesShown}
              />
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}

export default ArticleIndexPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  logger.info(`Regenerating article-index`)
  const client = getApolloAdminClient()
  const { data } = await client.query<PageBySlugQuery, PageBySlugQueryVariables>({
    variables: {
      slug: 'index'
    },
    query: PageBySlugDocument,
    fetchPolicy: 'no-cache'
  })
  const examplecasesId = ['251', '315', '273', '301']
  const authorIndex = [0, 2, 0, 1]
  const { data: articles } = await client.query<ArticlesQuery, ArticlesQueryVariables>({
    variables: {
      input: {
        page: 1,
        perPage: 1000
      }
    },
    query: ArticlesDocument,
    fetchPolicy: 'no-cache'
  })
  const exampleCases = examplecasesId.map((id) => {
    return articles.articleOutput.articles?.find((a) => a?.publication_id === id)
  })
  const content = data.pageBySlug?.content
  const { indexInfo, sections } = transformContent(content, articles.articleOutput?.articles)
  await client.resetStore()
  await client.query<SiteWideAnnouncementsQuery>({
    query: SiteWideAnnouncementsDocument
  })
  return {
    props: {
      indexInfo: indexInfo,
      sections: sections,
      exampleCases: exampleCases
        ?.filter((e) => !!e)
        .map((item, i) => {
          const articleSection = sections
            .flatMap((section) => {
              return section.articles
            })
            .find((article) => article?.publication_id === item?.publication_id)

          const category = `${articleSection?.categoryText}, ${articleSection?.subheading}`
          return {
            author: item.authors[authorIndex[i]]?.display_name ?? '',
            hospital: item.hospital?.name ?? '',
            slug: item.slug,
            title: item.title,
            publication_id: item.publication_id,
            category: category
          }
        }),
      [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      meta_data: buildGenericMetadata(data?.pageBySlug)
    },
    revalidate: 3600
  }
}
