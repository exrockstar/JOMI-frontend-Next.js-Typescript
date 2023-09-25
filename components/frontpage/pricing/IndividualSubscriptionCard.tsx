import { CheckCircleOutline } from '@mui/icons-material'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import CTAButton from '../../common/CTAButton'

export type PricingProps = {
  name: string
  heading: string
  price: {
    monthly: string
    yearly: string
  }
  description: string
  features?: string[]
  showMonthly?: boolean
}
const IndividualSubscriptionCard = (props: PricingProps) => {
  const features = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
  const isFree = props.price.monthly === 'FREE'
  return (
    <Card sx={{ borderRadius: 2, p: 3 }} elevation={0}>
      <Typography variant="h5" component="h4" fontWeight={700}>
        {props.heading}
      </Typography>

      <Typography
        color="text.secondary"
        variant="body2"
        fontWeight={400}
        my={2}
      >
        {props.description}
      </Typography>

      <Stack direction="row" alignItems={'center'} gap={1}>
        <Typography
          fontSize="2rem"
          component="p"
          fontWeight={800}
          lineHeight="48px"
        >
          {props.showMonthly
            ? `${props.price.monthly}`
            : `${props.price.yearly}`}
        </Typography>
        {!isFree && (
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ wordBreak: 'break-word', width: '40px' }}
            >
              per {props.showMonthly ? 'month' : 'year'}
            </Typography>
          </Box>
        )}
      </Stack>

      <Stack gap={1.75} mt={3} mb={6}>
        {features.map((feature) => {
          return (
            <Typography
              key={feature}
              alignItems="center"
              display="flex"
              gap={1}
              variant="body2"
              fontWeight={400}
              color="grey.300"
            >
              <CheckCircleOutline fontSize="small" />
              {feature}
            </Typography>
          )
        })}
      </Stack>
      <CTAButton
        variant="contained"
        fullWidth
        size="large"
        href="/account/subscription"
      >
        Subscribe
      </CTAButton>
    </Card>
  )
}

export default IndividualSubscriptionCard
