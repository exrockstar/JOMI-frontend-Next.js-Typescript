import React from 'react'
import PromoCodeDetail from 'components/cms/promocodes/PromoCodeDetail'
import CmsLayout from 'components/cms/CmsLayout'
import { Stack } from '@mui/material'

const PromoCodeEditPage = () => {
  return (
    <CmsLayout>
      <Stack p={2} minHeight="95vh">
        <PromoCodeDetail editMode={false} subscription={true} />
      </Stack>
    </CmsLayout>
  )
}

export default PromoCodeEditPage
