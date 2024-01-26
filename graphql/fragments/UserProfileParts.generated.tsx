import * as Types from '../types';

import { gql } from '@apollo/client';
export type UserProfilePartsFragment = { __typename?: 'User', _id: string, display_name?: string | null, email: string, institution?: string | null, institution_name?: string | null, institutionalEmail?: string | null, role: Types.UserRoles, specialty?: string | null, subActive: boolean, created: any, user_type?: string | null, name: { __typename?: 'Name', first?: string | null, last?: string | null }, subscription?: { __typename?: 'SubscriptionType', subType?: Types.SubType | null } | null, accessType: { __typename?: 'AccessType', accessType?: Types.AccessTypeEnum | null, institution_name?: string | null, shouldRequestInstVerification?: string | null, viaTemporaryIp?: boolean | null, expiry?: any | null, subscriptionExpiresAt?: any | null, requireLogin?: boolean | null, institution_id?: string | null, customInstitutionName?: string | null } };

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