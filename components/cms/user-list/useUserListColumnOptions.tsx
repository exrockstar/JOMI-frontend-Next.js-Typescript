import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  StringOperations,
  DateOperations,
  NumericOperations
} from 'components/common/FilterDrawer/operations'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { UserRoles, QueryOperation, SubType, MatchStatus } from 'graphql/types'
import React from 'react'

const useUserListColumnOptions = () => {
  const { data: userTypesData } = useUserTypesAndSpecialtiesQuery()
  const userTypes = userTypesData?.userTypes?.map((u) => u.type) ?? []
  const specialties = userTypesData?.specialties?.map((s) => s.name) ?? []
  const columnOptions: ColumnOption[] = [
    {
      label: 'Name',
      columnName: 'name',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Email',
      columnName: 'email',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Institutional Email',
      columnName: 'inst_email',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Role',
      columnName: 'role',
      type: 'select',
      operations: StringOperations,
      values: Object.values(UserRoles)
    },

    {
      label: 'User Type',
      columnName: 'user_type',
      type: 'select',
      values: userTypes,
      operations: StringOperations
    },
    {
      label: 'Specialty',
      columnName: 'specialty',
      type: 'select',
      values: specialties,
      operations: StringOperations
    },
    {
      label: 'Institution (Stated)',
      columnName: 'institution_name',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Institution (Matched)',
      columnName: 'matched_institution_name',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Registration date',
      columnName: 'created',
      type: 'date',
      operations: DateOperations
    },
    {
      label: 'Promo code',
      columnName: 'promo_code',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Referrer',
      columnName: 'referer',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Interest',
      columnName: 'interests',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Subscription Type',
      columnName: 'subscription.subType',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: Object.values(SubType)
    },
    {
      label: 'Created Trial Access At',
      columnName: 'trialAccessAt',
      type: 'date',
      operations: DateOperations
    },
    {
      label: 'Trials Allowed',
      columnName: 'trialsAllowed',
      type: 'boolean',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      label: 'Is User Blocked',
      columnName: 'hasManualBlock',
      type: 'boolean',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },

    {
      label: 'Match Status',
      columnName: 'matchStatus',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: Object.values(MatchStatus).map((val) =>
        val
          .split(/(?=[A-Z])/)
          .join('_')
          .toLowerCase()
      )
    },
    {
      label: 'Matched By',
      columnName: 'matchedBy',
      type: 'select',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual],
      values: [
        'admin',
        'email',
        'ip',
        'institution_name',
        'institutional_email',
        'not_matched'
      ]
    },
    {
      label: 'Country Code',
      columnName: 'countryCode',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Region Name',
      columnName: 'regionName',
      type: 'text',
      operations: StringOperations
    },

    {
      label: 'Login Count',
      columnName: 'loginCount',
      type: 'text',
      operations: NumericOperations
    },
    {
      label: 'View Count',
      columnName: 'articleCount',
      type: 'text',
      operations: NumericOperations
    },
    {
      label: 'Last Visited',
      columnName: 'last_visited',
      type: 'date',
      operations: DateOperations
    },
    {
      label: 'Referrer Path',
      columnName: 'referrerPath',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Has Requested Subscription',
      columnName: 'hasRequestedSubscription',
      type: 'boolean',
      operations: [QueryOperation.Equal, QueryOperation.NotEqual]
    },
    {
      label: 'Request Count',
      columnName: 'requestSubscriptionCount',
      type: 'number',
      operations: NumericOperations
    },
    {
      label: 'Email Verify Date',
      columnName: 'emailVerifiedAt',
      type: 'date',
      operations: DateOperations
    },
    {
      label: 'Institution Email Verified At',
      columnName: 'instEmailVerifiedAt',
      type: 'date',
      operations: DateOperations
    }
  ]

  return columnOptions
}

export default useUserListColumnOptions
