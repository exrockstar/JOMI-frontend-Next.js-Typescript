import React from 'react'
import { useRouter } from 'next/router'
import { useGetPromoCodeDetailQuery } from 'graphql/cms-queries/promocode-list.generated'
import { Stack, Typography, CircularProgress, Chip } from '@mui/material'
import PromoCodeForm from './PromoCodeForm'

type Props = {
  editMode?: boolean
  subscription?: boolean | null
}

const PromoCodeDetail = ({ editMode = true, subscription = null }: Props) => {
  const router = useRouter()
  const code = router.query.code as string

  const { data, loading } = useGetPromoCodeDetailQuery({
    skip: !code,
    variables: { code },
    fetchPolicy: 'network-only'
  })

  const promocode = data?.getPromoDetail

  if (loading) {
    return (
      <Stack
        height="90vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Stack>
    )
  }

  const PromoCodeHeader = () => {
    return (
      <Stack>
        <Typography variant="h4">
          {editMode
            ? 'Promo Code Details'
            : subscription
            ? 'Creating Subscription Promo Code'
            : 'Creating Timed Promo Code'}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: 'italic', px: 1 }}
          color="text.secondary"
        >
          {!editMode &&
            (subscription
              ? 'An order allowing access will be automatically created on every payment.'
              : 'An order allowing access will only be created once and will end after the given duration')}
        </Typography>
      </Stack>
    )
  }

  return (
    <Stack spacing={3}>
      <PromoCodeHeader />
      <PromoCodeForm
        promocode={promocode}
        editMode={editMode}
        subscription={subscription ?? promocode?.isSubscription}
      />

      {editMode && !(subscription ?? promocode?.isSubscription) && (
        <>
          <Typography variant="body1">Unused Codes</Typography>
          <Stack direction={'row'} flexWrap={'wrap'} spacing={1.5} useFlexGap>
            {promocode?.bulkUnusedCodes.map((item) => (
              <Chip label={item} key={item} />
            ))}
          </Stack>
          <Typography variant="body1">Used Codes</Typography>
          <Stack direction={'row'} flexWrap={'wrap'} spacing={1.5} useFlexGap>
            {promocode?.bulkUsedCodes.map((item) => (
              <Chip label={item} key={item} />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default PromoCodeDetail
