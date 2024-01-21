import * as Types from '../types';

import { gql } from '@apollo/client';
import { OrderPartsFragmentDoc } from './OrderParts.generated';
import { IpRangePartsFragmentDoc } from './IpRangeParts.generated';
export type LocationPartsFragment = { __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> };

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