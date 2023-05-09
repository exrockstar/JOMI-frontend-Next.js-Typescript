import dayjs from 'dayjs'
import { create } from 'xmlbuilder2'

const ROOT = {
  sitemapindex: {
    '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'
  }
}

export const generateSiteMapIndex = (origin: string) => {
  const sitemaps = [
    'article_sitemap',
    'author_sitemap',
    'category_sitemap',
    'page_sitemap'
  ]

  const result = sitemaps.reduce((acc, filename, index) => {
    return {
      ...acc,
      [`#${index}`]: [
        {
          sitemap: {
            loc: {
              '#': `${origin}/${filename}.xml`
            }
          }
        }
      ]
    }
  }, {})

  ROOT.sitemapindex = {
    ...ROOT.sitemapindex,
    ...result
  }

  const doc = create({ encoding: 'utf-8' }, ROOT)

  const xml = doc.end({ format: 'xml', prettyPrint: true })

  return xml
}
