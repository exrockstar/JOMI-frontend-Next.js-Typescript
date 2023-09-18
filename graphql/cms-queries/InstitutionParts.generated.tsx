import * as Types from '../types';

import { gql } from '@apollo/client';
import { LocationPartsFragmentDoc } from './LocationParts.generated';
export type InstitutionPartsFragment = { __typename?: 'Institution', _id: string, created?: any | null | undefined, updated?: any | null | undefined, name: string, aliases: Array<string>, domains: Array<string>, urlLink?: string | null | undefined, category?: string | null | undefined, subscriber_display_name?: string | null | undefined, show_on_subscribers_page?: boolean | null | undefined, restrictMatchByName?: boolean | null | undefined, notes?: string | null | undefined, subscription: { __typename?: 'InstitutionSubscription', status?: Types.StatusType | null | undefined, last_checked?: string | null | undefined, order?: string | null | undefined }, points_of_contact?: Array<{ __typename?: 'ContactPerson', name: string, email: string, role: string, notes?: string | null | undefined, isMainContact?: boolean | null | undefined }> | null | undefined, image?: { __typename?: 'Image', filename?: string | null | undefined, geometry?: { __typename?: 'Geometry', width: number, height: number } | null | undefined } | null | undefined, locations: Array<{ __typename?: 'Location', _id: string, created?: any | null | undefined, updated?: any | null | undefined, title: string, comment?: string | null | undefined, orders: Array<{ __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type?: Types.OrderType | null | undefined, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null | undefined, notes?: string | null | undefined, customInstitutionName?: string | null | undefined }>, ip_ranges: Array<{ __typename?: 'IpRange', _id: string, created?: any | null | undefined, updated?: any | null | undefined, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null | undefined, notes?: string | null | undefined }> }>, accessSettings: { __typename?: 'AccessSettings', displayTrafficGraph: boolean } };

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