import * as Types from '../types';

import { gql } from '@apollo/client';
import { OrderPartsFragmentDoc } from './OrderParts.generated';
import { IpRangePartsFragmentDoc } from './IpRangeParts.generated';
export type LocationPartsFragment = { __typename?: 'Location', _id: string, created?: any | null | undefined, updated?: any | null | undefined, title: string, comment?: string | null | undefined, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type: Types.OrderType, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null | undefined }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null | undefined, updated?: any | null | undefined, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null | undefined, notes?: string | null | undefined }> };

export const LocationPartsFragmentDoc = gql`
    fragment LocationParts on Location {
  _id
  created
  updated
  title
  comment
  orders {
    ...OrderParts
  }
  ip_ranges {
    ...IpRangeParts
  }
}
    ${OrderPartsFragmentDoc}
${IpRangePartsFragmentDoc}`;