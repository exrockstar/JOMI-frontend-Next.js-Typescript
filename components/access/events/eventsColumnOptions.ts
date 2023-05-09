import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import {
  StringOperations,
  NumericOperations,
  DateOperations
} from 'components/common/FilterDrawer/operations'
import { ActivityType, QueryOperation, StatusType } from 'graphql/types'

const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-')

export const eventsColumnOptions: ColumnOption[] = [
  {
    columnName: 'activity',
    type: 'select',
    label: 'Activity',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: Object.values(ActivityType).map((val) => toKebabCase(val))
  },
  {
    columnName: 'user_id',
    type: 'text',
    label: 'User ID',
    operations: StringOperations
  },
  {
    columnName: 'institution',
    type: 'text',
    label: 'Institution ID',
    operations: StringOperations
  },
  {
    columnName: 'institution_name',
    type: 'text',
    label: 'Institution Name',
    operations: StringOperations
  },
  {
    columnName: 'article_title',
    type: 'text',
    label: 'Article Title',
    operations: StringOperations
  },
  {
    columnName: 'article_publication_id',
    type: 'text',
    label: 'Article Publication Id',
    operations: StringOperations
  },
  {
    columnName: 'article_categories_flat',
    type: 'text',
    label: 'Article Category',
    operations: StringOperations
  },
  {
    columnName: 'ip_address_str',
    type: 'text',
    label: 'IP Address',
    operations: StringOperations
  },
  {
    columnName: 'geolocation.countryCode',
    type: 'text',
    label: 'Country',
    operations: StringOperations
  },
  {
    columnName: 'geolocation.regionName',
    type: 'text',
    label: 'Region',
    operations: StringOperations
  },
  {
    columnName: 'isSubscribed',
    type: 'boolean',
    label: 'Is Subscribed',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  {
    columnName: 'user_type',
    type: 'text',
    label: 'User type',
    operations: StringOperations
  },
  {
    columnName: 'time_watched',
    type: 'number',
    label: 'Time Watched',
    operations: NumericOperations
  },
  {
    columnName: 'created',
    type: 'date',
    label: 'Date Created',
    operations: DateOperations
  },
  {
    columnName: 'referredFrom',
    type: 'text',
    label: 'Referrer',
    operations: StringOperations
  },
  {
    columnName: 'referrerPath',
    type: 'text',
    label: 'Referrer Path',
    operations: StringOperations
  }
]
