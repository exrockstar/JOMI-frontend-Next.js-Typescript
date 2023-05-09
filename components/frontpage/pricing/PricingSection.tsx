import { Container, Grid, Hidden, Typography } from '@mui/material'
import React from 'react'
import Heading from '../Heading'
import IndividualSubscriptionCard from './IndividualSubscriptionCard'
import InstitutionalSubscriptionCard from './InstitutionalSubscriptionCard'

const PricingSection = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 12, px: { sm: 2 } }} component="section">
      <Heading>Pricing</Heading>
      <Grid container spacing={6}>
        <Hidden smDown>
          <Grid item xs={0} md={5}>
            <Typography variant="h4" component="h3">
              Simple and Transparent Pricing Plans
            </Typography>
            <Typography color="text.secondary" mt={2.5}>
              The Journal of Medical Insight seeks to improve outcomes through
              publication of videos of cutting-edge and standard of care
              surgical procedures.
            </Typography>
          </Grid>
        </Hidden>
        <Grid container item xs={12} md={7} spacing={2}>
          <Grid item xs={12} md={6}>
            <IndividualSubscriptionCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <InstitutionalSubscriptionCard />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default PricingSection
