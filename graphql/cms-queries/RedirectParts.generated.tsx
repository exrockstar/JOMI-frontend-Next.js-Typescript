import * as Types from '../types';

import { gql } from '@apollo/client';
export type RedirectPartsFragment = { __typename?: 'Redirect', _id: string, created?: any | null | undefined, updated?: any | null | undefined, name?: string | null | undefined, from: string, to: string, type: string, track?: boolean | null | undefined, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } } | null | undefined, stats?: Array<{ __typename?: 'RedirectStats', time: any }> | null | undefined };

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