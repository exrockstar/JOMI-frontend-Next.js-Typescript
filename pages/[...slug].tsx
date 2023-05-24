import { ParsedUrlQuery } from 'querystring'
import { Box } from '@mui/material'
import Layout from 'components/layout'
import Script from 'next/script'

import { GetServerSideProps, GetStaticProps } from 'next'
import { DefaultPageProps } from 'backend/seo/MetaData'
import { buildGenericMetadata } from 'backend/seo/buildGenericMetadata'
import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { logger } from 'logger/logger'
import { PageBySlugQuery, PageBySlugQueryVariables, PageBySlugDocument } from 'graphql/queries/page-by-slug.generated'
import { PagesQuery, PagesDocument } from 'graphql/queries/pages.generated'
import cheerio from 'cheerio'
import { APOLLO_STATE_PROP_NAME } from 'apis/apollo-client'
import {
  SiteWideAnnouncementsQuery,
  SiteWideAnnouncementsDocument
} from 'graphql/queries/announcement-for-user.generated'
const isProduction = process.env.APP_ENV === 'production'
type Props = {
  page: PageBySlugQuery['pageBySlug']
  scripts: string[]
} & DefaultPageProps

export default function SinglePage({ page, scripts }: Props) {
  return (
    <Layout>
      {scripts?.map((script, index) => (
        <Script key={index} src={script} />
      ))}
      <Box sx={{ backgroundColor: 'white', wordBreak: 'break-word' }} p={2}>
        <div dangerouslySetInnerHTML={{ __html: page?.content }} className="generated" />
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
  slug: string[]
}
export const getStaticProps: GetStaticProps<Props, IParams> = async ({ params }) => {
  logger.info(`Regenerating page ${params.slug}`)
  try {
    const client = getApolloAdminClient()
    const { data } = await client.query<PageBySlugQuery, PageBySlugQueryVariables>({
      variables: {
        slug: params.slug.join('/')
      },
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
    await client.clearStore()
    await client.query<SiteWideAnnouncementsQuery>({
      query: SiteWideAnnouncementsDocument
    })
    return {
      props: {
        page: {
          ...data?.pageBySlug,
          content: content
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
