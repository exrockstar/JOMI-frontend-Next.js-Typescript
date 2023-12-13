import { OpenInNew } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import CmsLayout from 'components/cms/CmsLayout'
import CountryManagementList from 'components/cms/country-management/CountryManagementList'
import UpdateCountriesDialog from 'components/cms/country-management/UpdateCountriesDialog'
import { CountryManagementListProvider } from 'components/cms/country-management/useCountryManagementList'
import Link from 'next/link'

import { useState } from 'react'

const TrialsSettingsPage = () => {
  const [open, setOpen] = useState(false)
  return (
    <CmsLayout>
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack>
          <Typography variant="h4">Country Management</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            Allows admin to modify trial settings and access settings for each
            country
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            Please refer to the{' '}
            <Link
              href="https://docs.google.com/document/d/1gaHlLMo-JbKvokVlDnT4nJlb1yfcQfmIF2NLHI4I7Dg/edit?usp=sharing"
              target="_blank"
              passHref
            >
              <span>
                Country Management Guide <OpenInNew sx={{ fontSize: 12 }} />
              </span>
            </Link>{' '}
            for a more detailed information about article restrictions and
            pricing.
          </Typography>
        </Stack>
      </Stack>
      <Stack px={2}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true)
            }}
          >
            Update Selected Countries
          </Button>
        </Box>
      </Stack>
      <Stack>
        <CountryManagementListProvider>
          <UpdateCountriesDialog
            open={open}
            onClose={() => {
              setOpen(false)
            }}
          />
          <CountryManagementList />
        </CountryManagementListProvider>
      </Stack>
    </CmsLayout>
  )
}

export default TrialsSettingsPage
