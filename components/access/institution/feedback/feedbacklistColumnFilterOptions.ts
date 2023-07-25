import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  DateOperations,
  NumericOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'

export const feedbackListColumnFilterOptions: ColumnOption[] = [
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
    type: 'text',
    operations: StringOperations
  }
]
