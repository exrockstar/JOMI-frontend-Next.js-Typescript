import { East } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Link as MuiLink
} from '@mui/material'
import Link from 'next/link'
import React from 'react'

const InstitutionalSubscriptionCard = () => {
  return (
    <Card
      sx={{
        p: 3,
        background: 'transparent',
        borderRadius: 1
      }}
      variant="outlined"
      elevation={0}
    >
      <Typography variant="h5" component="h4" fontWeight={700} mb={1.5}>
        Institutional Subscription
      </Typography>
      <Stack gap={2} mb={6}>
        <Typography color="text.secondary" variant="body2" fontWeight={400}>
          If you would like your institution to subscribe, please:
        </Typography>
        <Typography color="text.secondary" variant="body2" fontWeight={400}>
          1. Contact someone at your institution (medical librarian, program
          director, faculty, etc.) to request a subscription.
        </Typography>
        <Typography color="text.secondary" variant="body2" fontWeight={400}>
          2. Log a request at jomi.com/request and we will follow up to the best
          of our abilities.
        </Typography>
        <Typography color="text.secondary" variant="body2" fontWeight={400}>
          3. View more details{' '}
          <Link href="/" passHref style={{ color: '#818CF8' }}>
            here
          </Link>
        </Typography>
      </Stack>
      <Button
        endIcon={<East />}
        variant="outlined"
        color="secondary"
        fullWidth
        size={'large'}
        sx={{ textTransform: 'none' }}
      >
        Contact Us{' '}
      </Button>
    </Card>
  )
}

export default InstitutionalSubscriptionCard
