import * as Types from '../types';

import { gql } from '@apollo/client';
export type RedirectPartsFragment = { __typename?: 'Redirect', _id: string, created?: any | null, updated?: any | null, name?: string | null, from: string, to: string, type: string, track?: boolean | null, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null, stats?: Array<{ __typename?: 'RedirectStats', time: any }> | null };

export const RedirectPartsFragmentDoc = gql`
    fragment RedirectParts on Redirect {
  _id
  created
  updated
  author {
    name {
      first
      last
    }
  }
  name
  from
  to
  type
  track
  stats {
    time
  }
}
    `;