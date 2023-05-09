export const injectTOCAnchors = (html = "") => {
  var findHeaders = /(<h4>|<h5>)(.*?)(<\/h4>|<\/h5>)/gi
  html = html?.replace(findHeaders, (match, p1, p2, p3) => {
    var header = p2.toLowerCase().replace(/\s/g, '-').replace(/\.|,/g, '')
    var hiddenAnchor = `<a  id="${header}" href="#" aria-hidden="true"></a>`
    if (p1 === `<h4>`) {
      // return hiddenAnchor + `<h3>` + p2 + `</h3>`
      return `<a  id="${header}" href="#" aria-hidden="true" style="pointer-events:none; color: #000"><h3>${p2}</h3></a>`
    }
    if (p1 === `<h5>`) {
      // return hiddenAnchor + `<h4>` + p2 + `</h4>`
      return `<a  id="${header}" href="#" aria-hidden="true" style="pointer-events:none; color: #000"><h4>${p2}</h4></a>`
    }
    return hiddenAnchor + p1 + p2 + +p3
  })
  return html
}

export const modifyHeaders = (html = "") => {
  var findHeaders = /(<h4>|<h5>)(.*?)(<\/h4>|<\/h5>)/gi
  html = html?.replace(findHeaders, (match, p1, p2) => {
    if (p1 === `<h4>`) {
      return `<h3>` + p2 + `</h3>`
    }
    return `<h4>` + p2 + `</h4>`
  })
  return html
}

export function slugify(value: string) {
  return value
    .toString()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// Check if touchscreen
export function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  var mq = function (query) {
    return window.matchMedia(query).matches
  }

  if ('ontouchstart' in window) {
    return true
  }
  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

export function getArticleSlug(slug: string) {
  return slugify(slug).toLowerCase()
}
