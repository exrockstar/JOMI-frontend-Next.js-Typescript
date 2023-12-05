import cheerio from 'cheerio'
import { ArticlesQuery } from 'graphql/queries/articles.generated'

import { Article, ArticleIndexData, ArticleIndexSection } from './types'

type ArticlesData = ArticlesQuery['articleOutput']['articles']
const mapArticle = (
  $: cheerio.Root,
  elem: cheerio.Element,
  articlesData: ArticlesData,
  subheading: string = '',
  heading: string = '',
  subheadingSection: string = '',
): Article => {
  let level = 0 //level of the element in the content
  if($(elem).parent().parent().is('li')){
    level = 1
  }
  const soon = $(elem).hasClass('soon')
  const score = $(elem).hasClass('score')
  let url = $(elem).find('a').attr('href') ?? ''
  const title = $(elem).find('a').first().text() //Only grab the text of the selected element instead of all li elements
  let publication_id = ''
  
  url = url.replace('https://jomi.com/', '')
  if (url) {
    const modified_url = url?.replace(/\.\.\//g, '')
    const params = modified_url?.split('/')
    publication_id = params[1]
    const article = articlesData.find(
      (a) => a.publication_id === publication_id
    )
    if (article) {
      const canonical_url = `/article/${publication_id}/${article.slug}`
      url = canonical_url
    }
  }

  return {
    soon,
    score,
    url,
    title,
    subheading,
    publication_id,
    categoryText: heading,
    level,
    subheadingSection
  }
}

/**
 * Transform html content from cms to json
 */
export const transformContent = (
  content: string,
  articlesData: ArticlesData
): ArticleIndexData => {
  const $ = cheerio.load(content)
  const indexInfo = $('.index-info').html()
  const sections = $('.section')
    .map((_, elem) => {
      const heading = $(elem).find('.section_heading')
      
      const articles = $(elem)
        .find('.subsections')
        .map((_, elem) => {
          //check if there are subheadings
          let arr = $(elem)
            .find('h4.subsection_heading')
            .map((_, elem) => {
              const subheading = $(elem).text()

              //check if there are subheading sections
              let subheadingSections = $(elem).nextUntil('h4', 'h5')
              if(subheadingSections.length > 0){
                let arr = $(elem)
                  .nextUntil('h4', 'h5')
                  .map((_, elem) => {
                    const subheading_sectionText = $(elem).text()
                    
                    const articles = $(elem)
                      .next('ul')
                      .find('li')
                      .toArray() 
                      .flatMap((elem, i) => { 
                        return mapArticle(
                          $,
                          elem,
                          articlesData,
                          subheading,
                          $(heading).text(),
                          subheading_sectionText
                        )
                      })
                    return articles
                  })
                  .get()

                  return arr
              } else {
                const articles = $(elem)
                  .next('ul')
                  .find('li')
                  .toArray() 
                  .flatMap((elem, i) => { 
                    return mapArticle(
                      $,
                      elem,
                      articlesData,
                      subheading,
                      $(heading).text(),
                    )
                  })
                
                return articles
              }
            })
            .get()

          //if no subheadings get articles directly.
          if (!arr.length) {
            arr = $(elem)
              .find('ul > li')
              .map((_, elem) => mapArticle($, elem, articlesData))
              .get() as Article[]
          }
          return arr
        })
        .get() as Article[][]

      //Updated version of above as of 1/13/23
      // const articles = $(elem)
      //   .find('.subsections')
      //   .map((_, elem) => {
      //     //check if there are subheadings
      //     let arr = $(elem)
      //       .find('h4.subsection_heading')
      //       .map((_, elem) => {
      //         const subheading = $(elem).text()
      //         const articles = $(elem)
      //           .next('ul')
      //           .find('li')
      //           .toArray()
      //           .flatMap((elem) => {
      //             if ($(elem).find('ul a')) {
      //               return $(elem)
      //                 .find('ul a')
      //                 .map((i, elem) => {
      //                   const level = $(elem).parents('ul').toArray()
      //                   console.log('level', level.length)
      //                   return mapArticle(
      //                     $,
      //                     elem,
      //                     articlesData,
      //                     subheading,
      //                     $(heading).text(),
      //                     2
      //                   )
      //                 })
      //                 .get() as Article[]
      //             } else {
      //               const level = $(elem).parents('ul').toArray()
      //               console.log('level', level.length)
      //               return mapArticle(
      //                 $,
      //                 elem,
      //                 articlesData,
      //                 subheading,
      //                 $(heading).text(),
      //                 level.length
      //               )
      //             }
      //       })
      //       return articles
      //     })
      //     .get()

      //     //if no subheadings get articles directly.
      //     if (!arr.length) {
      //       arr = $(elem)
      //         .find('ul > li')
      //         .map((_, elem) => mapArticle($, elem, articlesData))
      //         .get() as Article[]
      //     }
      //     return arr
      //   })
      //   .get() as Article[][]
      return {
        categoryId: $(heading).attr('id') ?? null,
        categoryText: $(heading).text(),
        description: $(elem).find('span.section_description').text() ?? null,
        articles: articles.flatMap((arr) => arr)
      } as ArticleIndexSection
    })
    .get() as ArticleIndexSection[]
  return {
    indexInfo,
    sections
  }
}
