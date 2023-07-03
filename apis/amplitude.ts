import * as amplitude from '@amplitude/analytics-browser';
import { EnrichmentPlugin } from '@amplitude/analytics-types';

const isClient = typeof window !== 'undefined'

/**
 * Purpose: to set all events as a 'test' event when testing in localhost
 * @returns EnrichmentPlugin
 */
const testingEvents = (): EnrichmentPlugin => {
  console.log("TESTING EVENTS FUNC!")
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
  if(process.env.NODE_ENV === 'development') {
    amplitude.init(process.env.AMPLITUDE_API_KEY, {
      logLevel: amplitude.Types.LogLevel.Debug,
    });
    amplitude.add(testingEvents());
  } else {
    amplitude.init(process.env.AMPLITUDE_API_KEY);
  }
}

/**
 * Purpose: Track an article view statistic
 */
export const amplitudeTrackArticleView = (params: Object) => {
  amplitude.track('Article View', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user initiates a checkout for a purchaseable product 
 * (PPA, Subscription)
 */
export const amplitudeTrackInitiateCheckout = (params: Object) => {
  amplitude.track('Initiate Checkout', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user completes a purchase
 * (PPA, Subscription)
 */
export const amplitudeTrackPurchase = (params: Object) => {
  amplitude.track('Purchase', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user performs a search
 */
export const amplitudeTrackSearch = (params: Object) => {
  amplitude.track('Search', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user signs up for a trial
 */
export const amplitudeTrackTrial = (params: Object) => {
  amplitude.track('Search', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user submits feedback
 */
export const amplitudeTrackFeedback = (params: Object) => {
  amplitude.track('Feedback', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}

/**
 * Purpose: Track when a user submits feedback
 */
export const amplitudeTrackRequestSubscription = (params: Object) => {
  amplitude.track('Request Subscription', {
    ...params,
    anon_link_id: isClient ? localStorage.getItem('anon_link_id') ?? '' : ''
  })
}