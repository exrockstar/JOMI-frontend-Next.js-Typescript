import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  DateOperations,
  NumericOperations,
  SelectOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import {
  OrderPaymentStatus,
  OrderStatus,
  OrderType,
  QueryOperation,
  RequireLogin
} from 'graphql/types'
import { snakeCase } from 'lodash'
import { countries } from 'components/cms/prices-list/countryList'
export const useOrdersListColumnOptions = () => {
  const { data: userTypesData } = useUserTypesAndSpecialtiesQuery()
  const userTypes = userTypesData?.userTypes?.map((u) => u.type) ?? []
  const specialties = userTypesData?.specialties?.map((s) => s.name) ?? []

  const orderListColumnFilterOptions: ColumnOption[] = [
    {
      label: 'Order Properties',
      type: 'divider',
      operations: [],
      columnName: '-'
    },
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
    },
    {
      label: 'Institution Properties',
      type: 'divider',
      operations: [],
      columnName: '-'
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
      label: 'User Properties',
      type: 'divider',
      operations: [],
      columnName: '-'
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
      label: 'User Type',
      columnName: 'user.user_type',
      type: 'select',
      values: userTypes,
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      label: 'User Country',
      columnName: 'user.countryCode',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: countries.map((c) => c.code),
      labels: countries.map((c) => c.label)
    },
    {
      label: 'User Specialization',
      columnName: 'user.specialty',
      type: 'select',
      values: specialties,
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    }
  ]

  return orderListColumnFilterOptions
}
