import * as Types from '../types';

import { gql } from '@apollo/client';
export type IpRangePartsFragment = { __typename?: 'IpRange', _id: string, created?: any | null, updated?: any | null, location: string, institution: string, start_string: string, end_string: string, lastEditedBy?: string | null, notes?: string | null };

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
  notes
}
    `;