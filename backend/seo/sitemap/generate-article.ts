import { cleanParenthesis } from 'common/utils'
import { ArticlesForRssQuery } from 'graphql/queries/articles-for-rss.generated'
import { logger } from 'logger/logger'
import { create } from 'xmlbuilder2'
import { writeFile } from './saveFile'
const ROOT = {
  urlset: {
    '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
    '@xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1',
    '@xmlns:xhtml': 'http://www.w3.org/1999/xhtml'
  }
}
type Article = Unpacked<ArticlesForRssQuery['articlesForRss']>
/**
 * Generates a sitemap for individual articles
 * @param origin
 * @returns
 */
export async function generateArticleSiteMap(article: Article, origin: string) {
  try {
    const updated = new Date(article?.updated || 0).toISOString()
    let locales = ['en']
    if (article.enabled_languages) {
      locales = locales
        .concat(article.enabled_languages)
        .map((l) => l.toLowerCase())
    }
    const tabs = ['', 'procedure-outline']
    let imageSection = {}
    let videoSection = {}
    let category = {}
    let contentLoc = {}
    let thumbnailLoc = {}
    let viewCount = {}

    if (!!article?.image?.filename) {
      imageSection = {
        ...imageSection,
        [`#filename`]: [
          {
            'image:image': {
              'image:loc': {
                '#': `${origin}/api/files/${cleanParenthesis(
                  article.image.filename
                )}`
              },
              'image:caption': {
                '#': `${article.title.replace('&', '&amp;')}`
              }
            }
          }
        ]
      }
    }

    if (!!article?.wistia_id) {
      let vidLength: number
      let tags = {}

      if (!!article?.wistia && Boolean(article.wistia.duration)) {
        vidLength = article.wistia.duration || 0
      }

      if (article.vid_length?.length) {
        vidLength = article.vid_length
          .split(':')
          .reverse()
          .reduce(
            (memo, value, index) => memo + 60 * index * parseInt(value),
            0
          )
      }

      if (!!article?.tags) {
        article.tags.map((tag, index) => {
          tags = {
            ...tags,
            [`#tag`]: [
              {
                'video:tag': {
                  '#': `${tag}`
                }
              }
            ]
          }
        })
      }

      if (!!article?.categories) {
        const categories = article.categories.map((category) =>
          category.displayName?.replace('&', '&amp;')
        )

        category = {
          ...category,
          [`#category`]: [
            {
              'video:category': {
                '#': `${categories.join(', ')}`
              }
            }
          ]
        }
      }

      if (Boolean(article.wistia_id) && article.assets.length > 0) {
        let mp4Vids = article.assets.filter(
          (a) => a.contentType === 'video/mp4'
        )

        if (mp4Vids !== undefined && mp4Vids.length > 0) {
          mp4Vids = mp4Vids.sort((a, b) => a.fileSize - b.fileSize)

          let vidUrl = mp4Vids[0].url

          vidUrl = vidUrl.slice(0, -4)
          vidUrl += '/video.mp4'

          contentLoc = {
            ...contentLoc,
            [`#content`]: [
              {
                'video:content_loc': {
                  '#': `${vidUrl}`
                }
              }
            ]
          }
        }
      }

      if (!!article?.wistia?.thumbnail?.url) {
        thumbnailLoc = {
          ...thumbnailLoc,
          [`#thumbnail`]: [
            {
              'video:thumbnail_loc': {
                '#': `${article.wistia.thumbnail.url}`
              }
            }
          ]
        }
      }

      if (!!article?.stats && Boolean(article.stats.plays)) {
        viewCount = {
          ...viewCount,
          [`#view`]: [
            {
              'video:view_count': {
                '#': `${article.stats.views}`
              }
            }
          ]
        }
      }

      videoSection = {
        ...videoSection,
        [`#video`]: [
          {
            'video:video': {
              ...contentLoc,
              'video:player_loc': {
                '#': `https://fast.wistia.net/embed/iframe/${article.wistia_id}`
              },
              ...thumbnailLoc,
              'video:title': {
                '#': `${article.title.replace('&', '&amp;')}`
              },
              'video:description': {
                '#': `${
                  article.content.abstract
                    ? encodeURIComponent(
                        article.content.abstract.replace(/<(?:.|\n)*?>/gm, '')
                      )
                    : ''
                }`
              },
              'video:duration': {
                '#': `${vidLength}`
              },
              ...viewCount,
              'video:family_friendly': {
                '#': 'yes'
              },
              ...tags,
              ...category,
              'video:gallery_loc': {
                '@title': 'All Articles',
                '#': `${origin}/articles`
              },
              'video:requires_subscription': {
                '#': 'no'
              },
              'video:uploader': {
                '#': 'Journal of Medical Insight'
              },
              'video:live': {
                '#': 'no'
              }
            }
          }
        ]
      }
    }

    const result = {
      [`#resultabstract`]: tabs.map((tab) => {
        return locales.map((loc) => {
          const urlLang = loc === 'en' ? '' : `/${loc}`
          let defaultURL = `${origin}/article/${article.publication_id}/${article.slug}`

          if (tab) {
            defaultURL += `/${tab}`
          }

          const defaultAlternative = {
            'xhtml:link': {
              '@rel': 'alternate',
              '@hreflang': 'x-default',
              '@href': defaultURL
            }
          }

          const alternativeUrls = locales.reduce((acc, lang, index) => {
            const urlLang = lang === 'en' ? '' : `/${lang}`
            const href = `${defaultURL}${urlLang}`

            return {
              ...acc,
              [`#alternative-url-${index}`]: {
                'xhtml:link': {
                  '@rel': 'alternate',
                  '@hreflang': lang.toLowerCase(),
                  '@href': href
                }
              }
            }
          }, {})
          return {
            url: {
              loc: {
                '#': `${defaultURL}${urlLang}`
              },
              ...alternativeUrls,
              ...defaultAlternative,
              ...imageSection,
              ...videoSection,
              lastmod: {
                '#': `${updated}`
              },
              changefreq: {
                '#': 'weekly'
              },
              priority: {
                '#': '1.0'
              }
            }
          }
        })
      })
    }

    ROOT.urlset = {
      ...ROOT.urlset,
      ...result
    }

    const doc = create({ encoding: 'utf-8' }, ROOT)

    const xml = doc.end({ format: 'xml', prettyPrint: true })

    await writeFile(`article-${article.publication_id}.xml`, xml)
  } catch (e) {
    logger.error(e.message)
  }
}
