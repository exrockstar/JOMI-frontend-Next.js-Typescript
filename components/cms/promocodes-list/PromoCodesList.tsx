import { Add, FilterList } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Badge,
  Box,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Tab,
  Tabs
} from '@mui/material'
import Button from '@mui/material/Button'
import SearchInput from 'components/access/SearchInput'
import CmsLayout from 'components/cms/CmsLayout'
import { promoCodeColumnOptions } from 'components/cms/promocodes-list/promoCodeColumnOptions'
import StripePromoCodesList from 'components/cms/promocodes-list/StripePromoCodesList'
import {
  StripePromoCodesListProvider,
  useStripePromoCodesList
} from 'components/cms/promocodes-list/useStripePromoCodesList'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import { ColumnFilter } from 'graphql/types'
import NextLink from 'next/link'
import { useState } from 'react'

const PromoCodesList = () => {
  const { searchTerm, setSearchTerm, filters, setFilters, setPage } =
    useStripePromoCodesList()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  }
  
  return (
    <div>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={promoCodeColumnOptions}
          filters={filters}
        />
      </Drawer>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        p={2}
        pt={0}
        alignItems={'center'}
      >
        <Stack display="flex" direction={'row'} spacing={2}>
          <Button
            startIcon={<Add />}
            variant="contained"
            color='primary'
            href={'/cms/promocodes-list/v6/create'}
            LinkComponent={NextLink}
          >
            Create Promo code
          </Button>
        </Stack>
        <Stack px={2} display="flex" gap={2} direction="row">
          <SearchInput
            onSubmit={setSearchTerm}
            value={searchTerm}
            placeholder="Search promo code... e.g., 35OFF"
          />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Tooltip title="Filter list">
            <Badge
              badgeContent={filters?.length}
              color="secondary"
              invisible={!filters?.length}
              sx={{
                '& .MuiBadge-badge': {
                  right: 8,
                  top: 12
                }
              }}
            >
              <IconButton
                onClick={() => {
                  setDrawerOpen(!drawerOpen)
                }}
              >
                <FilterList />
              </IconButton>
            </Badge>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack p={2}>
        <StripePromoCodesList />
      </Stack>
    </div>
  )
}

const PromoCodesListWrapper = () => {
  return (
    <StripePromoCodesListProvider>
      <PromoCodesList></PromoCodesList>
    </StripePromoCodesListProvider>
  )
}
export default PromoCodesListWrapper
