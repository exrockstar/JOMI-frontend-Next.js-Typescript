import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddOrUpdateOrderMutationVariables = Types.Exact<{
  input: Types.OrderInput;
}>;


export type AddOrUpdateOrderMutation = { __typename?: 'Mutation', addOrUpdateOrder: boolean };

export type CancelOrderMutationVariables = Types.Exact<{
  subscription_id: Types.Scalars['String']['input'];
}>;


export type CancelOrderMutation = { __typename?: 'Mutation', cancelOrder: boolean };

export type UnsubscribeOrderMutationVariables = Types.Exact<{
  order_id: Types.Scalars['String']['input'];
}>;


export type UnsubscribeOrderMutation = { __typename?: 'Mutation', unsubscribeOrder?: { __typename?: 'Order', _id: string, isCanceled?: boolean | null, start?: any | null, end?: any | null, description?: string | null, type?: Types.OrderType | null } | null };

export type ResubscribeOrderMutationVariables = Types.Exact<{
  order_id: Types.Scalars['String']['input'];
}>;


export type ResubscribeOrderMutation = { __typename?: 'Mutation', resubscribeOrder?: { __typename?: 'Order', _id: string, isCanceled?: boolean | null, start?: any | null, end?: any | null, description?: string | null, type?: Types.OrderType | null } | null };

export type PreviewUpgradeSubscriptionQueryVariables = Types.Exact<{
  promocode?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type PreviewUpgradeSubscriptionQuery = { __typename?: 'Query', upgradeSubscriptionPreview?: { __typename?: 'UpgradeSubscriptionPreview', amount: number, description: string, cardLast4: string, type: string, promocodeApplied: boolean } | null };

export type UpgradeSubscriptionMutationVariables = Types.Exact<{
  promocode?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpgradeSubscriptionMutation = { __typename?: 'Mutation', upgradeSubscription?: boolean | null };

export type HandlePaymentFailedMutationVariables = Types.Exact<{
  order_id: Types.Scalars['String']['input'];
  error_code: Types.Scalars['String']['input'];
}>;


export type HandlePaymentFailedMutation = { __typename?: 'Mutation', handleFailedOrderPayment: boolean };


export const AddOrUpdateOrderDocument = gql`
    mutation AddOrUpdateOrder($input: OrderInput!) {
  addOrUpdateOrder(input: $input)
}
    `;
export type AddOrUpdateOrderMutationFn = Apollo.MutationFunction<AddOrUpdateOrderMutation, AddOrUpdateOrderMutationVariables>;

/**
 * __useAddOrUpdateOrderMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateOrderMutation, { data, loading, error }] = useAddOrUpdateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOrUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateOrderMutation, AddOrUpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateOrderMutation, AddOrUpdateOrderMutationVariables>(AddOrUpdateOrderDocument, options);
      }
export type AddOrUpdateOrderMutationHookResult = ReturnType<typeof useAddOrUpdateOrderMutation>;
export type AddOrUpdateOrderMutationResult = Apollo.MutationResult<AddOrUpdateOrderMutation>;
export type AddOrUpdateOrderMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateOrderMutation, AddOrUpdateOrderMutationVariables>;
export const CancelOrderDocument = gql`
    mutation CancelOrder($subscription_id: String!) {
  cancelOrder(subscription_id: $subscription_id)
}
    `;
export type CancelOrderMutationFn = Apollo.MutationFunction<CancelOrderMutation, CancelOrderMutationVariables>;

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      subscription_id: // value for 'subscription_id'
 *   },
 * });
 */
export function useCancelOrderMutation(baseOptions?: Apollo.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(CancelOrderDocument, options);
      }
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<CancelOrderMutation, CancelOrderMutationVariables>;
export const UnsubscribeOrderDocument = gql`
    mutation UnsubscribeOrder($order_id: String!) {
  unsubscribeOrder(order_id: $order_id) {
    _id
    isCanceled
    start
    end
    description
    type
  }
}
    `;
export type UnsubscribeOrderMutationFn = Apollo.MutationFunction<UnsubscribeOrderMutation, UnsubscribeOrderMutationVariables>;

/**
 * __useUnsubscribeOrderMutation__
 *
 * To run a mutation, you first call `useUnsubscribeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeOrderMutation, { data, loading, error }] = useUnsubscribeOrderMutation({
 *   variables: {
 *      order_id: // value for 'order_id'
 *   },
 * });
 */
export function useUnsubscribeOrderMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeOrderMutation, UnsubscribeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeOrderMutation, UnsubscribeOrderMutationVariables>(UnsubscribeOrderDocument, options);
      }
export type UnsubscribeOrderMutationHookResult = ReturnType<typeof useUnsubscribeOrderMutation>;
export type UnsubscribeOrderMutationResult = Apollo.MutationResult<UnsubscribeOrderMutation>;
export type UnsubscribeOrderMutationOptions = Apollo.BaseMutationOptions<UnsubscribeOrderMutation, UnsubscribeOrderMutationVariables>;
export const ResubscribeOrderDocument = gql`
    mutation ResubscribeOrder($order_id: String!) {
  resubscribeOrder(order_id: $order_id) {
    _id
    isCanceled
    start
    end
    description
    type
  }
}
    `;
export type ResubscribeOrderMutationFn = Apollo.MutationFunction<ResubscribeOrderMutation, ResubscribeOrderMutationVariables>;

/**
 * __useResubscribeOrderMutation__
 *
 * To run a mutation, you first call `useResubscribeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResubscribeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resubscribeOrderMutation, { data, loading, error }] = useResubscribeOrderMutation({
 *   variables: {
 *      order_id: // value for 'order_id'
 *   },
 * });
 */
export function useResubscribeOrderMutation(baseOptions?: Apollo.MutationHookOptions<ResubscribeOrderMutation, ResubscribeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResubscribeOrderMutation, ResubscribeOrderMutationVariables>(ResubscribeOrderDocument, options);
      }
export type ResubscribeOrderMutationHookResult = ReturnType<typeof useResubscribeOrderMutation>;
export type ResubscribeOrderMutationResult = Apollo.MutationResult<ResubscribeOrderMutation>;
export type ResubscribeOrderMutationOptions = Apollo.BaseMutationOptions<ResubscribeOrderMutation, ResubscribeOrderMutationVariables>;
export const PreviewUpgradeSubscriptionDocument = gql`
    query PreviewUpgradeSubscription($promocode: String) {
  upgradeSubscriptionPreview(promocode: $promocode) {
    amount
    description
    cardLast4
    type
    promocodeApplied
  }
}
    `;

/**
 * __usePreviewUpgradeSubscriptionQuery__
 *
 * To run a query within a React component, call `usePreviewUpgradeSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewUpgradeSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewUpgradeSubscriptionQuery({
 *   variables: {
 *      promocode: // value for 'promocode'
 *   },
 * });
 */
export function usePreviewUpgradeSubscriptionQuery(baseOptions?: Apollo.QueryHookOptions<PreviewUpgradeSubscriptionQuery, PreviewUpgradeSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviewUpgradeSubscriptionQuery, PreviewUpgradeSubscriptionQueryVariables>(PreviewUpgradeSubscriptionDocument, options);
      }
export function usePreviewUpgradeSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewUpgradeSubscriptionQuery, PreviewUpgradeSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviewUpgradeSubscriptionQuery, PreviewUpgradeSubscriptionQueryVariables>(PreviewUpgradeSubscriptionDocument, options);
        }
export type PreviewUpgradeSubscriptionQueryHookResult = ReturnType<typeof usePreviewUpgradeSubscriptionQuery>;
export type PreviewUpgradeSubscriptionLazyQueryHookResult = ReturnType<typeof usePreviewUpgradeSubscriptionLazyQuery>;
export type PreviewUpgradeSubscriptionQueryResult = Apollo.QueryResult<PreviewUpgradeSubscriptionQuery, PreviewUpgradeSubscriptionQueryVariables>;
export const UpgradeSubscriptionDocument = gql`
    mutation UpgradeSubscription($promocode: String) {
  upgradeSubscription(promocode: $promocode)
}
    `;
export type UpgradeSubscriptionMutationFn = Apollo.MutationFunction<UpgradeSubscriptionMutation, UpgradeSubscriptionMutationVariables>;

/**
 * __useUpgradeSubscriptionMutation__
 *
 * To run a mutation, you first call `useUpgradeSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeSubscriptionMutation, { data, loading, error }] = useUpgradeSubscriptionMutation({
 *   variables: {
 *      promocode: // value for 'promocode'
 *   },
 * });
 */
export function useUpgradeSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpgradeSubscriptionMutation, UpgradeSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgradeSubscriptionMutation, UpgradeSubscriptionMutationVariables>(UpgradeSubscriptionDocument, options);
      }
export type UpgradeSubscriptionMutationHookResult = ReturnType<typeof useUpgradeSubscriptionMutation>;
export type UpgradeSubscriptionMutationResult = Apollo.MutationResult<UpgradeSubscriptionMutation>;
export type UpgradeSubscriptionMutationOptions = Apollo.BaseMutationOptions<UpgradeSubscriptionMutation, UpgradeSubscriptionMutationVariables>;
export const HandlePaymentFailedDocument = gql`
    mutation HandlePaymentFailed($order_id: String!, $error_code: String!) {
  handleFailedOrderPayment(order_id: $order_id, error_code: $error_code)
}
    `;
export type HandlePaymentFailedMutationFn = Apollo.MutationFunction<HandlePaymentFailedMutation, HandlePaymentFailedMutationVariables>;

/**
 * __useHandlePaymentFailedMutation__
 *
 * To run a mutation, you first call `useHandlePaymentFailedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandlePaymentFailedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handlePaymentFailedMutation, { data, loading, error }] = useHandlePaymentFailedMutation({
 *   variables: {
 *      order_id: // value for 'order_id'
 *      error_code: // value for 'error_code'
 *   },
 * });
 */
export function useHandlePaymentFailedMutation(baseOptions?: Apollo.MutationHookOptions<HandlePaymentFailedMutation, HandlePaymentFailedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandlePaymentFailedMutation, HandlePaymentFailedMutationVariables>(HandlePaymentFailedDocument, options);
      }
export type HandlePaymentFailedMutationHookResult = ReturnType<typeof useHandlePaymentFailedMutation>;
export type HandlePaymentFailedMutationResult = Apollo.MutationResult<HandlePaymentFailedMutation>;
export type HandlePaymentFailedMutationOptions = Apollo.BaseMutationOptions<HandlePaymentFailedMutation, HandlePaymentFailedMutationVariables>;