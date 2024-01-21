import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCountriesQueryVariables = Types.Exact<{
  input: Types.CountryListInput;
}>;


export type GetCountriesQuery = { __typename?: 'Query', getCountries: { __typename?: 'CountryListOutput', count: number, filteredCodes: Array<string>, countries: Array<{ __typename?: 'Country', _id: string, code: Types.CountryEnum, name: string, trialsEnabled: boolean, articleRestriction: Types.ArticleRestrictionEnum, coefficient: number, multiplier?: number | null }> } };

export type UpdateCountriesMutationVariables = Types.Exact<{
  input: Types.UpdateCountriesInput;
}>;


export type UpdateCountriesMutation = { __typename?: 'Mutation', result: string };


export const GetCountriesDocument = gql`
    query GetCountries($input: CountryListInput!) {
  getCountries(input: $input) {
    countries {
      _id
      code
      name
      trialsEnabled
      articleRestriction
      coefficient
      multiplier
    }
    count
    filteredCodes
  }
}
    `;

/**
 * __useGetCountriesQuery__
 *
 * To run a query within a React component, call `useGetCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCountriesQuery(baseOptions: Apollo.QueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
      }
export function useGetCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountriesQuery, GetCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountriesQuery, GetCountriesQueryVariables>(GetCountriesDocument, options);
        }
export type GetCountriesQueryHookResult = ReturnType<typeof useGetCountriesQuery>;
export type GetCountriesLazyQueryHookResult = ReturnType<typeof useGetCountriesLazyQuery>;
export type GetCountriesQueryResult = Apollo.QueryResult<GetCountriesQuery, GetCountriesQueryVariables>;
export const UpdateCountriesDocument = gql`
    mutation UpdateCountries($input: UpdateCountriesInput!) {
  result: updateCountries(input: $input)
}
    `;
export type UpdateCountriesMutationFn = Apollo.MutationFunction<UpdateCountriesMutation, UpdateCountriesMutationVariables>;

/**
 * __useUpdateCountriesMutation__
 *
 * To run a mutation, you first call `useUpdateCountriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCountriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCountriesMutation, { data, loading, error }] = useUpdateCountriesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCountriesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCountriesMutation, UpdateCountriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCountriesMutation, UpdateCountriesMutationVariables>(UpdateCountriesDocument, options);
      }
export type UpdateCountriesMutationHookResult = ReturnType<typeof useUpdateCountriesMutation>;
export type UpdateCountriesMutationResult = Apollo.MutationResult<UpdateCountriesMutation>;
export type UpdateCountriesMutationOptions = Apollo.BaseMutationOptions<UpdateCountriesMutation, UpdateCountriesMutationVariables>;