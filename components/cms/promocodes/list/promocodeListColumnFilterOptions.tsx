import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  DateOperations,
  NumericOperations,
  SelectOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'

import { OrderInterval, PromoCodeType } from 'graphql/types'

export const usePromoCodeListColumnFilterOptions = () => {
  const promoCodeListColumnFilterOptions: ColumnOption[] = [
    {
      label: 'Code',
      columnName: '_id',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Title',
      columnName: 'title',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Price',
      columnName: 'price',
      type: 'number',
      operations: NumericOperations
    },
    {
      label: 'Interval',
      columnName: 'interval',
      type: 'select',
      operations: SelectOperations,
      values: Object.values(OrderInterval)
    },
    {
      label: 'Type',
      columnName: 'type',
      type: 'select',
      operations: SelectOperations,
      values: Object.values(PromoCodeType)
    },
    {
      label: 'Created',
      columnName: 'created',
      type: 'date',
      operations: DateOperations
    },
    {
      label: 'Expiration',
      columnName: 'expiration',
      type: 'date',
      operations: DateOperations
    }
  ]

  return promoCodeListColumnFilterOptions
}
