import * as Types from '../types';

import { gql } from '@apollo/client';
export type OrderPartsFragment = { __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null, notes?: string | null, customInstitutionName?: string | null };

export type OrderByIdPartsFragment = { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null, status?: Types.OrderStatus | null, currency?: Types.OrderCurrency | null, renewals?: number | null, createdBy?: string | null, lastEditedBy?: string | null, created: any, updated: any, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, type?: Types.OrderType | null, plan_interval?: Types.OrderInterval | null, amount?: number | null, institution?: string | null, user_id?: string | null, promoCode?: string | null, latest_invoice?: string | null, require_login?: Types.RequireLogin | null, plan_id?: string | null, deleted?: boolean | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, articleId?: string | null, notes?: string | null, customInstitutionName?: string | null, institutionObject?: { __typename?: 'Institution', name: string, _id: string } | null };

export const OrderPartsFragmentDoc = gql`
    fragment OrderParts on Order {
  _id
  start
  end
  isCanceled
  description
  plan_interval
  currency
  type
  created
  updated
  lastEditedBy
  createdBy
  status
  amount
  require_login
  restricted_user_types
  restricted_specialties
  deleted
  notes
  customInstitutionName
}
    `;
export const OrderByIdPartsFragmentDoc = gql`
    fragment OrderByIdParts on Order {
  _id
  payment_status
  status
  currency
  renewals
  createdBy
  lastEditedBy
  created
  updated
  start
  end
  isCanceled
  description
  type
  plan_interval
  amount
  institution
  user_id
  promoCode
  renewals
  latest_invoice
  require_login
  isCanceled
  plan_id
  deleted
  restricted_user_types
  restricted_specialties
  articleId
  require_login
  notes
  institutionObject {
    name
    _id
  }
  customInstitutionName
}
    `;