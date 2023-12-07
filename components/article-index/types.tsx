export type Article = {
  score?: boolean
  soon?: boolean
  subheading: string
  title: string
  url: string
  publication_id: string
  categoryText: string
  level: number
  subheadingSection: string
}

export type ArticleIndexSection = {
  categoryId: string
  categoryText: string
  description?: string
  articles: Article[]
}

export type ArticleIndexData = {
  indexInfo: string
  sections: ArticleIndexSection[]
}
