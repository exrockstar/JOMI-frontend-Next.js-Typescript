import * as Types from '../types';

import { gql } from '@apollo/client';
export type TriageQueuePartsFragment = { __typename?: 'TriageQueue', _id: string, created?: any | null, updated?: any | null, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null, display_name?: string | null, institution_name?: string | null, email?: string | null, countryCode?: string | null, regionName?: string | null, market?: Types.TriageMarket | null, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null, user_type?: string | null, specialty?: string | null, countryCode?: string | null, regionName?: string | null, institution_name?: string | null, subActive: boolean, matchStatus?: Types.MatchStatus | null, matchedBy?: Types.MatchedBy | null } | null, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null, response?: string | null, suggested_contact?: string | null, contactInfo?: string | null, request_email_sent?: boolean | null, pocs_email_sent?: Array<string> | null } | null, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null }> | null } | null };

export const TriageQueuePartsFragmentDoc = gql`
    fragment TriageQueueParts on TriageQueue {
  _id
  created
  updated
  type
  priority
  display_name
  institution_name
  email
  countryCode
  regionName
  market
  user {
    _id
    email
    display_name
    user_type
    specialty
    countryCode
    regionName
    institution_name
    subActive
    matchStatus
    matchedBy
  }
  additional_info {
    question
    response
    suggested_contact
    contactInfo
    request_email_sent
    pocs_email_sent
  }
  institution {
    _id
    name
    points_of_contact {
      name
      email
      role
      isMainContact
    }
  }
}
    `;