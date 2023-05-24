import * as Types from '../types';

import { gql } from '@apollo/client';
export type AnnouncementPartsFragment = { __typename?: 'Announcement', _id: any, lastEditedBy?: string | null | undefined, isPermanent?: boolean | null | undefined, limit?: number | null | undefined, cache_id: string, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null | undefined, title?: string | null | undefined, content?: string | null | undefined, author?: { __typename?: 'User', _id: string, display_name?: string | null | undefined } | null | undefined, filters?: Array<{ __typename?: 'FilterExpression', id: string, parentId?: string | null | undefined, columnName?: string | null | undefined, operator: Types.Operators, value?: any | null | undefined, level: number }> | null | undefined };

export type AnnouncementViewsFragment = { __typename?: 'Announcement', views: number, unique_views?: number | null | undefined, user_views?: { __typename?: 'UserViews', total: number, by_country: Array<{ __typename?: 'ViewType', key: string, views: number }>, by_institution: Array<{ __typename?: 'ViewType', key: string, views: number }>, by_user_type: Array<{ __typename?: 'ViewType', key: string, views: number }> } | null | undefined };

export const AnnouncementPartsFragmentDoc = gql`
    fragment AnnouncementParts on Announcement {
  _id
  lastEditedBy
  isPermanent
  limit
  cache_id
  enabled
  createdAt
  updatedAt
  type
  backgroundColor
  author {
    _id
    display_name
  }
  lastEditedBy
  title
  content
  filters {
    id
    parentId
    columnName
    operator
    value
    level
  }
}
    `;
export const AnnouncementViewsFragmentDoc = gql`
    fragment AnnouncementViews on Announcement {
  views
  unique_views
  user_views {
    total
    by_country {
      key
      views
    }
    by_institution {
      key
      views
    }
    by_user_type {
      key
      views
    }
  }
}
    `;