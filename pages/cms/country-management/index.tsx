import { OpenInNew } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Stack, Typography } from '@mui/material'
import CmsLayout from 'components/cms/CmsLayout'
import CountryManagementList from 'components/cms/country-management/CountryManagementList'
import UpdateCountriesDialog from 'components/cms/country-management/UpdateCountriesDialog'
import { CountryManagementListProvider } from 'components/cms/country-management/useCountryManagementList'
import useCsvDownload from 'components/cms/useCsvDownload'
import { useGetCountriesLazyQuery } from 'graphql/cms-queries/countries.generated'
import Link from 'next/link'
import useCountryManagementList from 'components/cms/country-management/useCountryManagementList'
import DownloadIcon from '@mui/icons-material/Download'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

import { useState } from 'react'

const TrialsSettingsPage = () => {
  const [open, setOpen] = useState(false)

  const { filters, sortBy, sortOrder, count } = useCountryManagementList()
  const [fetchFunc] = useGetCountriesLazyQuery({ fetchPolicy: 'no-cache' })

  const getMainData = (data) => {
    return data?.getCountries.countries ?? []
  }

  const convertFunc = (country) => {
    return {
      COUNTRY: country.name,
      'COUNTRY CODE': country.code,
      'TRIALS ENABLED': country.trialsEnabled ? 'Yes' : 'No',
      'ARTICLE RESTRICTION': country.articleRestriction,
      'PERCENTAGE FROM DEFAULT PRICE': country.coefficient,
      MULTIPLIER: country.multiplier ?? 'None'
    }
  }

  const {
    downloadCsv,
    loading: csvLoading,
    progress: csvProgress
  } = useCsvDownload({
    fetchFunc,
    convertFunc,
    getMainData,
    totalCount: count,
    collection: 'country',
    filters,
    sort_by: sortBy,
    sort_order: sortOrder
  })

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
        <Stack justifyContent={'space-between'} direction={'row'}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true)
            }}
          >
            Update Selected Countries
          </Button>
          <DownloadCsvButton
            loading={csvLoading}
            onClick={downloadCsv}
            csvProgress={csvProgress}
          />
        </Stack>
      </Stack>
      <Stack>
        <UpdateCountriesDialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        />
        <CountryManagementList />
      </Stack>
    </CmsLayout>
  )
}

const TrialsSettingsPageWrapper = () => {
  return (
    <CountryManagementListProvider>
      <TrialsSettingsPage />
    </CountryManagementListProvider>
  )
}

export default TrialsSettingsPageWrapper
