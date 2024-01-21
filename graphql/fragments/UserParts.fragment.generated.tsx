import * as Types from '../types';

import { gql } from '@apollo/client';
export type UserPartsFragment = { __typename?: 'User', _id: string, subActive: boolean, email: string, role: Types.UserRoles, isPasswordSet: boolean, name: { __typename?: 'Name', first?: string | null, last?: string | null } };

export const UserPartsFragmentDoc = gql`
    fragment UserParts on User {
  _id
  name {
    first
    last
  }
  subActive
  email
  role
  isPasswordSet
}
    `;