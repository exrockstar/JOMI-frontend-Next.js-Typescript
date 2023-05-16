import * as Types from '../types';

import { gql } from '@apollo/client';
export type ArticleListPartsFragment = { __typename?: 'Article', _id: string, title: string, status: string, publication_id?: string | null | undefined, descriptionSEO?: string | null | undefined, visibility: Types.VisibilityEnum, vid_length?: string | null | undefined, created: any, slug?: string | null | undefined, production_id?: string | null | undefined, published?: any | null | undefined, updated: any, preprint_date?: any | null | undefined, tags: Array<string>, comment_count: number, isPurchaseArticleFeatureOn?: boolean | null | undefined, isRentArticleFeatureOn?: boolean | null | undefined, authors: Array<{ __typename?: 'Author', _id: string, display_name?: string | null | undefined, role?: string | null | undefined, slug?: string | null | undefined }>, categories: Array<{ __typename?: 'Category', _id: string, short: string, displayName: string, color: string, slug: string }>, hospital?: { __typename?: 'Hospital', name: string } | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined, geometry?: { __typename?: 'Geometry', width: number, height: number } | null | undefined } | null | undefined, restrictions?: { __typename?: 'Restriction', article: Types.ArticleRestrictionEnum } | null | undefined, wistia?: { __typename?: 'Wistia', duration?: number | null | undefined } | null | undefined };

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