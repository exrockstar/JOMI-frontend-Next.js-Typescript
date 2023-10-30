import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  DateOperations,
  NumericOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'
import { useUserTypesAndSpecialtiesQuery } from 'graphql/queries/user-types.generated'
import { QueryOperation } from 'graphql/types'

export const useFeedbackListColumnOptions = () => {
  const { data: userTypesData } = useUserTypesAndSpecialtiesQuery()
  const userTypes = userTypesData?.userTypes?.map((u) => u.type) ?? []

  const columnOptions: ColumnOption[] = [
    {
      columnName: 'user.email',
      label: 'User Email',
      operations: StringOperations,
      type: 'text'
    },
    {
      label: 'Created Date',
      columnName: 'createdAt',
      type: 'date',
      operations: DateOperations
    },
    {
      label: 'Updated Date',
      columnName: 'updatedAt',
      type: 'date',
      operations: DateOperations
    },
    {
      label: 'Question',
      columnName: 'question.question',
      type: 'text',
      operations: StringOperations
    },
    {
      label: 'Value',
      columnName: 'value',
      type: 'number',
      operations: NumericOperations
    },
    {
      label: 'Comment',
      columnName: 'comment',
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
      columnName: '_institution._id',
      label: 'Institution ID',
      operations: StringOperations,
      type: 'text'
    },
    {
      columnName: '_institution.name',
      label: 'Institution Name',
      operations: StringOperations,
      type: 'text'
    }
  ]

  return columnOptions
}
