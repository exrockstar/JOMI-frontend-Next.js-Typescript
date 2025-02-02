import * as Types from '../types';

import { gql } from '@apollo/client';
import { OrderByIdPartsFragmentDoc } from './OrderParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrdersByUserIdQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String']['input'];
}>;


export type OrdersByUserIdQuery = { __typename?: 'Query', ordersByUserId?: Array<{ __typename?: 'Order', _id: string, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, plan_interval?: Types.OrderInterval | null, currency?: Types.OrderCurrency | null, type?: Types.OrderType | null, created: any, updated: any, lastEditedBy?: string | null, createdBy?: string | null, status?: Types.OrderStatus | null, amount?: number | null, require_login?: Types.RequireLogin | null, renewals?: number | null, payment_status?: Types.OrderPaymentStatus | null, institution?: string | null, user_id?: string | null, location?: string | null }> | null };

export type OrderByIdQueryVariables = Types.Exact<{
  order_id: Types.Scalars['String']['input'];
}>;


export type OrderByIdQuery = { __typename?: 'Query', orderById?: { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null, status?: Types.OrderStatus | null, currency?: Types.OrderCurrency | null, renewals?: number | null, createdBy?: string | null, lastEditedBy?: string | null, created: any, updated: any, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, type?: Types.OrderType | null, plan_interval?: Types.OrderInterval | null, amount?: number | null, institution?: string | null, user_id?: string | null, promoCode?: string | null, latest_invoice?: string | null, require_login?: Types.RequireLogin | null, plan_id?: string | null, deleted?: boolean | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, articleId?: string | null, notes?: string | null, customInstitutionName?: string | null, institutionObject?: { __typename?: 'Institution', name: string, _id: string } | null } | null };

export type UpdateOrderByUserMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  input: Types.UpdateOrderInput;
}>;


export type UpdateOrderByUserMutation = { __typename?: 'Mutation', updateOrderCms?: { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null, status?: Types.OrderStatus | null, currency?: Types.OrderCurrency | null, renewals?: number | null, createdBy?: string | null, lastEditedBy?: string | null, created: any, updated: any, start?: any | null, end?: any | null, isCanceled?: boolean | null, description?: string | null, type?: Types.OrderType | null, plan_interval?: Types.OrderInterval | null, amount?: number | null, institution?: string | null, user_id?: string | null, promoCode?: string | null, latest_invoice?: string | null, require_login?: Types.RequireLogin | null, plan_id?: string | null, deleted?: boolean | null, restricted_user_types: Array<string>, restricted_specialties: Array<string>, articleId?: string | null, notes?: string | null, customInstitutionName?: string | null, institutionObject?: { __typename?: 'Institution', name: string, _id: string } | null } | null };

export type OrderListQueryVariables = Types.Exact<{
  input: Types.OrderListInput;
}>;


export type OrderListQuery = { __typename?: 'Query', output: { __typename?: 'OrderListOutput', count: number, dbQueryString: string, orders: Array<{ __typename?: 'Order', _id: string, institution?: string | null, require_login?: Types.RequireLogin | null, location?: string | null, start?: any | null, end?: any | null, created: any, plan_id?: string | null, plan_interval?: Types.OrderInterval | null, user_id?: string | null, db_user_id?: string | null, description?: string | null, promoCode?: string | null, payment_status?: Types.OrderPaymentStatus | null, status?: Types.OrderStatus | null, currency?: Types.OrderCurrency | null, latest_invoice?: string | null, lastEditedBy?: string | null, createdBy?: string | null, renewals?: number | null, amount?: number | null, type?: Types.OrderType | null, notes?: string | null, customInstitutionName?: string | null, user?: { __typename?: 'User', _id: string, email: string, user_type?: string | null, specialty?: string | null, display_name?: string | null, countryCode?: string | null } | null, institutionObject?: { __typename?: 'Institution', name: string, _id: string } | null }> } };


export const OrdersByUserIdDocument = gql`
    query OrdersByUserId($user_id: String!) {
  ordersByUserId(user_id: $user_id) {
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
    renewals
    status
    payment_status
    institution
    user_id
    location
  }
}
    `;

/**
 * __useOrdersByUserIdQuery__
 *
 * To run a query within a React component, call `useOrdersByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersByUserIdQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useOrdersByUserIdQuery(baseOptions: Apollo.QueryHookOptions<OrdersByUserIdQuery, OrdersByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersByUserIdQuery, OrdersByUserIdQueryVariables>(OrdersByUserIdDocument, options);
      }
export function useOrdersByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersByUserIdQuery, OrdersByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersByUserIdQuery, OrdersByUserIdQueryVariables>(OrdersByUserIdDocument, options);
        }
export type OrdersByUserIdQueryHookResult = ReturnType<typeof useOrdersByUserIdQuery>;
export type OrdersByUserIdLazyQueryHookResult = ReturnType<typeof useOrdersByUserIdLazyQuery>;
export type OrdersByUserIdQueryResult = Apollo.QueryResult<OrdersByUserIdQuery, OrdersByUserIdQueryVariables>;
export const OrderByIdDocument = gql`
    query OrderById($order_id: String!) {
  orderById(id: $order_id) {
    ...OrderByIdParts
  }
}
    ${OrderByIdPartsFragmentDoc}`;

/**
 * __useOrderByIdQuery__
 *
 * To run a query within a React component, call `useOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderByIdQuery({
 *   variables: {
 *      order_id: // value for 'order_id'
 *   },
 * });
 */
export function useOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<OrderByIdQuery, OrderByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderByIdQuery, OrderByIdQueryVariables>(OrderByIdDocument, options);
      }
export function useOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderByIdQuery, OrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderByIdQuery, OrderByIdQueryVariables>(OrderByIdDocument, options);
        }
export type OrderByIdQueryHookResult = ReturnType<typeof useOrderByIdQuery>;
export type OrderByIdLazyQueryHookResult = ReturnType<typeof useOrderByIdLazyQuery>;
export type OrderByIdQueryResult = Apollo.QueryResult<OrderByIdQuery, OrderByIdQueryVariables>;
export const UpdateOrderByUserDocument = gql`
    mutation UpdateOrderByUser($id: String!, $input: UpdateOrderInput!) {
  updateOrderCms(id: $id, input: $input) {
    ...OrderByIdParts
  }
}
    ${OrderByIdPartsFragmentDoc}`;
export type UpdateOrderByUserMutationFn = Apollo.MutationFunction<UpdateOrderByUserMutation, UpdateOrderByUserMutationVariables>;

/**
 * __useUpdateOrderByUserMutation__
 *
 * To run a mutation, you first call `useUpdateOrderByUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderByUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderByUserMutation, { data, loading, error }] = useUpdateOrderByUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderByUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderByUserMutation, UpdateOrderByUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderByUserMutation, UpdateOrderByUserMutationVariables>(UpdateOrderByUserDocument, options);
      }
export type UpdateOrderByUserMutationHookResult = ReturnType<typeof useUpdateOrderByUserMutation>;
export type UpdateOrderByUserMutationResult = Apollo.MutationResult<UpdateOrderByUserMutation>;
export type UpdateOrderByUserMutationOptions = Apollo.BaseMutationOptions<UpdateOrderByUserMutation, UpdateOrderByUserMutationVariables>;
export const OrderListDocument = gql`
    query OrderList($input: OrderListInput!) {
  output: getAllOrders(input: $input) {
    orders {
      _id
      institution
      require_login
      location
      start
      end
      created
      require_login
      plan_id
      plan_interval
      user_id
      db_user_id
      description
      promoCode
      payment_status
      status
      currency
      latest_invoice
      lastEditedBy
      createdBy
      renewals
      amount
      user {
        _id
        email
        user_type
        specialty
        display_name
        countryCode
      }
      institutionObject {
        name
        _id
      }
      type
      notes
      customInstitutionName
    }
    count
    dbQueryString
  }
}
    `;

/**
 * __useOrderListQuery__
 *
 * To run a query within a React component, call `useOrderListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderListQuery(baseOptions: Apollo.QueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
      }
export function useOrderListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderListQuery, OrderListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderListQuery, OrderListQueryVariables>(OrderListDocument, options);
        }
export type OrderListQueryHookResult = ReturnType<typeof useOrderListQuery>;
export type OrderListLazyQueryHookResult = ReturnType<typeof useOrderListLazyQuery>;
export type OrderListQueryResult = Apollo.QueryResult<OrderListQuery, OrderListQueryVariables>;