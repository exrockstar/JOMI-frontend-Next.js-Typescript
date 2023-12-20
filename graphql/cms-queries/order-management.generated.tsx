import * as Types from '../types';

import { gql } from '@apollo/client';
import { OrderPartsFragmentDoc } from './OrderParts.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateOrderMutationVariables = Types.Exact<{
  input: Types.OrderInputForLocation;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', order?: { __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type?: Types.OrderType | null | undefined, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null | undefined, notes?: string | null | undefined, customInstitutionName?: string | null | undefined } | null | undefined };

export type UpdateOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  input: Types.OrderInputForLocation;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', order?: { __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type?: Types.OrderType | null | undefined, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, restricted_user_types: Array<string>, restricted_specialties: Array<string>, deleted?: boolean | null | undefined, notes?: string | null | undefined, customInstitutionName?: string | null | undefined } | null | undefined };

export type DeleteOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', order?: { __typename?: 'Order', _id: string } | null | undefined };

export type CreateOrderForUserMutationVariables = Types.Exact<{
  input: Types.UpdateOrderInput;
}>;


export type CreateOrderForUserMutation = { __typename?: 'Mutation', order?: { __typename?: 'Order', _id: string, start?: any | null | undefined, end?: any | null | undefined, isCanceled?: boolean | null | undefined, description?: string | null | undefined, plan_interval?: Types.OrderInterval | null | undefined, currency?: Types.OrderCurrency | null | undefined, type?: Types.OrderType | null | undefined, created: any, updated: any, lastEditedBy?: string | null | undefined, createdBy?: string | null | undefined, status?: Types.OrderStatus | null | undefined, amount?: number | null | undefined, require_login?: Types.RequireLogin | null | undefined, renewals?: number | null | undefined, payment_status?: Types.OrderPaymentStatus | null | undefined } | null | undefined };

export type AddCrmTagsToOrderListResultsMutationVariables = Types.Exact<{
  input: Types.OrderListInput;
  tags: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type AddCrmTagsToOrderListResultsMutation = { __typename?: 'Mutation', result: boolean };

export type AddCrmTagsToOrderListResultsPreviewQueryVariables = Types.Exact<{
  input: Types.OrderListInput;
}>;


export type AddCrmTagsToOrderListResultsPreviewQuery = { __typename?: 'Query', result: number };


export const CreateOrderDocument = gql`
    mutation CreateOrder($input: OrderInputForLocation!) {
  order: createOrder(input: $input) {
    ...OrderParts
  }
}
    ${OrderPartsFragmentDoc}`;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($id: String!, $input: OrderInputForLocation!) {
  order: updateOrder(id: $id, input: $input) {
    ...OrderParts
  }
}
    ${OrderPartsFragmentDoc}`;
export type UpdateOrderMutationFn = Apollo.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = Apollo.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($id: String!) {
  order: deleteOrder(id: $id) {
    _id
  }
}
    `;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const CreateOrderForUserDocument = gql`
    mutation CreateOrderForUser($input: UpdateOrderInput!) {
  order: createOrderForUser(input: $input) {
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
export type CreateOrderForUserMutationFn = Apollo.MutationFunction<CreateOrderForUserMutation, CreateOrderForUserMutationVariables>;

/**
 * __useCreateOrderForUserMutation__
 *
 * To run a mutation, you first call `useCreateOrderForUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderForUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderForUserMutation, { data, loading, error }] = useCreateOrderForUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderForUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderForUserMutation, CreateOrderForUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderForUserMutation, CreateOrderForUserMutationVariables>(CreateOrderForUserDocument, options);
      }
export type CreateOrderForUserMutationHookResult = ReturnType<typeof useCreateOrderForUserMutation>;
export type CreateOrderForUserMutationResult = Apollo.MutationResult<CreateOrderForUserMutation>;
export type CreateOrderForUserMutationOptions = Apollo.BaseMutationOptions<CreateOrderForUserMutation, CreateOrderForUserMutationVariables>;
export const AddCrmTagsToOrderListResultsDocument = gql`
    mutation AddCRMTagsToOrderListResults($input: OrderListInput!, $tags: [String!]!) {
  result: addCRMTagsToOrderListResults(input: $input, tags: $tags)
}
    `;
export type AddCrmTagsToOrderListResultsMutationFn = Apollo.MutationFunction<AddCrmTagsToOrderListResultsMutation, AddCrmTagsToOrderListResultsMutationVariables>;

/**
 * __useAddCrmTagsToOrderListResultsMutation__
 *
 * To run a mutation, you first call `useAddCrmTagsToOrderListResultsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCrmTagsToOrderListResultsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCrmTagsToOrderListResultsMutation, { data, loading, error }] = useAddCrmTagsToOrderListResultsMutation({
 *   variables: {
 *      input: // value for 'input'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddCrmTagsToOrderListResultsMutation(baseOptions?: Apollo.MutationHookOptions<AddCrmTagsToOrderListResultsMutation, AddCrmTagsToOrderListResultsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCrmTagsToOrderListResultsMutation, AddCrmTagsToOrderListResultsMutationVariables>(AddCrmTagsToOrderListResultsDocument, options);
      }
export type AddCrmTagsToOrderListResultsMutationHookResult = ReturnType<typeof useAddCrmTagsToOrderListResultsMutation>;
export type AddCrmTagsToOrderListResultsMutationResult = Apollo.MutationResult<AddCrmTagsToOrderListResultsMutation>;
export type AddCrmTagsToOrderListResultsMutationOptions = Apollo.BaseMutationOptions<AddCrmTagsToOrderListResultsMutation, AddCrmTagsToOrderListResultsMutationVariables>;
export const AddCrmTagsToOrderListResultsPreviewDocument = gql`
    query AddCRMTagsToOrderListResultsPreview($input: OrderListInput!) {
  result: addCRMTagsToOrderListResultsPreview(input: $input)
}
    `;

/**
 * __useAddCrmTagsToOrderListResultsPreviewQuery__
 *
 * To run a query within a React component, call `useAddCrmTagsToOrderListResultsPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddCrmTagsToOrderListResultsPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddCrmTagsToOrderListResultsPreviewQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCrmTagsToOrderListResultsPreviewQuery(baseOptions: Apollo.QueryHookOptions<AddCrmTagsToOrderListResultsPreviewQuery, AddCrmTagsToOrderListResultsPreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddCrmTagsToOrderListResultsPreviewQuery, AddCrmTagsToOrderListResultsPreviewQueryVariables>(AddCrmTagsToOrderListResultsPreviewDocument, options);
      }
export function useAddCrmTagsToOrderListResultsPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddCrmTagsToOrderListResultsPreviewQuery, AddCrmTagsToOrderListResultsPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddCrmTagsToOrderListResultsPreviewQuery, AddCrmTagsToOrderListResultsPreviewQueryVariables>(AddCrmTagsToOrderListResultsPreviewDocument, options);
        }
export type AddCrmTagsToOrderListResultsPreviewQueryHookResult = ReturnType<typeof useAddCrmTagsToOrderListResultsPreviewQuery>;
export type AddCrmTagsToOrderListResultsPreviewLazyQueryHookResult = ReturnType<typeof useAddCrmTagsToOrderListResultsPreviewLazyQuery>;
export type AddCrmTagsToOrderListResultsPreviewQueryResult = Apollo.QueryResult<AddCrmTagsToOrderListResultsPreviewQuery, AddCrmTagsToOrderListResultsPreviewQueryVariables>;