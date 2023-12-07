import { Article } from './types'

type GroupedBySubHeading = {
  [key: string]: Article[]
}
export const groupBySubheading = (articles: Article[]): GroupedBySubHeading => {
  return articles.reduce((curr, article) => {
    const subheading = article.subheading || 'all'
    const articles = curr[subheading] ?? []
    curr[subheading] = [...articles, article]

    return curr
  }, {})
}
