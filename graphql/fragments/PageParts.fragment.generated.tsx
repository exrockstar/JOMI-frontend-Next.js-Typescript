import * as Types from '../types';

import { gql } from '@apollo/client';
export type PagePartsFragment = { __typename?: 'Page', _id: string, created: any, updated: any, title: string, status: Types.PageStatus, slug: string, content?: string | null, scripts?: Array<string> | null, meta_desc?: string | null, sidebar?: string | null, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null, last?: string | null } } | null };

export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  _id
  created
  updated
  author {
    name {
      first
      last
    }
  }
  title
  status
  slug
  content
  scripts
  meta_desc
  sidebar
}
    `;