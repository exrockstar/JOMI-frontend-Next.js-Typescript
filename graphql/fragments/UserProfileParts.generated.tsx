import * as Types from '../types';

import { gql } from '@apollo/client';
export type UserProfilePartsFragment = { __typename?: 'User', _id: string, display_name?: string | null | undefined, email: string, institution?: string | null | undefined, institution_name?: string | null | undefined, institutionalEmail?: string | null | undefined, role: Types.UserRoles, specialty?: string | null | undefined, subActive: boolean, created: any, user_type?: string | null | undefined, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null | undefined } | null | undefined, accessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null | undefined, institution_name?: string | null | undefined, shouldRequestInstVerification?: string | null | undefined, viaTemporaryIp?: boolean | null | undefined, expiry?: any | null | undefined, subscriptionExpiresAt?: any | null | undefined, requireLogin?: boolean | null | undefined, institution_id?: string | null | undefined, customInstitutionName?: string | null | undefined } };

export const UserProfilePartsFragmentDoc = gql`
    fragment UserProfileParts on User {
  _id
  name {
    first
    last
  }
  display_name
  email
  institution
  institution_name
  institutionalEmail
  role
  specialty
  subActive
  created
  user_type
  subscription {
    subType
  }
  accessType {
    accessType
    institution_name
    shouldRequestInstVerification
    viaTemporaryIp
    expiry
    subscriptionExpiresAt
    requireLogin
    institution_id
    customInstitutionName
  }
}
    `;