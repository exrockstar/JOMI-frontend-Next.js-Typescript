import * as Types from '../types';

import { gql } from '@apollo/client';
import { OrderByIdPartsFragmentDoc } from './OrderParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type OrdersByUserIdQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;


export type OrdersByUserIdQuery = { __typename?: 'Query', ordersByUserId?: Array<{ __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type?: Types.OrderType | null | undefined, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, renewals?: number | null | undefined, payment_status?: Types.OrderPaymentStatus | null | undefined, institution?: string | null | undefined, user_id?: string | null | undefined, location?: string | null | undefined }> | null | undefined };

export type OrderByIdQueryVariables = Types.Exact<{
  order_id: Types.Scalars['String'];
}>;


export type OrderByIdQuery = { __typename?: 'Query', orderById?: { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null | undefined, status?: Types.OrderStatus | null | undefined, currency?: Types.OrderCurrency | null | undefined, renewals?: number | null | undefined, createdBy?: string | null | undefined, lastEditedBy?: string | null | undefined, created: any, updated: any, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, type?: Types.OrderType | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, amount?: number | null | undefined, institution?: string | null | undefined, user_id?: string | null | undefined, promoCode?: string | null | undefined, latest_invoice?: string | null | undefined, require_login?: Types.RequireLogin | null | undefined, plan_id?: string | null | undefined, deleted?: boolean | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, articleId?: string | null | undefined, notes?: string | null | undefined, customInstitutionName?: string | null | undefined, institutionObject?: { __typename?: 'Institution', name: string, _id: string } | null | undefined } | null | undefined };

export type UpdateOrderByUserMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  input: Types.UpdateOrderInput;
}>;


export type UpdateOrderByUserMutation = { __typename?: 'Mutation', updateOrderCms?: { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null | undefined, status?: Types.OrderStatus | null | undefined, currency?: Types.OrderCurrency | null | undefined, renewals?: number | null | undefined, createdBy?: string | null | undefined, lastEditedBy?: string | null | undefined, created: any, updated: any, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, type?: Types.OrderType | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, amount?: number | null | undefined, institution?: string | null | undefined, user_id?: string | null | undefined, promoCode?: string | null | undefined, latest_invoice?: string | null | undefined, require_login?: Types.RequireLogin | null | undefined, plan_id?: string | null | undefined, deleted?: boolean | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, articleId?: string | null | undefined, notes?: string | null | undefined, customInstitutionName?: string | null | undefined, institutionObject?: { __typename?: 'Institution', name: string, _id: string } | null | undefined } | null | undefined };

export type OrderListQueryVariables = Types.Exact<{
  input: Types.OrderListInput;
}>;


export type OrderListQuery = { __typename?: 'Query', output: { __typename?: 'OrderListOutput', count: number, dbQueryString: string, orders: Array<{ __typename?: 'Order', _id: string, institution?: string | null | undefined, require_login?: Types.RequireLogin | null | undefined, location?: string | null | undefined, start?: any | null | undefined, end?: any | null | undefined, created: any, plan_id?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, user_id?: string | null | undefined, db_user_id?: string | null | undefined, description?: string | null | undefined, promoCode?: string | null | undefined, payment_status?: Types.OrderPaymentStatus | null | undefined, status?: Types.OrderStatus | null | undefined, currency?: Types.OrderCurrency | null | undefined, latest_invoice?: string | null | undefined, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, renewals?: number | null | undefined, amount?: number | null | undefined, type?: Types.OrderType | null | undefined, notes?: string | null | undefined, customInstitutionName?: string | null | undefined, user?: { __typename?: 'User', _id: string, email: string, user_type?: string | null | undefined, specialty?: string | null | undefined, display_name?: string | null | undefined } | null | undefined, institutionObject?: { __typename?: 'Institution', name: string, _id: string } | null | undefined }> } };


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