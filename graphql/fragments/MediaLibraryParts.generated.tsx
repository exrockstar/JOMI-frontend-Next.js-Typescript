import * as Types from '../types';

import { gql } from '@apollo/client';
export type MediaLibaryPartsFragment = { __typename?: 'MediaOutput', count?: number | null | undefined, files: Array<{ __typename?: 'Media', _id: any, filename: string, length: number, uploadDate?: any | null | undefined, metadata?: { __typename?: 'MediaMeta', title?: string | null | undefined, description?: string | null | undefined } | null | undefined }> };

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