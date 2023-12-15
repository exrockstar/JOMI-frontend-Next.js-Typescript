import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import { ArticleRestrictionEnum, QueryOperation } from 'graphql/types'
import { countries } from '../prices-list/countryList'
import { snakeCase } from 'lodash'
import { NumericOperations } from 'components/common/FilterDrawer/operations'

const SelectOperations = [QueryOperation.Equal, QueryOperation.NotEqual]
export const countryColumnOptions: ColumnOption[] = [
  {
    label: 'Country',
    columnName: 'code',
    type: 'select',
    operations: SelectOperations,
    values: countries.map((c) => c.code),
    labels: countries.map((c) => c.label)
  },
  {
    label: 'Trials Enabled',
    columnName: 'trialsEnabled',
    type: 'boolean',
    operations: SelectOperations
  },
  {
    label: 'Article Restriction',
    columnName: 'articleRestriction',
    type: 'select',
    operations: SelectOperations,
    values: Object.values(ArticleRestrictionEnum).map((v) => snakeCase(v)),
    labels: Object.values(ArticleRestrictionEnum)
  },
  {
    label: 'Percentage From Default Price',
    columnName: 'coefficient',
    type: 'number',
    operations: NumericOperations
  },
  {
    label: 'Multiplier',
    columnName: 'multiplier',
    type: 'select',
    operations: NumericOperations
  }
]
