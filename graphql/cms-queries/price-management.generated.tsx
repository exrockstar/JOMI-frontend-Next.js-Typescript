import * as Types from '../types';

import { gql } from '@apollo/client';
import { PricePartsFragmentDoc } from './PriceParts.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateGeographicPriceMutationVariables = Types.Exact<{
  input: Types.GeographicPriceInput;
}>;


export type CreateGeographicPriceMutation = { __typename?: 'Mutation', createGeographicPrice?: { __typename?: 'StripePrice', _id: string, priceId: string, product: string, countryCodes?: Array<Types.CountryEnum> | null | undefined, countryCode?: Types.CountryEnum | null | undefined, nickname: string, interval?: Types.OrderInterval | null | undefined, unit_amount: number, currency: string } | null | undefined };

export type UpdateGeographicPriceMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  input: Types.UpdatePriceInput;
}>;


export type UpdateGeographicPriceMutation = { __typename?: 'Mutation', updatePrice?: { __typename?: 'StripePrice', _id: string, priceId: string, product: string, countryCodes?: Array<Types.CountryEnum> | null | undefined, countryCode?: Types.CountryEnum | null | undefined, nickname: string, interval?: Types.OrderInterval | null | undefined, unit_amount: number, currency: string } | null | undefined };

export type DeletePriceMutationVariables = Types.Exact<{
  priceId: Types.Scalars['String'];
}>;


export type DeletePriceMutation = { __typename?: 'Mutation', deletePrice?: { __typename?: 'StripePrice', _id: string, priceId: string, product: string, countryCodes?: Array<Types.CountryEnum> | null | undefined, countryCode?: Types.CountryEnum | null | undefined, nickname: string, interval?: Types.OrderInterval | null | undefined, unit_amount: number, currency: string } | null | undefined };

export type SyncPricesFromStripeMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SyncPricesFromStripeMutation = { __typename?: 'Mutation', syncDefaultPricesToDb: boolean };


export const CreateGeographicPriceDocument = gql`
    mutation CreateGeographicPrice($input: GeographicPriceInput!) {
  createGeographicPrice(input: $input) {
    ...PriceParts
  }
}
    ${PricePartsFragmentDoc}`;
export type CreateGeographicPriceMutationFn = Apollo.MutationFunction<CreateGeographicPriceMutation, CreateGeographicPriceMutationVariables>;

/**
 * __useCreateGeographicPriceMutation__
 *
 * To run a mutation, you first call `useCreateGeographicPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGeographicPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGeographicPriceMutation, { data, loading, error }] = useCreateGeographicPriceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGeographicPriceMutation(baseOptions?: Apollo.MutationHookOptions<CreateGeographicPriceMutation, CreateGeographicPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGeographicPriceMutation, CreateGeographicPriceMutationVariables>(CreateGeographicPriceDocument, options);
      }
export type CreateGeographicPriceMutationHookResult = ReturnType<typeof useCreateGeographicPriceMutation>;
export type CreateGeographicPriceMutationResult = Apollo.MutationResult<CreateGeographicPriceMutation>;
export type CreateGeographicPriceMutationOptions = Apollo.BaseMutationOptions<CreateGeographicPriceMutation, CreateGeographicPriceMutationVariables>;
export const UpdateGeographicPriceDocument = gql`
    mutation UpdateGeographicPrice($id: String!, $input: UpdatePriceInput!) {
  updatePrice(id: $id, input: $input) {
    ...PriceParts
  }
}
    ${PricePartsFragmentDoc}`;
export type UpdateGeographicPriceMutationFn = Apollo.MutationFunction<UpdateGeographicPriceMutation, UpdateGeographicPriceMutationVariables>;

/**
 * __useUpdateGeographicPriceMutation__
 *
 * To run a mutation, you first call `useUpdateGeographicPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGeographicPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGeographicPriceMutation, { data, loading, error }] = useUpdateGeographicPriceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGeographicPriceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGeographicPriceMutation, UpdateGeographicPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGeographicPriceMutation, UpdateGeographicPriceMutationVariables>(UpdateGeographicPriceDocument, options);
      }
export type UpdateGeographicPriceMutationHookResult = ReturnType<typeof useUpdateGeographicPriceMutation>;
export type UpdateGeographicPriceMutationResult = Apollo.MutationResult<UpdateGeographicPriceMutation>;
export type UpdateGeographicPriceMutationOptions = Apollo.BaseMutationOptions<UpdateGeographicPriceMutation, UpdateGeographicPriceMutationVariables>;
export const DeletePriceDocument = gql`
    mutation DeletePrice($priceId: String!) {
  deletePrice(id: $priceId) {
    ...PriceParts
  }
}
    ${PricePartsFragmentDoc}`;
export type DeletePriceMutationFn = Apollo.MutationFunction<DeletePriceMutation, DeletePriceMutationVariables>;

/**
 * __useDeletePriceMutation__
 *
 * To run a mutation, you first call `useDeletePriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePriceMutation, { data, loading, error }] = useDeletePriceMutation({
 *   variables: {
 *      priceId: // value for 'priceId'
 *   },
 * });
 */
export function useDeletePriceMutation(baseOptions?: Apollo.MutationHookOptions<DeletePriceMutation, DeletePriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePriceMutation, DeletePriceMutationVariables>(DeletePriceDocument, options);
      }
export type DeletePriceMutationHookResult = ReturnType<typeof useDeletePriceMutation>;
export type DeletePriceMutationResult = Apollo.MutationResult<DeletePriceMutation>;
export type DeletePriceMutationOptions = Apollo.BaseMutationOptions<DeletePriceMutation, DeletePriceMutationVariables>;
export const SyncPricesFromStripeDocument = gql`
    mutation SyncPricesFromStripe {
  syncDefaultPricesToDb
}
    `;
export type SyncPricesFromStripeMutationFn = Apollo.MutationFunction<SyncPricesFromStripeMutation, SyncPricesFromStripeMutationVariables>;

/**
 * __useSyncPricesFromStripeMutation__
 *
 * To run a mutation, you first call `useSyncPricesFromStripeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncPricesFromStripeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncPricesFromStripeMutation, { data, loading, error }] = useSyncPricesFromStripeMutation({
 *   variables: {
 *   },
 * });
 */
export function useSyncPricesFromStripeMutation(baseOptions?: Apollo.MutationHookOptions<SyncPricesFromStripeMutation, SyncPricesFromStripeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncPricesFromStripeMutation, SyncPricesFromStripeMutationVariables>(SyncPricesFromStripeDocument, options);
      }
export type SyncPricesFromStripeMutationHookResult = ReturnType<typeof useSyncPricesFromStripeMutation>;
export type SyncPricesFromStripeMutationResult = Apollo.MutationResult<SyncPricesFromStripeMutation>;
export type SyncPricesFromStripeMutationOptions = Apollo.BaseMutationOptions<SyncPricesFromStripeMutation, SyncPricesFromStripeMutationVariables>;