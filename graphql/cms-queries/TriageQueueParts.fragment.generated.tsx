import * as Types from '../types';

import { gql } from '@apollo/client';
export type TriageQueuePartsFragment = { __typename?: 'TriageQueue', _id: string, created?: any | null | undefined, updated?: any | null | undefined, type: Types.TriageQueueStatus, priority?: Types.TriagePriority | null | undefined, display_name?: string | null | undefined, institution_name?: string | null | undefined, email?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, market?: Types.TriageMarket | null | undefined, user?: { __typename?: 'User', _id: string, email: string, display_name?: string | null | undefined, user_type?: string | null | undefined, specialty?: string | null | undefined, countryCode?: string | null | undefined, regionName?: string | null | undefined, institution_name?: string | null | undefined, subActive: boolean, matchStatus?: Types.MatchStatus | null | undefined, matchedBy?: Types.MatchedBy | null | undefined } | null | undefined, additional_info?: { __typename?: 'AdditionalInfo', question?: string | null | undefined, response?: string | null | undefined, suggested_contact?: string | null | undefined, contactInfo?: string | null | undefined, request_email_sent?: boolean | null | undefined, pocs_email_sent?: Array<string> | null | undefined } | null | undefined, institution?: { __typename?: 'Institution', _id: string, name: string, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, isMainContact?: boolean | null | undefined }> | null | undefined } | null | undefined };

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