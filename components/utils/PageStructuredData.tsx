import { useRouter } from 'next/router'
import React from 'react'

/**
 * Common structured data for all pages
 */
const PageStructuredData = () => {
  const router = useRouter()

  const cmsOrAccess =
    router.pathname.startsWith('/cms') || router.pathname.startsWith('/access')
  return (
    !cmsOrAccess && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Journal of Medical Insight",
            "url": "https://jomi.com",
            "logo": "https://jomi.com/img/logo.svg",
            "email": "contact@jomi.com",
            "address": "",
            "sameAs": [
              "https://www.facebook.com/JomiJournal",
              "https://goo.gl/maps/ikcBrhD3zfDfsmEL7",
              "https://twitter.com/JoMIJournal",
              "https://www.instagram.com/jomijournal",
              "https://www.youtube.com/user/JomiJournal"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://jomi.com/",
            "potentialAction": [{
              "@type": "SearchAction",
              "target": "https://jomi.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }]
          }
        ]
      }`
        }}
      ></script>
    )
  )
}

export default PageStructuredData
