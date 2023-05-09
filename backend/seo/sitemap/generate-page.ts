import { getApolloAdminClient } from 'apis/apollo-admin-client'

import { PagesDocument, PagesQuery } from 'graphql/queries/pages.generated'
import { create } from 'xmlbuilder2'

const ROOT = {
  urlset: {
    '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'
  }
}

export async function generatePageSiteMap(origin: string) {
  let result = {}
  const BASE = {
    '#account': [
      {
        url: {
          loc: {
            '#text': `${origin}/account`
          },
          priority: {
            '#text': 0.7
          }
        }
      }
    ],
    '#index': [
      {
        url: {
          loc: {
            '#text': `${origin}`
          },
          priority: {
            '#text': 1.0
          }
        }
      }
    ],
    '#articles': [
      {
        url: {
          loc: {
            '#text': `${origin}/articles`
          },
          changefreq: {
            '#text': 'monthly'
          },
          priority: {
            '#text': 0.8
          }
        }
      }
    ]
  }

  const client = await getApolloAdminClient()
  const { data } = await client.query<PagesQuery>({
    query: PagesDocument,
    fetchPolicy: 'no-cache'
  })

  const pages = data?.pages

  if (!!pages?.length) {
    result = pages.reduce((acc, page: any, index) => {
      const updated = new Date(page.updated).toISOString()

      let priority: number

      switch (page.slug) {
        case 'about':
        case 'index':
          priority = 0.8
          break
        default:
          priority = 0.5
          break
      }

      return {
        ...acc,
        [`#${index}`]: [
          {
            url: {
              loc: {
                '#text': `${origin}/${page.slug}`
              },
              changefreq: {
                '#text': 'monthly'
              },
              lastmod: {
                '#text': `${updated}`
              },
              priority: {
                '#text': `${priority}`
              }
            }
          }
        ]
      }
    }, {})
  }

  ROOT.urlset = {
    ...ROOT.urlset,
    ...BASE,
    ...result
  }

  const doc = create({ encoding: 'utf-8' }, ROOT)

  const xml = doc.end({ format: 'xml', prettyPrint: true })

  return xml
}
