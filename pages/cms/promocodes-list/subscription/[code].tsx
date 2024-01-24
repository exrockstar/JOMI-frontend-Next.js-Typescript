import React from 'react'
import PromoCodeDetail from 'components/cms/promocodes/PromoCodeDetail'
import CmsLayout from 'components/cms/CmsLayout'
import { Stack } from '@mui/material'

const PromoCodeDetailPage = () => {
  return (
    <CmsLayout>
      <Stack p={2} minHeight="95vh">
        <PromoCodeDetail />
      </Stack>
    </CmsLayout>
  )
}

export default PromoCodeDetailPage
