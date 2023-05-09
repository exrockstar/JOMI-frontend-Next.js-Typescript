import * as Types from '../types';

import { gql } from '@apollo/client';
export type OrderPartsFragment = { __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type: Types.OrderType, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null | undefined };

export type OrderByIdPartsFragment = { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null | undefined, status?: Types.OrderStatus | null | undefined, currency?: Types.OrderCurrency | null | undefined, renewals?: number | null | undefined, createdBy?: string | null | undefined, lastEditedBy?: string | null | undefined, created: any, updated: any, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, type: Types.OrderType, plan_interval?: Types.OrderInterval | null | undefined, amount?: number | null | undefined, institution?: string | null | undefined, user_id?: string | null | undefined, promoCode?: string | null | undefined, latest_invoice?: string | null | undefined, require_login?: Types.RequireLogin | null | undefined, plan_id?: string | null | undefined, deleted?: boolean | null | undefined };

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
}
    `;