import { ArticlesQuery } from 'graphql/queries/articles.generated'
import { buildArticleStructuredDataObject } from './buildArticleStructuredData'
type Articles = ArticlesQuery['articleOutput']['articles']

export function buildArticleListStructuredData(articles: Articles) {
  const structuredData = articles.map((article, index) => {
    const obj = buildArticleStructuredDataObject(article) as any
    obj.position = `${index + 1}`

    return obj
  })

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Articles',
    itemListElement: structuredData
  })
}
