import * as Types from '../types';

import { gql } from '@apollo/client';
import { OrderByIdPartsFragmentDoc } from './OrderParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type OrdersByUserIdQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;


export type OrdersByUserIdQuery = { __typename?: 'Query', ordersByUserId?: Array<{ __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type: Types.OrderType, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, renewals?: number | null | undefined, payment_status?: Types.OrderPaymentStatus | null | undefined }> | null | undefined };

export type OrderByIdQueryVariables = Types.Exact<{
  order_id: Types.Scalars['String'];
}>;


export type OrderByIdQuery = { __typename?: 'Query', orderById?: { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null | undefined, status?: Types.OrderStatus | null | undefined, currency?: Types.OrderCurrency | null | undefined, renewals?: number | null | undefined, createdBy?: string | null | undefined, lastEditedBy?: string | null | undefined, created: any, updated: any, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, type: Types.OrderType, plan_interval?: Types.OrderInterval | null | undefined, amount?: number | null | undefined, institution?: string | null | undefined, user_id?: string | null | undefined, promoCode?: string | null | undefined, latest_invoice?: string | null | undefined, require_login?: Types.RequireLogin | null | undefined, plan_id?: string | null | undefined, deleted?: boolean | null | undefined } | null | undefined };

export type UpdateOrderByUserMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  input: Types.OrderInputForUser;
}>;


export type UpdateOrderByUserMutation = { __typename?: 'Mutation', updateOrderForUser?: { __typename?: 'Order', _id: string, payment_status?: Types.OrderPaymentStatus | null | undefined, status?: Types.OrderStatus | null | undefined, currency?: Types.OrderCurrency | null | undefined, renewals?: number | null | undefined, createdBy?: string | null | undefined, lastEditedBy?: string | null | undefined, created: any, updated: any, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, type: Types.OrderType, plan_interval?: Types.OrderInterval | null | undefined, amount?: number | null | undefined, institution?: string | null | undefined, user_id?: string | null | undefined, promoCode?: string | null | undefined, latest_invoice?: string | null | undefined, require_login?: Types.RequireLogin | null | undefined, plan_id?: string | null | undefined, deleted?: boolean | null | undefined } | null | undefined };


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
    mutation UpdateOrderByUser($id: String!, $input: OrderInputForUser!) {
  updateOrderForUser(id: $id, input: $input) {
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