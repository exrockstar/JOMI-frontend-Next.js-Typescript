import { CheckCircleOutline } from '@mui/icons-material'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography
} from '@mui/material'
import React from 'react'
import CTAButton from '../../common/CTAButton'

const IndividualSubscriptionCard = () => {
  const features = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
  return (
    <Card sx={{ borderRadius: 2, p: 3 }} elevation={0}>
      <Typography variant="h5" component="h4" fontWeight={700}>
        Individual Subscription
      </Typography>
      <Typography variant="caption" color="text.secondary" my={1.5}>
        Starting From
      </Typography>
      <Typography
        variant="h3"
        component="p"
        fontWeight={800}
        lineHeight="48px"
        mb={1.5}
      >
        $24/month
      </Typography>
      <Typography color="text.secondary" variant="body2" fontWeight={400}>
        Lorem ipsum dolor sit amet consectetur. Sem viverra viverra sit cursus
        felis.
      </Typography>
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
      <CTAButton variant="contained" fullWidth size="large">
        Buy Now
      </CTAButton>
    </Card>
  )
}

export default IndividualSubscriptionCard
