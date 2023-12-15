import { FilterList, OpenInNew } from '@mui/icons-material'
import {
  Alert,
  Badge,
  Drawer,
  IconButton,
  Stack,
  Typography
} from '@mui/material'

import CmsLayout from 'components/cms/CmsLayout'
import AddPriceDialog from 'components/cms/prices-list/AddPriceDialog'
import PricesList from 'components/cms/prices-list/PricesList'
import {
  PricesByCountryListProvider,
  usePricesListByCountry
} from 'components/cms/prices-list/usePricesListByCountry'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import TableFilters from 'components/common/TableFilters'
import { useSyncPricesFromStripeMutation } from 'graphql/cms-queries/price-management.generated'
import { PricesListDocument } from 'graphql/cms-queries/prices-list.generated'
import { ColumnFilter } from 'graphql/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const PricesListPage = () => {
  const [addDialogShown, setAddDialogShown] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { filters, setFilters, columnOptions } = usePricesListByCountry()
  const { data: session } = useSession()

  const { enqueueSnackbar } = useSnackbar()
  const [syncPrices, { loading }] = useSyncPricesFromStripeMutation({
    onCompleted() {
      enqueueSnackbar('Successfully synced default prices from stripe', {
        variant: 'success'
      })
    },
    onError(error) {
      enqueueSnackbar(`Failed to sync default prices ${error.message}`, {
        variant: 'success'
      })
    },
    refetchQueries: [{ query: PricesListDocument }]
  })

  const onSubmitFilter = (newFilters: ColumnFilter[]) => {
    setFilters([...newFilters])

    setDrawerOpen(!drawerOpen)
  }
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <CmsLayout>
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer}>
        <FilterDrawer
          columnOptions={columnOptions}
          filters={filters}
          onSubmit={onSubmitFilter}
        />
      </Drawer>
      {addDialogShown && (
        <AddPriceDialog
          open={addDialogShown}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              setAddDialogShown(false)
            }
          }}
        />
      )}
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4">Prices List</Typography>
        </Stack>

        <IconButton onClick={toggleDrawer}>
          <Badge
            badgeContent={filters?.length}
            color="secondary"
            invisible={!filters?.length}
          >
            <FilterList />
          </Badge>
        </IconButton>
      </Stack>
      <Stack p={2} gap={1}>
        <Alert severity="info">
          <Typography variant="body2">
            Guide: Prices are calculated via <b>coefficient</b>(percentage from
            default price) and <b>multiplier</b> from{' '}
            <Link href="/cms/country-management">country management</Link> page.
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
            for a more detailed information about pricing.
          </Typography>
        </Alert>
        <TableFilters filters={filters} />
        <PricesList />
      </Stack>
    </CmsLayout>
  )
}

const PricesListWrapper = () => {
  return (
    <PricesByCountryListProvider>
      <PricesListPage />
    </PricesByCountryListProvider>
  )
}
export default PricesListWrapper
