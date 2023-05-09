import cheerio from 'cheerio'
/**
 * Optimizes and fixes broken link images which were translated from microsoft .
 */
export const fixImages = (article: string, articleId: string) => {
  if (!article) return ''

  const $ = cheerio.load(article)

  //fix for rows of images doesn't have row class
  $('.col-sm-4').parent().addClass('row')
  $('.col-xs-6').parent().addClass('row')

  $('a').each(function () {
    let href = $(this).attr('href')
    if (!href) return
    if (href.includes('../api')) {
      let url = '/' + href.split('../').pop()
      $(this).attr('href', url)
    }
  })

  $('img').each(function () {
    let src = $(this).attr('src')
    if (!src) return

    if (src.includes('../api')) {
      src = '/' + src.split('../').pop()
    }

    let url = `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=70`
    $(this).attr('src', url)
    $(this).attr('loading', 'lazy')
    const altAttr = $(this).attr('alt')
    if (!altAttr) {
      const alt = $(this)
        .parent()
        .parent()
        .find('em')
        .text()
        .replace(/nbsp/g, '')
        .trim()
        .slice(0, 125)
      $(this).attr('alt', alt)
    }
  })

  //wrap <sup> with no a tag so that it links to citation
  $('sup:not([data-cited=true])').map((index, elem) => {
    const id = $(elem).text().trim().charAt(0)
    $(elem).wrap(`<a href="#citation-${id}"></a>`)
  })

  const line_break_regex = /\r?\n|\r/g

  const html = $('body').html().replace(line_break_regex, '')
  return html
}
