import { QueryOperation } from 'graphql/types'

export const NumericOperations = [
  QueryOperation.GreaterThan,
  QueryOperation.GreaterThanOrEqual,
  QueryOperation.LessThan,
  QueryOperation.LessThanOrEqual,
  QueryOperation.IsNull,
  QueryOperation.IsNullOrEmpty,
  QueryOperation.IsNotNull,
  QueryOperation.IsNotNullOrEmpty
]

export const DateOperations = [QueryOperation.Before, QueryOperation.After]

export const StringOperations = [
  QueryOperation.Contains,
  QueryOperation.NotContains,
  QueryOperation.IsNull,
  QueryOperation.IsNullOrEmpty,
  QueryOperation.IsNotNull,
  QueryOperation.IsNotNullOrEmpty
]

export const SelectOperations = [
  QueryOperation.Equal,
  QueryOperation.NotEqual,
  QueryOperation.IsNull,
  QueryOperation.IsNullOrEmpty,
  QueryOperation.IsNotNull,
  QueryOperation.IsNotNullOrEmpty
]
