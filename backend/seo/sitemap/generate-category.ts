import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { cleanParenthesis } from 'common/utils'
import {
  AuthorsDocument,
  AuthorsQuery
} from 'graphql/queries/authors.generated'
import {
  CategoriesDocument,
  CategoriesQuery
} from 'graphql/queries/categories.generated'
import { create } from 'xmlbuilder2'

const ROOT = {
  urlset: {
    '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1'
  }
}
export async function generateCategorySitemap(origin: string) {
  let result = {}
  const client = await getApolloAdminClient()
  const { data } = await client.query<CategoriesQuery>({
    query: CategoriesDocument,
    fetchPolicy: 'no-cache'
  })

  const categories = data?.categories

  if (!!categories?.length) {
    result = categories.reduce((acc, category: any, index) => {
      return {
        ...acc,
        [`#${index}`]: [
          {
            url: {
              loc: {
                '#': `${origin}/categories/${category.slug}`
              },
              changefreq: {
                '#': 'monthly'
              }
            }
          }
        ]
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
