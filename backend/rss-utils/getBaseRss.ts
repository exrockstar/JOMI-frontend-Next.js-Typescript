import { SITE_NAME } from 'common/constants'

export const getBaseRss = (hostname: string) => {
  return {
    rss: {
      '@version': '2.0',
      '@xmlns:media': 'https://search.yahoo.com/mrss/',
      '@xmlns:atom': 'https://www.w3.org/2005/Atom',
      channel: {
        'atom:link': {
          '@rel': 'search',
          '@href': `${hostname}/opensearch.xml`,
          '@type': 'application/opensearchdescription+xml',
          '@title': 'Article Search'
        },
        title: {
          '#': `${SITE_NAME} - Articles`
        },
        image: {
          link: {
            '#': `${hostname}/articles`
          },
          title: {
            '#': `${SITE_NAME} - All Articles`
          },
          url: {
            '#': `${hostname}/img/enso_transparent.png`
          }
        },
        link: {
          '#': `${hostname}/articles`
        },
        description: {
          '#': `All Video Articles by the ${SITE_NAME}`
        },
        language: {
          '#': 'en-US'
        },
        copyright: {
          '#': `Copyright ${new Date().getFullYear()}, ${SITE_NAME}`
        },
        category: {
          '#': 'Medical'
        }
      }
    }
  }
}
