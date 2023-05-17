import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  DateOperations,
  NumericOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'
import { PromoCodeDuration, QueryOperation } from 'graphql/types'

export const promoCodeColumnOptions: ColumnOption[] = [
  {
    label: 'Code',
    columnName: 'code',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Description',
    columnName: 'name',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Valid',
    columnName: 'valid',
    type: 'boolean',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  {
    label: 'Created At',
    columnName: 'created',
    type: 'date',
    operations: DateOperations
  },
  {
    label: 'Amount OFF',
    columnName: 'amount_off',
    type: 'number',
    operations: NumericOperations
  },
  {
    label: 'Percent OFF',
    columnName: 'percent_off',
    type: 'number',
    operations: NumericOperations
  },
  {
    label: 'Products Applied To',
    columnName: 'applies_to',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Times Redeemed',
    columnName: 'times_redeemed',
    type: 'text',
    operations: NumericOperations
  },
  {
    label: 'Max Redemptions',
    columnName: 'max_redemptions',
    type: 'text',
    operations: NumericOperations
  },
  {
    label: 'Redeem By',
    columnName: 'redeem_by',
    type: 'date',
    operations: DateOperations
  },
  {
    label: 'Duration',
    columnName: 'duration',
    type: 'select',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: Object.values(PromoCodeDuration)
  },
  {
    label: 'Stripe Coupon ID',
    columnName: 'couponId',
    type: 'text',
    operations: [
      QueryOperation.Equal,
      QueryOperation.NotEqual,
      ...StringOperations
    ]
  }
]
