import * as Types from '../types';

import { gql } from '@apollo/client';
export type UserListPartsFragment = { __typename?: 'User', _id: string, display_name?: string | null, email: string, role: Types.UserRoles, user_type?: string | null, specialty?: string | null, institution?: string | null, institution_name?: string | null, matched_institution_name?: string | null, countryCode?: string | null, regionName?: string | null, user_type_other?: string | null, created: any, total_time_watched?: number | null, articleCount?: number | null, subActive: boolean, loginCount?: number | null, promo_code?: string | null, isSubscribed?: boolean | null, last_visited?: any | null, institutionalEmail?: string | null, referer?: string | null, referrerPath?: string | null, anon_link_id?: string | null, hasRequestedSubscription?: boolean | null, requestSubscriptionCount?: number | null, emailVerifiedAt?: any | null, instEmailVerifiedAt?: any | null, name: { __typename?: 'Name', first?: string | null, last?: string | null, middle?: string | null, nickname?: string | null }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null, fromInst?: string | null, lastSubType?: Types.SubType | null, lastSubTypeExpiry?: any | null } | null, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', id: string } | null, linkedin?: { __typename?: 'SocialAuthDetails', id: string } | null, facebook?: { __typename?: 'SocialAuthDetails', id: string } | null } | null, previouslyStatedInstitutions?: Array<{ __typename?: 'PreviouslyStatedInst', name?: string | null, date: any }> | null, accessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null, matchStatus?: Types.MatchStatus | null, matchedBy?: Types.MatchedBy | null, institution_id?: string | null, institution_name?: string | null } };

export type UserDetailFragment = { __typename?: 'User', _id: string, email: string, display_name?: string | null, user_type?: string | null, specialty?: string | null, created: any, last_visited?: any | null, slug?: string | null, role: Types.UserRoles, phone?: string | null, institution?: string | null, institution_name?: string | null, matched_institution_name?: string | null, institutionalEmail?: string | null, matchedBy?: Types.MatchedBy | null, matchStatus?: Types.MatchStatus | null, interests?: Array<string> | null, hasManualBlock?: boolean | null, manualBlockMessage?: string | null, deleted?: boolean | null, email_preference?: Types.EmailPreference | null, signInToken?: string | null, subActive: boolean, trialsAllowed: boolean, trialAccessAt?: any | null, referer?: string | null, referrerPath?: string | null, anon_link_id?: string | null, emailVerifiedAt?: any | null, instEmailVerifiedAt?: any | null, source_ip?: string | null, name: { __typename?: 'Name', first?: string | null, last?: string | null }, image?: { __typename?: 'Image', filename?: string | null, length?: number | null, format?: string | null } | null, social?: { __typename?: 'Social', google?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null } | null, linkedin?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null } | null, facebook?: { __typename?: 'SocialAuthDetails', email: string, id: string, displayName?: string | null } | null } | null, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null, fromInst?: string | null } | null, previouslyStatedInstitutions?: Array<{ __typename?: 'PreviouslyStatedInst', name?: string | null, date: any }> | null, accessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null, matchedBy?: Types.MatchedBy | null, matchStatus?: Types.MatchStatus | null, institution_id?: string | null, institution_name?: string | null }, offsiteAccesses: Array<{ __typename?: 'TemporaryAccess', _id: string, source_ip: string, expiresAt: any }> };

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
  matched_institution_name
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
  accessType {
    accessType
    matchStatus
    matchedBy
    institution_id
    institution_name
  }
  emailVerifiedAt
  instEmailVerifiedAt
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
  matched_institution_name
  institutionalEmail
  matchedBy
  matchStatus
  interests
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
  trialsAllowed
  trialAccessAt
  referer
  referrerPath
  anon_link_id
  previouslyStatedInstitutions {
    name
    date
  }
  emailVerifiedAt
  instEmailVerifiedAt
  accessType {
    accessType
    matchedBy
    matchStatus
    institution_id
    institution_name
  }
  source_ip
  offsiteAccesses {
    _id
    source_ip
    expiresAt
  }
}
    `;