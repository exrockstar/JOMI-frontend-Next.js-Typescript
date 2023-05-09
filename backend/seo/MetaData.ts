export type MetaData = Partial<{
  'article:modified_time': string
  'article:published_time': string
  'article:section': string
  'article:tag': string
  author: string
  citation_abstract: string
  citation_author: string
  citation_date: string
  citation_doi: string
  citation_id: string
  citation_issn: string
  citation_issue: string
  citation_journal_abbrev: string
  citation_journal_title: string
  citation_keywords: string
  citation_language: string
  citation_online_date: string
  citation_public_url: string
  citation_publication_date: string
  citation_section: string
  citation_title: string
  citation_volume: string
  citation_year: string
  thumbnail: string
  description: string
  'og:description': string
  'og:image:height': string
  'og:image:type': string
  'og:image:width': string
  'og:image': string
  'og:title': string
  'og:type': string
  'og:url': string
  'og:locale': string
  'og:site_name': string
  'profile:first_name': string
  'profile:last_name': string
  'profile:username': string
  title: string
  'twitter:card': string
  'twitter:description': string
  'twitter:image': string
  'twitter:player:height': string
  'twitter:player:stream:content_type': string
  'twitter:player:stream': string
  'twitter:player:width': string
  'twitter:player': string
  'twitter:site': string
  'twitter:title': string
}>

export type DefaultPageProps = {
  meta_data: MetaData
  structured_data?: string
}
