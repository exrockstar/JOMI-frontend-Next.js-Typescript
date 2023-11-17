import {
  Paper,
  Stack,
  DialogTitle,
  Typography,
  Divider,
  DialogContent
} from '@mui/material'
import CTAButton from 'components/common/CTAButton'
import React from 'react'
import NextLink from 'next/link'
import { analytics } from 'apis/analytics'
import { useRouter } from 'next/router'
import { ArticleAccessQuery } from 'graphql/queries/article-access.generated'

type Props = {
  accessData: ArticleAccessQuery
}

const InstitutionalAccessAnonPaper = (props: Props) => {
  const router = useRouter()
  const fromUrl = encodeURIComponent(router?.asPath)
  if (props.accessData?.getIsRequestInstSubButtonPaperOn) {
    return (
      <Paper>
        <Stack>
          <DialogTitle>
            <Typography variant="h5">Institutional Access</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography variant="body2">
              If you enjoy our content and are at an institution, consider
              requesting an institutional subscription.
            </Typography>
            <CTAButton
              LinkComponent={NextLink}
              data-event={
                'ArticleAccessDialog - Request Institutional Subscription'
              }
              sx={{ mt: 2 }}
              onClick={analytics.trackClick}
              fullWidth
              href={`/account/request-subscription?from=${fromUrl}`}
            >
              Request Institutional Subscription
            </CTAButton>
          </DialogContent>
        </Stack>
      </Paper>
    )
  } else return null
}

export default InstitutionalAccessAnonPaper
