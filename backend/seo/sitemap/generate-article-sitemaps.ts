import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { GetGridFS } from 'apis/mongo-client'
import {
  ArticlesForRssQuery,
  ArticlesForRssDocument
} from 'graphql/queries/articles-for-rss.generated'
import { create } from 'xmlbuilder2'
import { generateArticleSiteMap } from './generate-article'
import { writeFile } from './saveFile'

const ROOT = {
  sitemapindex: {
    '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'
  }
}

/**
 * Generates article_sitemap.xml and individual article sitemaps
 * @param origin
 * @returns
 */
export async function generateArticleSiteMaps(origin: string) {
  const client = await getApolloAdminClient()
  const { data } = await client.query<ArticlesForRssQuery>({
    query: ArticlesForRssDocument,
    fetchPolicy: 'network-only'
  })

  const articles = data?.articlesForRss

  const generateArticles = Promise.all(
    articles.map(async (article) => {
      await generateArticleSiteMap(article, origin)
    })
  )

  const result = articles.reduce((acc, article, index) => {
    return {
      ...acc,
      [`#${index}`]: [
        {
          sitemap: {
            loc: {
              '#': `${origin}/article-sitemaps/${article.publication_id}.xml`
            }
          }
        }
      ]
    }
  }, {})

  ROOT.sitemapindex = {
    ...ROOT.sitemapindex,
    ...result
  }

  const doc = create({ encoding: 'utf-8' }, ROOT)

  const xml = doc.end({ format: 'xml', prettyPrint: true })
  await generateArticles
  await writeFile('article_sitemap.xml', xml)

  return xml
}
