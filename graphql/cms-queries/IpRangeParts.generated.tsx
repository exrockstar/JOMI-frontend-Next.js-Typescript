import * as Types from '../types';

import { gql } from '@apollo/client';
export type IpRangePartsFragment = { __typename?: 'IpRange', _id: string, created?: any | null | undefined, updated?: any | null | undefined, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null | undefined };

export const IpRangePartsFragmentDoc = gql`
    fragment IpRangeParts on IpRange {
  _id
  created
  updated
  location
  institution
  start_string
  end_string
  lastEditedBy
}
    `;