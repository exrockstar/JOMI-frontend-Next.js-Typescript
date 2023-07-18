import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  DateOperations,
  NumericOperations,
  SelectOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'
import {
  OrderPaymentStatus,
  OrderStatus,
  OrderType,
  RequireLogin
} from 'graphql/types'
import { snakeCase } from 'lodash'

export const orderListColumnFilterOptions: ColumnOption[] = [
  {
    label: 'Database ID',
    columnName: '_id',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Created Date',
    columnName: 'created',
    type: 'date',
    operations: DateOperations
  },
  {
    label: 'Start Date',
    columnName: 'start',
    type: 'date',
    operations: DateOperations
  },
  {
    label: 'End Date',
    columnName: 'end',
    type: 'date',
    operations: DateOperations
  },
  {
    label: 'Order Status',
    columnName: 'status',
    type: 'select',
    operations: SelectOperations,
    values: Object.values(OrderStatus).map((s) => snakeCase(s).toLowerCase())
  },
  {
    label: 'Payment Status',
    columnName: 'payment_status',
    type: 'select',
    operations: SelectOperations,
    values: Object.values(OrderPaymentStatus).map((s) =>
      snakeCase(s).toLowerCase()
    )
  },
  {
    label: 'Amount',
    columnName: 'amount',
    type: 'number',
    operations: NumericOperations
  },
  {
    label: 'Order Type',
    columnName: 'type',
    type: 'select',
    operations: SelectOperations,
    values: Object.values(OrderType).filter((type) => {
      const deprecatedOrderTypes = [
        OrderType.Institution,
        OrderType.Institutional
      ]
      return !deprecatedOrderTypes.includes(type)
    })
  },

  {
    label: 'Renewals',
    columnName: 'renewals',
    type: 'number',
    operations: NumericOperations
  },
  {
    label: 'Institution ID',
    columnName: '_institution._id',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Institution Name',
    columnName: '_institution.name',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Institution Category',
    columnName: '_institution.category',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'User ID',
    columnName: 'user._id',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'User Email',
    columnName: 'user.email',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Promo code',
    columnName: 'promoCode',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Order Description',
    columnName: 'description',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Notes',
    columnName: 'notes',
    type: 'text',
    operations: StringOperations
  },
  {
    label: 'Require Login',
    columnName: 'require_login',
    type: 'select',
    operations: SelectOperations,
    values: ['t', 'f']
  }
]
