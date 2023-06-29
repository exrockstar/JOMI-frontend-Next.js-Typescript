import { isProduction } from 'common/constants'
import { slugify } from 'components/utils/helpers'
import { MouseEventHandler } from 'react'
import ReactGA from 'react-ga'
import * as amplitude from '@amplitude/analytics-browser';
// import ReactGA4 from 'react-ga4'

const init = () => {
  const googleTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

  ReactGA.initialize(googleTrackingId, { debug: !isProduction })

  !isProduction && console.log('*** INIT GOOGLE ANALYITCS IN DEBUG MODE ***')
}

const set = (object: any) => {
  ReactGA.set(object)

  console.log(`setting dimensions ${JSON.stringify(object, null, 2)}`)
}

const pageView = (page: string) => {
  ReactGA.pageview(page)
}

const event = (categoryName: string, eventName: string, label?: string) => {
  ReactGA.event({
    category: categoryName,
    action: eventName,
    label
  })
}

const exception = (object: any) => {
  ReactGA.exception(object)
}

const trackClick: MouseEventHandler = (e) => {
  const eventName = (e.target as HTMLElement).dataset['event']

  if (!!eventName) {
    const isClient = typeof window !== 'undefined'
    event('Click', eventName)
    console.log('track click')
    gtag('event', 'click', {
      event_label: slugify(eventName),
      referredFrom: isClient ? localStorage.getItem('referrer') ?? '' : '',
      referrerPath: isClient ? localStorage.getItem('referrerPath') ?? '' : '',
      anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    })
    amplitude.track('Click', {
      target: slugify(eventName),
      anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    })
  }
}

const trackOutboundClick: MouseEventHandler = (e) => {
  const eventName = (e.target as HTMLElement).dataset['event']

  if (!!eventName) {
    const isClient = typeof window !== 'undefined'
    event('outbound-click', 'click', eventName)
    gtag('event', 'outbound-click', {
      event_label: slugify(eventName),
      referredFrom: isClient ? localStorage.getItem('referrer') ?? '' : '',
      referrerPath: isClient ? localStorage.getItem('referrerPath') ?? '' : '',
      anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    })
    amplitude.track('Outbound Click', {
      target: slugify(eventName),
      anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    })
  }
}

const trackCheckout: MouseEventHandler = (e) => {
  const eventName = (e.target as HTMLElement).dataset['event']
  const isClient = typeof window !== 'undefined'
  if (!!eventName) {
    event('begin_checkout', 'click', eventName)
    gtag('event', 'begin_checkout', {
      event_label: slugify(eventName),
      referredFrom: isClient ? localStorage.getItem('referrer') ?? '' : '',
      referrerPath: isClient ? localStorage.getItem('referrerPath') ?? '' : '',
      anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    })
  }
}

const trackPurchase = (params: any) => {
  // event('purchase', params)
  const isClient = typeof window !== 'undefined'
  gtag('event', 'purchase', {
    params,
    referredFrom: isClient ? localStorage.getItem('referrer') ?? '' : '',
    referrerPath: isClient ? localStorage.getItem('referrerPath') ?? '' : '',
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

const trackSearch = (query: string) => {
  if (!!query) {
    const isClient = typeof window !== 'undefined'
    event('search', `${query}`)
    gtag('event', 'search', {
      value: query,
      referredFrom: isClient ? localStorage.getItem('referrer') ?? '' : '',
      referrerPath: isClient ? localStorage.getItem('referrerPath') ?? '' : '',
      anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    })
  }
}

const trackFailedLogin = (message) => {
  exception({
    description: `LoginFailed - ${message}`,
    fatal: false
  })
}

const trackError = (message: string) => {
  exception({
    description: message,
    fatal: false
  })
}

const trackArticleView = (params: Object) => {
  const isClient = typeof window !== 'undefined'
  gtag('event', 'article_view', {
    params,
    referredFrom: isClient ? localStorage.getItem('referrer') ?? '' : '',
    referrerPath: isClient ? localStorage.getItem('referrerPath') ?? '' : '',
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

const trackTrial = (
  eventParams: Gtag.CustomParams | Gtag.ControlParams | Gtag.EventParams = {}
) => {
  const isClient = typeof window !== 'undefined'
  gtag('event', 'get_trial', {
    ...eventParams,
    referredFrom: isClient ? localStorage.getItem('referrer') ?? '' : '',
    referrerPath: isClient ? localStorage.getItem('referrerPath') ?? '' : '',
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

export const analytics = {
  init,
  set,
  pageView,
  exception,
  trackClick,
  trackOutboundClick,
  trackSearch,
  trackError,
  trackFailedLogin,
  trackCheckout,
  event,
  trackPurchase,
  trackArticleView,
  trackTrial
}
