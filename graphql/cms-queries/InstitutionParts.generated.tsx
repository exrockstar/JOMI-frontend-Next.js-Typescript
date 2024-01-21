import * as Types from '../types';

import { gql } from '@apollo/client';
import { LocationPartsFragmentDoc } from './LocationParts.generated';
export type InstitutionPartsFragment = { __typename?: 'Institution', _id: string, created?: any | null, updated?: any | null, name: string, aliases: Array<string>, domains: Array<string>, urlLink?: string | null, category?: string | null, subscriber_display_name?: string | null, show_on_subscribers_page?: boolean | null, restrictMatchByName?: boolean | null, notes?: string | null, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null, last_checked?: string | null, order?: string | null }, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, notes?: string | null, isMainContact?: boolean | null }> | null, image?: { __typename?: 'Image', filename?: string | null, geometry?: { __typename?: 'Geometry', width: number, height: number } | null } | null, locations: Array<{ __typename?: 'Location', _id: string, created?: any | null, updated?: any | null, title: string, comment?: string | null, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null }> }>, accessSettings: { __typename?: 'AccessSettings', displayTrafficGraph: boolean } };

export const InstitutionPartsFragmentDoc = gql`
    fragment InstitutionParts on Institution {
  _id
  created
  updated
  name
  aliases
  subscription {
    status
    last_checked
    order
  }
  domains
  urlLink
  category
  subscriber_display_name
  show_on_subscribers_page
  restrictMatchByName
  points_of_contact {
    name
    email
    role
    notes
    isMainContact
  }
  image {
    filename
    geometry {
      width
      height
    }
  }
  locations {
    ...LocationParts
  }
  accessSettings {
    displayTrafficGraph
  }
  notes
}
    ${LocationPartsFragmentDoc}`;