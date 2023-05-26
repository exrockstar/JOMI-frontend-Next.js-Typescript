import { getApolloAdminClient } from 'apis/apollo-admin-client'
import { isEmpty, sortBy } from 'lodash'
import { decode } from 'html-entities'
import { SITE_NAME } from 'common/constants'
import { ArticlesForRssQuery, ArticlesForRssDocument } from 'graphql/queries/articles-for-rss.generated'
export async function getArticlesRss(origin: string) {
  const client = await getApolloAdminClient()
  const { data } = await client.query<ArticlesForRssQuery>({
    query: ArticlesForRssDocument,
    fetchPolicy: 'no-cache'
  })

  let result
  const articles = data.articlesForRss

  if (!!articles?.length) {
    result = articles.reduce((acc, article, index) => {
      let pubdate = {}
      let category = {}
      let enclosure = {}
      let media_group = {}
      let media_content = {}
      let media_keywords = {}
      let media_thumbnail = {}
      let media_community = {}

      const abstract = decode(article.content?.abstract ?? '')

      const description = isEmpty(article.content.abstract) ? article.title : abstract

      if (!!article?.published) {
        const $pubdate = new Date(article?.published || void 0).toISOString()

        pubdate = {
          ...pubdate,
          [`#pub${index}`]: [
            {
              pubDate: {
                '#': `${$pubdate}`
              }
            }
          ]
        }
      }

      if (!!article?.categories && !!article.categories?.length) {
        const $category = article.categories.map((c) => c._id)[0]

        category = {
          ...pubdate,
          [`#category${index}`]: [
            {
              category: {
                '#': `${$category}`
              }
            }
          ]
        }
      }

      if (!isEmpty(article.wistia_id)) {
        const current_year = new Date().getFullYear()

        if (!isEmpty(article.wistia_id) && !!article.assets?.length) {
          let mp4_vids = article.assets?.filter((c) => c.contentType === 'video/mp4')

          if (!!mp4_vids && !!mp4_vids?.length) {
            mp4_vids = sortBy(mp4_vids, (vid) => {
              return vid.fileSize
            })

            const vid = mp4_vids[0]
            const vid_url = `${vid.url.slice(0, -4)}/video.mp4`
            const hash = vid.url.split('/').pop().slice(0, -4)

            media_content = {
              ...media_content,
              [`#medcontent${index}`]: [
                {
                  'media:content': {
                    '@url': `${vid_url}`,
                    '@fileSize': `${vid.fileSize}`,
                    '@type': `${vid.contentType}`,
                    '@width': `${vid.width}`,
                    '@height': `${vid.height}`
                  },
                  'media:hash': {
                    '@algo': 'md5',
                    '#': `${hash}`
                  }
                }
              ]
            }
          }
        }

        if (!!article?.tags && !!article?.tags) {
          const tags = article.tags.map((tag, index) => {
            return index != article.tags.length - 1 ? `${tag}, ` : tag
          })

          media_keywords = {
            ...media_keywords,
            [`#keywords${index}`]: [
              {
                'media:keywords': {
                  '#': `${tags}`
                }
              }
            ]
          }
        }

        if (!!article?.wistia?.thumbnail?.url) {
          media_thumbnail = {
            ...media_thumbnail,
            [`#thumb${index}`]: [
              {
                'media:thumbnail': {
                  '@url': `${article.wistia.thumbnail.url}`,
                  '@width': `${article.wistia.thumbnail.width}`,
                  '@height': `${article.wistia.thumbnail.height}`
                }
              }
            ]
          }

          if (!!article?.stats && !isEmpty(article.stats)) {
            media_community = {
              ...media_community,
              [`#community${index}`]: [
                {
                  'media:community': {
                    'media:statistics': {
                      '@views': `${article.stats.views}`
                    }
                  }
                }
              ]
            }
          }
        }

        media_group = {
          ...media_group,
          ...media_content,
          ...media_keywords,
          [`#medadd${index}`]: [
            {
              'media:title': {
                '#': `${article.title}`
              }
              // 'media:description': {
              //   '#': abstract
              // }
            }
          ],
          ...media_thumbnail,
          [`#medaddpl${index}`]: [
            {
              'media:player': {
                '@url': `https://fast.wistia.net/embed/iframe/${article.wistia_id}`
              },
              'media:copyright': {
                '#': `${current_year} ${SITE_NAME}`
              }
            }
          ],
          ...media_community
        }
      }

      return {
        ...acc,
        [`#res${index}`]: [
          {
            item: {
              title: {
                '#': `${article.title}`
              },
              link: {
                '#': `${origin}/article/${article.publication_id}/${article.slug}`
              },
              description: {
                '#': description
              },
              ...pubdate,
              ...category,
              ...enclosure,
              guid: {
                '@isPermaLink': 'false',
                '#': `${article._id}`
              },
              source: {
                '@url': `${origin}`,
                '#': SITE_NAME
              },
              ...media_group
            }
          }
        ]
      }
    }, {})
  }

  return result
}
