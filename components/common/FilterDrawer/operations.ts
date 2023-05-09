import { QueryOperation } from 'graphql/types'

export const NumericOperations = [
  QueryOperation.GreaterThan,
  QueryOperation.GreaterThanOrEqual,
  QueryOperation.LessThan,
  QueryOperation.LessThanOrEqual
]

export const DateOperations = [QueryOperation.Before, QueryOperation.After]

export const StringOperations = [
  QueryOperation.Contains,
  QueryOperation.NotContains
]
