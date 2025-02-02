import * as amplitude from '@amplitude/analytics-browser';
import { EnrichmentPlugin } from '@amplitude/analytics-types';
import { OrderType } from 'graphql/types';
import { logger } from 'logger/logger';

type PurchaseParams = {
  transaction_id: string,
  value: number,
  currency: string,
  type: OrderType,
  description: string,
  promoCode: string,
  interval: string,
}

const isClient = typeof window !== 'undefined'
/**
 * Purpose: to set all events as a 'test' event when testing in localhost
 * @returns EnrichmentPlugin
 */
const testingEvents = (): EnrichmentPlugin => {
  return {
    name: 'testing-enrichment',
    type: 'enrichment',
    execute: async (event) => {
      event.event_properties = {
        ...event.event_properties,
        test: "test",
      };
      return event;
    },
  };
};

/**
 * Purpose: Initialize Amplitude
 */
export const amplitudeInit = () => {
  process.env.AMPLITUDE_API_KEY &&
    amplitude.init(process.env.AMPLITUDE_API_KEY, 
      {
        minIdLength: 4
      },
    )
}

/**
 * Purpose: Set the User ID for Amplitude
 * @param userId: a string representing the db ID of the user.
 */
export const amplitudeSetUserID = (userId: string) => {
  amplitude.setUserId(userId)
}

/**
 * Purpose: Set additional user properties
 * @param props: an object representing the properties we want to set for the user
 */
export const amplitudeSetUserProps = (props: Object) => {
  const identifyEvent = new amplitude.Identify()
  for (const [key, value] of Object.entries(props)) {
    identifyEvent.set(`${key}`, `${value}`)
  }
  amplitude.identify(identifyEvent)
}

/**
 * Purpose: Set additional user properties once. Subsequent calls to setOnce are ignored.
 * Useful for setting properties that you do not want to override (anon-link-id) and may unexpectedly change
 * at some point.
 * @param props: an object representing the properties we want to set for the user
 */
export const amplitudeSetUserPropsOnce = (props: Object) => {
  const identifyEvent = new amplitude.Identify()
  for (const [key, value] of Object.entries(props)) {
    identifyEvent.setOnce(`${key}`, `${value}`)
  }
  amplitude.identify(identifyEvent)
}

/**
 * Purpose: Add numerical values to user properties. Ex: The user views an article,
 * so add 1 to the user's articleCount.
 * @param props: an object representing the properties we want to add to the user
 */
export const amplitudeAddToUserProps = (props: Object) => {
  const identifyEvent = new amplitude.Identify()
  for (const [key, value] of Object.entries(props)) {
    identifyEvent.add(`${key}`, value)
  }
  amplitude.identify(identifyEvent)
}

export const amplitudeGetSessionId = () => {
  return amplitude.getSessionId()
}

/**
 * Purpose: Track an article view statistic
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackArticleView = (params: Object) => {
  amplitude.track('Article View', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
  amplitudeAddToUserProps({ articleCount: 1 })
}

/**
 * Purpose: Track when a user initiates a checkout for a purchaseable product 
 * (PPA, Subscription)
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackInitiateCheckout = (params: Object) => {
  amplitude.track('Initiate Checkout', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
  amplitudeAddToUserProps({ initCheckoutCount: 1 })
}

/**
 * Purpose: Track when a user completes a purchase
 * (PPA, Subscription)
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackPurchase = (params: PurchaseParams) => {
  amplitude.track('Purchase', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
  amplitudeAddToUserProps({ purchaseCount: 1, revenueFromUser: params.value})
}

/**
 * Purpose: Track when a user completes a purchase
 * (PPA, Subscription)
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackPurchaseArticle = (params: PurchaseParams) => {
  amplitude.track('Purchase Article', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
  amplitudeAddToUserProps({ purchaseCount: 1, revenueFromUser: params.value})
}

/**
 * Purpose: Track when a user completes a purchase
 * (PPA, Subscription)
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackRentArticle = (params: PurchaseParams) => {
  amplitude.track('Rent Article', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
  amplitudeAddToUserProps({ purchaseCount: 1, revenueFromUser: params.value})
}

/**
 * Purpose: Track when a user performs a search
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackSearch = (params: Object) => {
  amplitude.track('Search', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
  amplitudeAddToUserProps({ searchCount: 1 })
}

/**
 * Purpose: Track when a user signs up for a trial
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackTrial = (params: Object) => {
  amplitude.track('Trial', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user submits feedback
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackFeedback = (params: Object) => {
  amplitude.track('Feedback', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user requests an institutional subscription
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackRequestSubscription = (params: Object) => {
  amplitude.track('Request Subscription', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
  amplitudeAddToUserProps({ requestInstSubCount: 1 })
}

/**
 * Purpose: Track when a user creates an account
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackCreateAccount = (params: Object) => {
  amplitude.track('Create Account', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user renews their subscription
 * @param params: An Object whose properties we use to add to the tracked event.
 */
export const amplitudeTrackRenewal = (params: Object) => {
  amplitude.track('Renewal', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}