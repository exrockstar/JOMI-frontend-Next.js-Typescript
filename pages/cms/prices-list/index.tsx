import { Add, FilterList, Refresh } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Badge, Drawer, IconButton, Stack, Typography } from '@mui/material'

import CmsLayout from 'components/cms/CmsLayout'
import AddPriceDialog from 'components/cms/prices-list/AddPriceDialog'
import PricesList from 'components/cms/prices-list/PricesList'
import { countries } from 'components/cms/prices-list/countryList'
import {
  PricesListProvider,
  usePricesListControls
} from 'components/cms/prices-list/usePricesListControls'
import { ColumnOption } from 'components/common/FilterDrawer/ColumnOption'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import {
  NumericOperations,
  StringOperations
} from 'components/common/FilterDrawer/operations'
import { useSyncPricesFromStripeMutation } from 'graphql/cms-queries/price-management.generated'
import {
  PricesListDocument,
  usePricesListQuery
} from 'graphql/cms-queries/prices-list.generated'
import { ColumnFilter, QueryOperation } from 'graphql/types'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'

const columnOptions: ColumnOption[] = [
  {
    columnName: 'product',
    label: 'Product',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'nickname',
    label: 'Description',
    type: 'text',
    operations: StringOperations
  },
  {
    columnName: 'countryCodes',
    label: 'Country ',
    type: 'select',
    values: [...countries.map((c) => c.code)],
    labels: [...countries.map((c) => c.label)],
    operations: [QueryOperation.Equal, QueryOperation.NotEqual]
  },
  {
    columnName: 'unit_amount',
    label: 'Unit amount',
    type: 'text',
    operations: NumericOperations
  },
  {
    columnName: 'interval',
    label: 'Interval',
    type: 'select',
    operations: [QueryOperation.Equal, QueryOperation.NotEqual],
    values: ['month', 'year']
  }
]

const PricesListPage = () => {
  const [addDialogShown, setAddDialogShown] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { filters, setFilters } = usePricesListControls()
  const { data: session } = useSession()
  const { data, loading: loadingPrices } = usePricesListQuery({
    skip: !session?.user
  })
  const prices = data?.prices
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

  const enableSyncPrices = !loadingPrices && !prices?.length
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
          <LoadingButton
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => setAddDialogShown(true)}
          >
            Add Price
          </LoadingButton>
          <LoadingButton
            startIcon={<Refresh />}
            variant="outlined"
            color="secondary"
            onClick={() => syncPrices()}
            loading={loading}
          >
            Sync Default Prices from Stripe
          </LoadingButton>
          <Typography>
            <Typography fontWeight={'bold'} component="span">
              Table Filters{' '}
            </Typography>
            {filters.length == 0
              ? 'None'
              : `${filters.length} total:` +
                filters.map(
                  (filter, i) =>
                    ` ${filter.columnName} ${filter.operation} ${filter.value}`
                )}
          </Typography>
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
      <Stack p={2}>
        <PricesList />
      </Stack>
    </CmsLayout>
  )
}

const PricesListWrapper = () => {
  return (
    <PricesListProvider>
      <PricesListPage />
    </PricesListProvider>
  )
}
export default PricesListWrapper
