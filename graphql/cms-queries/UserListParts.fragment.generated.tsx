import * as Types from '../types';

import { gql } from '@apollo/client';
export type UserListPartsFragment = { __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, role: Types.UserRoles, user_type?: string | null | undefined, specialty?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, user_type_other?: string | null | undefined, created: any, total_time_watched?: number | null | undefined, articleCount?: number | null | undefined, subActive: boolean, loginCount?: number | null | undefined, promo_code?: string | null | undefined, isSubscribed?: boolean | null | undefined, last_visited?: any | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, institutionalEmail?: string | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, hasRequestedSubscription?: boolean | null | undefined, requestSubscriptionCount?: number | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined, middle?: string | null | undefined, nickname?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined, lastSubType?: Types.SubType | null | undefined, lastSubTypeExpiry?: any | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', id: string } | null | undefined } | null | undefined, previouslyStatedInstitutions?: Array<{ __typename?: 'PreviouslyStatedInst', name: string, date: any }> | null | undefined };

export type UserDetailFragment = { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, created: any, last_visited?: any | null | undefined, slug?: string | null | undefined, role: Types.UserRoles, phone?: string | null | undefined, institution?: string | null | undefined, institution_name?: string | null | undefined, institutionalEmail?: string | null | undefined, matchedBy?: Types.MatchedBy | null | undefined, matchStatus?: Types.MatchStatus | null | undefined, interests?: Array<string> | null | undefined, emailNeedsConfirm?: boolean | null | undefined, instEmailVerified?: boolean | null | undefined, hasManualBlock?: boolean | null | undefined, manualBlockMessage?: string | null | undefined, deleted?: boolean | null | undefined, email_preference?: Types.EmailPreference | null | undefined, signInToken?: string | null | undefined, subActive: boolean, isTrialFeatureOn?: boolean | null | undefined, trialDuration?: number | null | undefined, referer?: string | null | undefined, referrerPath?: string | null | undefined, anon_link_id?: string | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined }, image?: { __typename?: 'Image', filename?: string | null | undefined, length?: number | null | undefined, format?: string | null | undefined } | null | undefined, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined, linkedin?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined, facebook?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null | undefined } | null | undefined } | null | undefined, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined, fromInst?: string | null | undefined } | null | undefined, previouslyStatedInstitutions?: Array<{ __typename?: 'PreviouslyStatedInst', name: string, date: any }> | null | undefined };

export const UserListPartsFragmentDoc = gql`
    fragment UserListParts on User {
  _id
  name {
    first
    last
    middle
    nickname
  }
  display_name
  email
  role
  user_type
  specialty
  institution
  institution_name
  countryCode
  regionName
  user_type_other
  created
  total_time_watched
  articleCount
  subActive
  loginCount
  promo_code
  isSubscribed
  last_visited
  matchStatus
  matchedBy
  emailNeedsConfirm
  instEmailVerified
  institutionalEmail
  subscription {
    subType
    fromInst
    lastSubType
    lastSubTypeExpiry
  }
  social {
    google {
      id
    }
    linkedin {
      id
    }
    facebook {
      id
    }
  }
  referer
  referrerPath
  anon_link_id
  hasRequestedSubscription
  requestSubscriptionCount
  previouslyStatedInstitutions {
    name
    date
  }
}
    `;
export const UserDetailFragmentDoc = gql`
    fragment UserDetail on User {
  _id
  email
  display_name
  name {
    first
    last
  }
  user_type
  specialty
  created
  last_visited
  slug
  role
  phone
  institution
  institution_name
  institutionalEmail
  matchedBy
  matchStatus
  interests
  emailNeedsConfirm
  instEmailVerified
  hasManualBlock
  manualBlockMessage
  deleted
  email_preference
  signInToken
  image {
    filename
    length
    format
  }
  subActive
  social {
    google {
      email
      id
      displayName
    }
    linkedin {
      email
      id
      displayName
    }
    facebook {
      email
      id
      displayName
    }
  }
  subscription {
    subType
    fromInst
  }
  isTrialFeatureOn
  trialDuration
  referer
  referrerPath
  anon_link_id
  previouslyStatedInstitutions {
    name
    date
  }
}
    `;