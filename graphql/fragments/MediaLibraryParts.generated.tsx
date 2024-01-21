import * as Types from '../types';

import { gql } from '@apollo/client';
export type MediaLibaryPartsFragment = { __typename?: 'MediaOutput', count?: number | null, files: Array<{ __typename?: 'Media', _id: any, filename: string, length: number, uploadDate?: any | null, metadata?: { __typename?: 'MediaMeta', title?: string | null, description?: string | null } | null }> };

export const MediaLibaryPartsFragmentDoc = gql`
    fragment MediaLibaryParts on MediaOutput {
  files {
    _id
    filename
    length
    uploadDate
    metadata {
      title
      description
    }
  }
  count
}
    `;