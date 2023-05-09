import * as Types from '../types';

import { gql } from '@apollo/client';
export type PagePartsFragment = { __typename?: 'Page', _id: string, created: any, updated: any, title: string, status: Types.PageStatus, slug: string, content?: string | null | undefined, scripts?: Array<string> | null | undefined, meta_desc?: string | null | undefined, sidebar?: string | null | undefined, author?: { __typename?: 'User', name: { __typename?: 'Name', first?: string | null | undefined, last?: string | null | undefined } } | null | undefined };

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