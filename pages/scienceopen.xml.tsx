// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getApolloAdminClient } from 'apis/apollo-admin-client'
import {
  GetScienceOpenPubIdsDocument,
  GetScienceOpenPubIdsQuery
} from 'graphql/queries/scienceopen.generated'
import { GetServerSideProps } from 'next'
import { create } from 'xmlbuilder2'
const ScienceopenIndex = () => {
  return null
}
export default ScienceopenIndex

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const client = getApolloAdminClient()
    const { data } = await client.query<GetScienceOpenPubIdsQuery>({
      query: GetScienceOpenPubIdsDocument
    })
    const origin = req.headers.origin ?? 'https://jomi.com'

    const articles = data.getScienceOpenArticlesXml?.map((item) => {
      return {
        loc: `${origin}/scienceopen/${item.articlePublicationId}.xml`,
        lastmod: item.generatedAt,
        changefreq: 'monthly'
      }
    })
    const root = {
      urlset: {
        '@xmlns': 'https://www.sitemaps.org/schemas/sitemap/0.9',
        url: articles
      }
    }
    const doc = create({ encoding: 'UTF-8' }, root)

    const xml = doc.end({ format: 'xml', prettyPrint: true })
    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('x-robots-tag', 'noindex')
    res.write(xml)
    res.end()
  } catch (e) {
    return {
      props: {
        notFound: true
      }
    }
  }
  return {
    props: {}
  }
}
