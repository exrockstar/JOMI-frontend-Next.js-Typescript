import { BASE_URL, SITE_NAME } from 'common/constants'
import { PageBySlugQuery } from 'graphql/queries/page-by-slug.generated'
import { defaultMeta } from './defaultMetaInfo'
import { MetaData } from './MetaData'

export function buildGenericMetadata(
  page?: Partial<PageBySlugQuery['pageBySlug']>
): MetaData {
  if (!page) return
  const title = `${page.title} | ${SITE_NAME}`
  const description = page.meta_desc ?? defaultMeta.description
  const pageMetadata: MetaData = {
    title: title,
    description: description,
    'og:description': description,
    'og:title': title,
    'twitter:title': title,
    'twitter:description': description
  }

  if (page.slug) {
    pageMetadata['og:url'] = BASE_URL + '/' + page.slug
  }

  return {
    ...defaultMeta,
    ...pageMetadata
  }
}
