import * as Types from '../types';

import { gql } from '@apollo/client';
export type AnnouncementPartsFragment = { __typename?: 'Announcement', _id: any, lastEditedBy?: string | null, isPermanent?: boolean | null, limit?: number | null, cache_id: string, enabled: boolean, createdAt: any, updatedAt: any, type: Types.AnnouncementType, backgroundColor?: string | null, title?: string | null, content?: string | null, author?: { __typename?: 'User', _id: string, display_name?: string | null } | null, filters?: Array<{ __typename?: 'FilterExpression', id: string, parentId?: string | null, columnName?: string | null, operator: Types.Operators, value?: any | null, level: number }> | null };

export type AnnouncementViewsFragment = { __typename?: 'Announcement', views: number, unique_views?: number | null, user_views?: { __typename?: 'UserViews', total: number, by_country: Array<{ __typename?: 'ViewType', key: string, views: number }>, by_institution: Array<{ __typename?: 'ViewType', key: string, views: number }>, by_user_type: Array<{ __typename?: 'ViewType', key: string, views: number }> } | null };

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