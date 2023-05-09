import { Stack, Typography, Link as MuiLink } from '@mui/material'
import { TriageQueueByIdQuery } from 'graphql/cms-queries/triage-queue-list.generated'
import React from 'react'
import Link from 'next/link'
import { MatchedBy, MatchStatus } from 'graphql/types'
type Props = {
  request: TriageQueueByIdQuery['triageQueueRequest']
}

const AffiliationInfo = ({ request }: Props) => {
  const { user, institution } = request
  if (!user) return null
  return (
    <Stack spacing={0.5}>
      <Typography variant="h5"> Affiliation</Typography>
      <Typography variant="body2">
        <strong>Stated </strong> {user.institution_name}
      </Typography>
      <>
        {institution ? (
          <Typography variant="body2">
            <strong>Matched: </strong>{' '}
            <Link
              href={`/cms/institutions-list/${institution._id}`}
              passHref
              legacyBehavior
            >
              <MuiLink>{institution.name}</MuiLink>
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2">
            <strong>Matched: </strong>
            <Link href={`/cms/institutions-list`} passHref legacyBehavior>
              <MuiLink>NOT MATCHED - CREATE INSTITUTION</MuiLink>
            </Link>
          </Typography>
        )}
      </>
      <Typography variant="body2">
        <strong>Matched Status: </strong>
        {user.matchStatus ?? MatchStatus.NotMatched}
      </Typography>
      <Typography variant="body2">
        <strong>Matched By: </strong>
        {user.matchedBy ?? MatchedBy.NotMatched}
      </Typography>
      {/* <Typography variant="body2">
        <strong>Last Edited By: </strong> {user.user_type}
      </Typography>
      <Typography variant="body2">
        <strong>Previsously Stated Institutions :</strong> {user.specialty}
      </Typography> */}
    </Stack>
  )
}

export default AffiliationInfo
