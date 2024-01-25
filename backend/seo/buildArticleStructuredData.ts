import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { ArticlesQuery } from 'graphql/queries/articles.generated'
type Articles = ArticlesQuery['articleOutput']['articles']

type Article = ArticlesBySlugQuery['articleBySlug'] | Unpacked<Articles>

export const buildArticleStructuredDataObject = (
  article: Article,
  tab: string = ''
) => {
  const { slug, authors, descriptionSEO, publication_id } = article
  let articleUrl = `https://jomi.com/article/${publication_id}/${slug}`
  const defaultImgUrl = 'https://jomi.com/img/01_standard_white.png'
  const articleImgUrl =
    article.image && `https://jomi.com/api/files/${article.image.filename}`
  const defaultAuthor = { '@type': 'Organization', name: 'JOMI' }
  const articleDate = !article.published
    ? !article.preprint_date
      ? article.created
      : article.preprint_date
    : article.published

  if (tab) {
    articleUrl += '/' + tab
  }
  const authorsData = authors
    ? authors.map((author) => ({
        '@type': 'Person',
        name: author.display_name
      }))
    : defaultAuthor

  const datePublished = new Date(articleDate).toISOString().split('T')[0]
  const dateModified = new Date(article.updated).toISOString().split('T')[0]

  return {
    '@context': 'https://schema.org',
    '@type': ['Article', 'MedicalScholarlyArticle'],
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    headline: article.title,
    description: descriptionSEO,
    image:
      article.image && article.image.filename ? articleImgUrl : defaultImgUrl,
    thumbnailUrl: articleImgUrl ?? defaultImgUrl,
    author: authorsData,
    publisher: {
      '@type': 'Organization',
      name: 'Journal of Medical Insight',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jomi.com/img/logo.svg'
      }
    },
    keywords: article.tags
      ? Array.isArray(article.tags)
        ? article.tags.join(' ')
        : article.tags
      : '',
    commentCount: article.comment_count,
    datePublished,
    dateModified
  }
}

export const buildArticleStructuredData = (article: Article, tab: string) => {
  const obj = buildArticleStructuredDataObject(article, tab)

  return JSON.stringify(obj, null, 2)
}
