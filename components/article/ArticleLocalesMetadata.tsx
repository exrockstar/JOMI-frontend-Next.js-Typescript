import { BASE_URL, LOCALES } from 'common/constants'
import { ArticlesBySlugQuery } from 'graphql/queries/article-by-slug.generated'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  article: ArticlesBySlugQuery['articleBySlug']
}

const ArticleLocalesMetadata = ({ article }: Props) => {
  const router = useRouter()
  let locales = ['en']
  if (article.enabled_languages) {
    locales = locales.concat(article.enabled_languages)
  }
  const params = Array.isArray(router.query.slug)
    ? [...router.query.slug]
    : [router.query.slug]
  const isOtherTabSelected = ['procedure-outline', 'transcript'].includes(
    params[2]
  )
  let slug = params.slice(0, 2).join('/')
  if (isOtherTabSelected) {
    slug = params.slice(0, 3).join('/')
  }

  function getTitle() {
    if (isOtherTabSelected) {
      switch (params[2]) {
        case 'procedure-outline':
          return `${article.title} - Procedure Outline | JOMI`
        case 'transcript':
          return `${article.title} - Transcript | JOMI`
      }
    }

    return `${article.title} | JOMI`
  }
  return (
    <Head>
      <title key="title">{getTitle()}</title>
      {locales.map((locale) => {
        locale = locale.toLowerCase()
        const urlLocale = locale === 'en' ? '' : `/${locale}`
        let url = `${BASE_URL}/article/${slug}${urlLocale}`

        return (
          <link
            key={`alternate-link-${locale}`}
            rel="alternate"
            href={url}
            hrefLang={locale}
          />
        )
      })}

      <link
        rel="alternate"
        href={`${BASE_URL}/article/${slug}`}
        hrefLang="x-default"
      />
    </Head>
  )
}

export default ArticleLocalesMetadata
