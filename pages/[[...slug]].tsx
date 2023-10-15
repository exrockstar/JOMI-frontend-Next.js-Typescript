import { ParsedUrlQuery } from 'querystring'
import { Box } from '@mui/material'
import Layout from 'components/layout'
import Script from 'next/script'

import { GetStaticProps } from 'next'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { logger } from 'logger/logger'
import {
  PageBySlugQuery,
  PageBySlugQueryVariables,
  PageBySlugDocument
} from 'graphql/queries/page-by-slug.generated'
import { PagesQuery, PagesDocument } from 'graphql/queries/pages.generated'
import cheerio from 'cheerio'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import {
  SiteWideAnnouncementsQuery,
  SiteWideAnnouncementsDocument
} from 'graphql/queries/announcement-for-user.generated'
const isProduction = process.env.APP_ENV === 'production'
import ArticleIndex, {
  getStaticProps as articleIndexGetStaticProps
} from './article-index'
import { useRouter } from 'next/router'
import { ArticleIndexSection } from 'components/article-index/types'
import ESBCPage, {
  getStaticProps as esbcGetStaticProps
} from './conference'
import HomePage, { getStaticProps as homeGetStaticProps } from './home'

type GenericPageProps = {
  page: PageBySlugQuery['pageBySlug']
  scripts: string[]
  _name: 'generic'
} & DefaultPageProps

type ExampleCaseItem = {
  title: string
  slug: string
  author: string
  hospital: string
  publication_id: string
  category: string
}
type ArticleIndexProps = {
  indexInfo: string
  sections: ArticleIndexSection[]
  exampleCases: ExampleCaseItem[]
  _name: 'index'
} & DefaultPageProps

type ESBCPageProps = {
  introductionSection: string
  featuredCasesSection: string
  videosSection: string
  scripts: string[]
  _name: 'esbc'
} & DefaultPageProps

export default function SinglePage(
  props: GenericPageProps | ArticleIndexProps | ESBCPageProps
) {
  // when a proxy such as ezproxy is used, sometimmes nextjs matches /[[...slug ]] route instead of
  // /home route. Hence, we have thes condition below. Same with /article-index or /index.
  if (!props._name) {
    let _props = props as any
    return <HomePage {..._props} />
  }

  if (props._name === 'index') {
    let _props = props as ArticleIndexProps
    return <ArticleIndex {..._props} />
  }

  if (props._name === 'esbc') {
    let _props = props as ESBCPageProps
    return <ESBCPage {..._props} />
  }

  // render generic page
  let _props = props as GenericPageProps
  const { scripts, page } = _props
  return (
    <Layout>
      {scripts?.map((script, index) => (
        <Script key={index} src={script} />
      ))}
      <Box sx={{ backgroundColor: 'white', wordBreak: 'break-word' }} p={2}>
        <div
          dangerouslySetInnerHTML={{ __html: page?.content }}
          className="generated"
        />
      </Box>
    </Layout>
  )
}

export async function getStaticPaths() {
  const client = getApolloAdminClient()
  const { data } = await client.query<PagesQuery>({
    query: PagesDocument,
    fetchPolicy: 'no-cache'
  })

  const paths = data?.pages?.map(({ slug, title, _id }) => {
    const splitSlug = slug ? slug.split('/') : [slug]

    return {
      params: {
        slug: [...splitSlug],
        id: _id
      }
    }
  })
  return {
    paths: isProduction ? paths : [],
    fallback: 'blocking'
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string[] | string
}
export const getStaticProps: GetStaticProps<any, IParams> = async ({
  params
}) => {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  logger.info(`Regenerating page ${params.slug}`)
  // when a proxy such as ezproxy is used, sometimmes nextjs matches /[[...slug ]] route instead of
  // /home route. Hence, we have thes condition below. Same with /article-index or /index.

  if (!slug) {
    const props = await homeGetStaticProps({ params })
    return props
  }

  if (slug.startsWith('index')) {
    return await articleIndexGetStaticProps({ params })
  }

  if (slug.startsWith('esbc')) {
    return await esbcGetStaticProps({ params })
  }

  try {
    const client = getApolloAdminClient()
    const { data } = await client.query<
      PageBySlugQuery,
      PageBySlugQueryVariables
    >({
      variables: { slug },
      query: PageBySlugDocument,
      fetchPolicy: 'no-cache'
    })
    let scripts = []
    data?.pageBySlug?.scripts?.map((script) => {
      const src = getWordsBetween(script)
      src?.map((script) => {
        scripts.push(script)
      })
    })

    if (!data?.pageBySlug) {
      throw new Error('Page not found')
    }

    const $ = cheerio.load(data?.pageBySlug.content)
    $('a').each(function () {
      var href = $(this).attr('href')
      if (href?.startsWith('http')) {
        $(this).attr('rel', 'nofollow')
      }
    })

    const content = $('body').html()
    const styles = `<style>${$('style').html()}</style>\n`
    const stylesAndContent = styles.concat(content)
    await client.query<SiteWideAnnouncementsQuery>({
      query: SiteWideAnnouncementsDocument
    })
    return {
      props: {
        _name: 'generic',
        page: {
          ...data?.pageBySlug,
          content: stylesAndContent,
        },
        scripts,
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
        meta_data: buildGenericMetadata(data?.pageBySlug ?? { title: 'Error' })
      },
      revalidate: 3600
    }
  } catch (e) {
    console.log('e', e.message)
  }

  return {
    notFound: true
  }
}

function getWordsBetween(str) {
  let results = [],
    re = /"([^"]+)"/g,
    text

  while ((text = re.exec(str))) {
    results.push(text[1])
  }
  return results
}
