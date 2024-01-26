import * as Types from '../types';

import { gql } from '@apollo/client';
export type ArticleListPartsFragment = { __typename?: 'Article', _id: string, title: string, status: string, publication_id?: string | null, descriptionSEO?: string | null, visibility: Types.VisibilityEnum, vid_length?: string | null, created: any, slug?: string | null, production_id?: string | null, published?: any | null, updated: any, preprint_date?: any | null, tags: Array<string>, comment_count: number, isPurchaseArticleFeatureOn?: boolean | null, isRentArticleFeatureOn?: boolean | null, authors: Array<{ __typename?: 'Author', _id: string, display_name?: string | null, role?: string | null, slug?: string | null }>, categories: Array<{ __typename?: 'Category', _id: string, short: string, displayName: string, color: string, slug: string }>, hospital?: { __typename?: 'Hospital', name: string } | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, restrictions?: { __typename?: 'Restriction', article: Types.ArticleRestrictionEnum } | null, wistia?: { __typename?: 'Wistia', duration?: number | null } | null };

export const ArticleListPartsFragmentDoc = gql`
    fragment ArticleListParts on Article {
  _id
  title
  status
  publication_id
  descriptionSEO
  authors {
    _id
    display_name
    role
    slug
  }
  visibility
  vid_length
  categories {
    _id
    short
    displayName
    color
    slug
  }
  created
  hospital {
    name
  }
  slug
  image {
    geometry {
      width
      height
    }
    filename
  }
  production_id
  published
  updated
  preprint_date
  restrictions {
    article
  }
  wistia {
    duration
  }
  tags
  comment_count
  isPurchaseArticleFeatureOn
  isRentArticleFeatureOn
}
    `;