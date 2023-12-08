import { isProduction } from 'common/constants'
import { slugify } from 'components/utils/helpers'
import { MouseEventHandler } from 'react'
import ReactGA from 'react-ga'
import * as amplitude from '@amplitude/analytics-browser';
// import ReactGA4 from 'react-ga4'

type ArticleViewParams = {
  categories: string[],
  title: string,
  authors: string[],
  tags: string[],
  publicationId: string
}

type CreateAccountParams = {
  firstName: string,
  lastName: string,
  institutionName: string,
  institutionalEmail: string,
  userType: string,
  specialty: string,
  userEmail: string
}

type RenewalParams = {
  transaction_id: string,
  value: number,
  promoCode: string,
  description: string,
  type: string,
  items: [
    {
      item_id: string,
      item_name: string,
      price: number,
      quantity: 1
    }
  ]
}

type PurchaseParams = {
  transaction_id: string,
  value: number,
  currency: string,
  type: string,
  promoCode: string,
  description: string,
  interval: string,
  items: [
    {
      item_id: string,
      item_name: string,
      price: number,
      quantity: 1
    }
  ]
}

type FeedbackParams = {
  question_id: string,
  question: string,
  value: any,
  type: string,
  method: any
}

type InitPPAParams = {
  userId: string,
  value: number
}

type ShowFeedbackParams = {
  question_id: string,
}

type RequestSubscriptionParams = {
  institution_name: string,
}

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
  // ReactGA.pageview(page)
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'page_view',
    'page': page,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
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
    
    const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
    const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
    const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    window.dataLayer.push({
      'event': 'outbound-click',
      'target': slugify(eventName),
      'referredFrom': referredFrom,
      'referrerPath': referrerPath,
      'anon_link_id': anon_link_id
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
    
    const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
    const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
    const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    window.dataLayer.push({
      'event': 'outbound-click',
      'target': slugify(eventName),
      'referredFrom': referredFrom,
      'referrerPath': referrerPath,
      'anon_link_id': anon_link_id
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
    
    const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
    const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
    const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    window.dataLayer.push({
      'event': 'begin_checkout',
      'target': eventName,
      'referredFrom': referredFrom,
      'referrerPath': referrerPath,
      'anon_link_id': anon_link_id
    })
  }
}

const trackPurchase = (eventParams: PurchaseParams) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'purchase',
    'transaction_id': eventParams.transaction_id,
    'value': eventParams.value,
    'promoCode': eventParams.promoCode,
    'type': eventParams.type,
    'description': eventParams.description,
    'currency': eventParams.currency,
    'items': eventParams.items,
    'interval': eventParams.interval,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackPurchaseArticle = (eventParams: PurchaseParams) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'purchase_article',
    'transaction_id': eventParams.transaction_id,
    'value': eventParams.value,
    'promoCode': eventParams.promoCode,
    'type': eventParams.type,
    'description': eventParams.description,
    'currency': eventParams.currency,
    'items': eventParams.items,
    'interval': eventParams.interval,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackRentArticle = (eventParams: PurchaseParams) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'rent_article',
    'transaction_id': eventParams.transaction_id,
    'value': eventParams.value,
    'promoCode': eventParams.promoCode,
    'type': eventParams.type,
    'description': eventParams.description,
    'currency': eventParams.currency,
    'items': eventParams.items,
    'interval': eventParams.interval,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackSearch = (query: string) => {
  if (!!query) {
    const isClient = typeof window !== 'undefined'
    const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
    const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
    const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
    window.dataLayer.push({
      'event': 'search',
      'value': query,
      'referredFrom': referredFrom,
      'referrerPath': referrerPath,
      'anon_link_id': anon_link_id
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

const trackArticleView = (params: ArticleViewParams) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'article_view',
    'categories': params.categories,
    'title': params.title,
    'authors': params.authors,
    'tags': params.tags,
    'publicationId': params.publicationId,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackTrial = () => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'trial',
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackCreateAccount = (
  eventParams: CreateAccountParams
) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'create_account',
    'firstName': eventParams.firstName,
    'lastName': eventParams.lastName,
    'institutionName': eventParams.institutionName,
    'institutionalEmail': eventParams.institutionalEmail,
    'userType': eventParams.userType,
    'specialty': eventParams.specialty,
    'userEmail': eventParams.userEmail,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackRenewal = (
  eventParams: RenewalParams
) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  window.dataLayer.push({
    'event': 'renewal',
    'transaction_id': eventParams.transaction_id,
    'value': eventParams.value,
    'promoCode': eventParams.promoCode,
    'type': eventParams.type,
    'description': eventParams.description,
    'items': eventParams.items,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackFeedback = (
  eventParams: FeedbackParams
) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  
  window.dataLayer.push({
    'event': 'feedback',
    'question_id': eventParams.question_id,
    'question': eventParams.question,
    'value': eventParams.value,
    'type': eventParams.type,
    'method': eventParams.method,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackShowFeedback = (
  eventParams: ShowFeedbackParams
) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  
  window.dataLayer.push({
    'event': 'show_feedback',
    'question': eventParams.question_id,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackInitPurchaseArticle = (
  eventParams: InitPPAParams
) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  
  window.dataLayer.push({
    'event': 'initiate_purchase_article',
    'userId': eventParams.userId,
    'value': eventParams.value,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackInitRentArticle = (
  eventParams: InitPPAParams
) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  
  window.dataLayer.push({
    'event': 'initiate_rent_article',
    'userId': eventParams.userId,
    'value': eventParams.value,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
  })
}

const trackRequestSubscription = (
  eventParams: RequestSubscriptionParams
) => {
  const isClient = typeof window !== 'undefined'
  const referredFrom = isClient ? localStorage.getItem('referrer') ?? '' : ''
  const referrerPath = isClient ? localStorage.getItem('referrerPath') ?? '' : ''
  const anon_link_id = isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  
  window.dataLayer.push({
    'event': 'request_subscription',
    'institution_name': eventParams.institution_name,
    'referredFrom': referredFrom,
    'referrerPath': referrerPath,
    'anon_link_id': anon_link_id
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
  trackTrial,
  trackCreateAccount,
  trackRenewal,
  trackFeedback,
  trackShowFeedback,
  trackInitPurchaseArticle,
  trackInitRentArticle,
  trackRequestSubscription,
  trackRentArticle,
  trackPurchaseArticle,
}
