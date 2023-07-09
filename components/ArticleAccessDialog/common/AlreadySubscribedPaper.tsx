import {
  Paper,
  DialogTitle,
  Typography,
  Divider,
  DialogContent,
  Button
} from '@mui/material'
import { analytics } from 'apis/analytics'
import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import CTAButton from 'components/common/CTAButton'
import CTAButtonOutlined from 'components/frontpage/CTAButtonOutlined'
const AlreadySubscribedPaper = () => {
  const router = useRouter()
  const fromUrl = encodeURIComponent(router?.asPath)
  return (
    <Paper>
      <DialogTitle>
        <Typography variant="h5">Already Subscribed?</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="body2">
          If you already have an active individual subscription or an active
          subscription through your institution, please:
        </Typography>
        <CTAButtonOutlined
          fullWidth
          data-event={'ArticleAccessDialog - Login Button'}
          onClick={analytics.trackClick}
          LinkComponent={NextLink}
          href={`/login?from=${fromUrl}`}
          sx={{ mt: 2 }}
        >
          Login to your account
        </CTAButtonOutlined>
      </DialogContent>
    </Paper>
  )
}

export default AlreadySubscribedPaper
