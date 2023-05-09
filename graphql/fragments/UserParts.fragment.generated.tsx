import * as Types from '../types';

import { gql } from '@apollo/client';
export type UserPartsFragment = { __typename?: 'User', _id: string, emailVerified: boolean, subActive: boolean, email: string, role: Types.UserRoles, isPasswordSet: boolean, name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } };

export const UserPartsFragmentDoc = gql`
    fragment UserParts on User {
  _id
  name {
    first
    last
  }
  emailVerified
  subActive
  email
  role
  isPasswordSet
}
    `;