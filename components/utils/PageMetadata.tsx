import { defaultMeta } from 'backend/seo/defaultMetaInfo'
import { MetaData } from 'backend/seo/MetaData'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

type Props = {
  meta_data?: MetaData
}
const PageMetadata = ({ meta_data = defaultMeta }: Props) => {
  const entries = Object.entries(meta_data)
  return (
    <Head>
      <meta key="charset" charSet="utf-8" />
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title key="title">{meta_data.title}</title>
      <link
        rel="canonical"
        href={meta_data['og:url'] ?? defaultMeta['og:url']}
        key="canonical"
      />
      <meta name="description" content={meta_data.description} />
      <meta name="title" content={meta_data.title} />
      {entries.map((entry) => {
        const [key, value] = entry
        const nameOrProperty = key.includes(':') ? 'property' : 'name'
        if (['description', 'title'].includes(key)) return null

        const props = {
          [nameOrProperty]: key,
          content: value
        }

        return <meta key={key} {...props} />
      })}
      <meta
        name="facebook-domain-verification"
        content="2apk8jsvska1zsfi5jwmu1dbc541an"
      />
    </Head>
  )
}

export default PageMetadata
