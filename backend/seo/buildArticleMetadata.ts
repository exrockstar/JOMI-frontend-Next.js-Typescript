import { SITE_NAME, BASE_URL } from 'common/constants'
import dayjs from 'dayjs'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import { decode } from 'html-entities'
import { defaultMeta } from './defaultMetaInfo'
import { MetaData } from './MetaData'

type Article = ArticlesBySlugQuery['articleBySlug']
export function buildArticleMetadata(
  article: Article,
  locale: string,
  tab: string
): MetaData {
  if (!article) return
  const title = `${article.title} | ${SITE_NAME}`
  const description =
    article.descriptionSEO ?? article.content?.abstract?.slice(0, 300) + '...'
  const cleanedDescription = decode(description)
  let public_url =
    BASE_URL + '/article/' + article.publication_id + '/' + article.slug

  if (tab) {
    public_url += `/${tab}`
  }
  let ogUrl = public_url + ''
  if (!locale.startsWith('en')) {
    ogUrl += `/${locale}`
  }
  const meta: MetaData = {
    title: title,
    description: cleanedDescription,
    'og:description': cleanedDescription,
    'og:title': title,
    'og:type': 'article',
    'og:url': ogUrl,
    'twitter:title': title,
    'twitter:description': cleanedDescription
  }
  const image = article.image
  if (image?.filename) {
    meta['og:image'] = `${BASE_URL}/api/files/${image.filename}`
    meta['og:image:type'] = `image/${image.format.toLowerCase()}`
    meta.thumbnail = meta['og:image']
    if (image?.geometry) {
      meta['og:image:width'] = image.geometry?.width.toString()
      meta['og:image:height'] = image.geometry?.height.toString()
    }
  }

  const authors = article.authors?.map((author) => author.display_name)

  meta.author = authors.join(', ')

  article.authors?.forEach((author) => {
    meta['profile:first_name'] = author.name.first
    meta['profile:last_name'] = author.name.last
    meta['profile:username'] = author.display_name
    meta.citation_author = `${author.name.last.replace(/\s|md|\./gi, '')}, ${
      author.name.first
    }`
  })

  let [video] = article.assets
    ?.filter((asset) => asset.contentType === 'video/mp4')
    .sort((a, b) => a.fileSize - b.fileSize)

  let vid_url = video?.url ?? ''
  vid_url = vid_url.slice(0, -4)
  vid_url += '/video.mp4'

  if (video) {
    meta['og:video'] = ogUrl
    meta['og:video:secure_url'] = ogUrl
    meta['og:video:type'] = 'video/mp4'
    meta['og:video:width'] = video.width
    meta['og:video:height'] = video.height
  }

  const category_list = article.categories
    ?.map((category) => category.displayName)
    .join(', ')

  meta['article:section'] = category_list

  const tag_list = article.tags?.join(', ').replace(/,,/g, ',')
  meta['article:tag'] = tag_list

  if (article.wistia_id) {
    meta['twitter:card'] = 'player'
    meta['twitter:player'] = ogUrl
    meta['twitter:player:width'] = '600'
    meta['twitter:player:height'] = '366'

    if (article.wistia?.thumbnail) {
      meta['twitter:image'] = article.wistia.thumbnail.url
    }

    meta['twitter:player:stream'] = vid_url
    meta['twitter:player:stream:content_type'] = 'video/mp4'
  } else {
    meta['twitter:card'] = 'summary_large_image'
    meta['twitter:image'] = `${BASE_URL}/api/files/${image.filename}`
  }

  meta['citation_abstract'] = decode(article.content?.abstract?.slice(0, 155))
  meta['citation_title'] = article.title
  meta['citation_public_url'] = public_url

  if (tag_list) {
    meta['citation_keywords'] = tag_list
  }

  if (category_list) {
    meta['citation_section'] = category_list
  }

  const pub_date = dayjs(article.published)
  const created_date = dayjs(article.created)
  const modified_date = dayjs(article.updated)

  const GOOGLE_SCHOLAR_FORMAT = 'YYYY/MM/DD'
  if (article.published) {
    const pub_date_string = pub_date.format(GOOGLE_SCHOLAR_FORMAT)
    const issue = pub_date.month()
    const volume = pub_date.year()

    meta['article:published_time'] = pub_date_string
    meta['citation_publication_date'] = pub_date_string
    meta['citation_date'] = pub_date_string
    meta['citation_issue'] = `${issue}`
    meta['citation_volume'] = `${volume}`
    meta['citation_year'] = `${volume}`
  } else {
    meta['citation_publication_date'] = created_date.year().toString()
  }

  if (article.publication_id) {
    const prefix = 'https://doi.org/10.24296/jomi/'

    meta['citation_doi'] = `${prefix}${article.publication_id}`
  }

  meta['citation_online_date'] = created_date.format(GOOGLE_SCHOLAR_FORMAT)
  meta['article:modified_time'] = modified_date.format(GOOGLE_SCHOLAR_FORMAT)
  meta['citation_journal_title'] = SITE_NAME
  meta['citation_journal_abbrev'] = 'JOMI'
  meta['citation_issn'] = '2373-6003'
  meta['citation_language'] = 'en-US'
  meta['citation_id'] = article._id

  return {
    ...defaultMeta,
    ...meta
  }
}
