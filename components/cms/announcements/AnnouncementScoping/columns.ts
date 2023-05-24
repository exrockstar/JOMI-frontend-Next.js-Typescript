import { MatchStatus, Operators, StatusType, SubType, UserRoles } from 'graphql/types'
import { ColumnFilter } from 'graphql/types'

export type ColumnOption = {
  columnName: string
  type: 'date' | 'select' | 'text' | 'autocomplete' | 'boolean' | 'number'
  label: string
  operators: Operators[]
  values?: string[]
}
const StringOperators = [Operators.Contains, Operators.NotContains, Operators.Equal, Operators.NotEqual]
const SelectOperators = [Operators.Equal, Operators.NotEqual]
const DateOperators = [Operators.Before, Operators.After]
const BooleanOperators = [Operators.Equal, Operators.NotEqual]
const NumericOperators = [
  Operators.GreaterThan,
  Operators.GreaterThanOrEqual,
  Operators.LessThan,
  Operators.LessThanOrEqual
]
export const columnOptions: ColumnOption[] = [
  {
    columnName: 'user._id',
    label: 'User ID',
    operators: [Operators.Equal],
    type: 'text'
  },
  {
    columnName: 'user.user_type',
    label: 'User Type',
    operators: StringOperators,
    type: 'text'
  },
  {
    columnName: 'user.specialty',
    label: 'User Specialty',
    operators: StringOperators,
    type: 'text'
  },
  {
    columnName: 'user.subscription.subType',
    label: 'User Subscription',
    operators: SelectOperators,
    type: 'select',
    values: Object.values(SubType)
  },
  {
    label: 'User Role',
    columnName: 'user.role',
    type: 'select',
    operators: SelectOperators,
    values: Object.values(UserRoles)
  },
  {
    label: 'Interest',
    columnName: 'user.interests',
    type: 'text',
    operators: StringOperators
  },
  {
    label: 'User Registration date',
    columnName: 'user.created',
    type: 'date',
    operators: DateOperators
  },
  {
    label: 'User Referrer',
    columnName: 'user.referer',
    type: 'text',
    operators: StringOperators
  },

  {
    label: 'User Is Blocked',
    columnName: 'user.hasManualBlock',
    type: 'boolean',
    operators: BooleanOperators
  },
  {
    label: 'User Match Status',
    columnName: 'user.matchStatus',
    type: 'select',
    operators: SelectOperators,
    values: Object.values(MatchStatus).map((val) =>
      val
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase()
    )
  },
  {
    label: 'User Matched By',
    columnName: 'user.matchedBy',
    type: 'select',
    operators: SelectOperators,
    values: ['admin', 'email', 'ip', 'institution_name', 'institutional_email', 'not_matched']
  },
  {
    label: 'User Country Code',
    columnName: 'user.countryCode',
    type: 'text',
    operators: StringOperators
  },
  {
    label: 'User - Last Visited',
    columnName: 'user.last_visited',
    type: 'date',
    operators: DateOperators
  },
  {
    label: 'USer - Has Requested Subscription',
    columnName: 'user.hasRequestedSubscription',
    type: 'boolean',
    operators: BooleanOperators
  },
  {
    label: 'Request Count',
    columnName: 'requestSubscriptionCount',
    type: 'number',
    operators: NumericOperators
  },
  {
    columnName: 'institution._id',
    label: 'Institution ID',
    operators: StringOperators,
    type: 'text'
  },
  {
    label: 'Institution name',
    columnName: 'institution.name',
    type: 'text',
    operators: StringOperators
  },
  {
    columnName: 'institution.category',
    type: 'text',
    label: 'Institution Category',
    operators: StringOperators
  },
  {
    columnName: 'institution.subscription.status',
    type: 'select',
    label: 'Institution Subscription status',
    operators: SelectOperators,
    values: Object.values(StatusType)
  },
  {
    columnName: 'institution.domains',
    type: 'text',
    label: 'Institution Domains',
    operators: StringOperators
  },
  {
    columnName: 'institution.aliases',
    type: 'text',
    label: 'Institution Aliases',
    operators: StringOperators
  },
  {
    columnName: 'institution.expiry_date_cached',
    type: 'date',
    label: 'Institution Order Expiry Date',
    operators: DateOperators
  },
  {
    columnName: 'geography.countryCode',
    label: 'Visitor Country Code',
    operators: StringOperators,
    type: 'text'
  }
]
