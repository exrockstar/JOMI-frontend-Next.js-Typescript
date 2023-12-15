import { Container, Grid, Stack, Switch, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import Heading from '../Heading'
import PricingCard from './PricingCard'
import { useGetPricingSectionDataQuery } from 'graphql/queries/frontpage.generated'
import CircularLoader from 'components/common/CircularLoader'
import { useOnClickOutside } from 'usehooks-ts'
import { OrderInterval } from 'graphql/types'

const PricingSection = () => {
  const [showMonthly, setShowMonthly] = useState(false)
  const { data, loading } = useGetPricingSectionDataQuery({
    fetchPolicy: 'network-only'
  })
  const [selected, setSelected] = useState('')
  const containerRef = useRef()

  useOnClickOutside(containerRef, () => {
    setSelected('')
  })
  const prices = data?.getPricingSectionData ?? []
  const monthlyPrices = prices.filter((p) => p.interval === OrderInterval.Month)
  const yearlyPrices = prices.filter((p) => p.interval === OrderInterval.Year)
  const shownPrices = showMonthly ? monthlyPrices : yearlyPrices
  const trialDuration = data?.getTrialSettingsForCountry.trialDuration
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 12, px: { sm: 2 } }}
      component="section"
      ref={containerRef}
    >
      <Heading _href="pricing">Pricing</Heading>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent={'center'}
        mb={2}
      >
        <Typography>Monthly</Typography>
        <Switch
          checked={!showMonthly}
          onChange={(e) => {
            setShowMonthly(!e.target.checked)
          }}
        />
        <Typography>Yearly</Typography>
      </Stack>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        alignItems={{ md: 'stretch' }}
      >
        {loading ? (
          <CircularLoader />
        ) : (
          <>
            {shownPrices.map((data, i, arr) => {
              const md = 3.5
              const sm = arr.length > 3 ? 6 : 4
              const isSelected = data.product === selected
              return (
                <Grid item xs={12} sm={sm} md={md} key={data.product}>
                  <PricingCard
                    {...data}
                    id={data._id}
                    trialDuration={trialDuration}
                    onSelect={(id) => setSelected(data.product)}
                    selected={isSelected}
                    ctaText={data.unit_amount > 0 ? 'Subscribe' : 'Start Trial'}
                  />
                </Grid>
              )
            })}
          </>
        )}
      </Grid>
    </Container>
  )
}

export default PricingSection
