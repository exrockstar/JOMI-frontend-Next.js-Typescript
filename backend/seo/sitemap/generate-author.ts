import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { cleanParenthesis } from 'common/utils'
import {
  AuthorsDocument,
  AuthorsQuery
} from 'graphql/queries/authors.generated'
import { logger } from 'logger/logger'
import { create } from 'xmlbuilder2'

const ROOT = {
  urlset: {
    '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1'
  }
}
export async function generateAuthorSitemap(origin: string) {
  let result = {}
  const client = await getApolloAdminClient()
  const { data } = await client.query<AuthorsQuery>({
    query: AuthorsDocument,
    fetchPolicy: 'no-cache'
  })

  const authors = data?.authors

  if (!!authors?.length) {
    result = authors.reduce((acc, author, index) => {
      try {
        let imageSection = {}

        if (!!author?.image?.filename) {
          imageSection = {
            ...imageSection,
            [`#author${index}`]: [
              {
                'image:image': {
                  'image:loc': {
                    '#': `${origin}/api/files/${cleanParenthesis(
                      author.image.filename
                    )}`
                  },
                  'image:caption': {
                    '#': `${author.display_name}`
                  }
                }
              }
            ]
          }
        }

        return {
          ...acc,
          [`#${index}`]: [
            {
              url: {
                loc: {
                  '#': `${origin}/author/${author.slug}`
                },
                ...imageSection,
                changefreq: {
                  '#': 'monthly'
                }
              }
            }
          ]
        }
      } catch (e) {
        logger.error(e.message)
        return
      }
    }, {})
  }

  ROOT.urlset = {
    ...ROOT.urlset,
    ...result
  }

  const doc = create({ encoding: 'utf-8' }, ROOT)

  const xml = doc.end({ format: 'xml', prettyPrint: true })

  return xml
}
