import { Add, FilterList } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Badge,
  Box,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography
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
const PromoCodesListPage = () => {
  const { searchTerm, setSearchTerm, filters, setFilters, setPage } =
    useStripePromoCodesList()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  }
  return (
    <CmsLayout>
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
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
        >
          <Typography variant="h4">Promo Codes</Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            color="primary"
            href={'/cms/promocodes-list/create'}
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
        <Box>
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
        </Box>
      </Stack>

      <Stack p={2}>
        <StripePromoCodesList />
      </Stack>
    </CmsLayout>
  )
}

const PromoCodesListWrapper = () => {
  return (
    <StripePromoCodesListProvider>
      <PromoCodesListPage></PromoCodesListPage>
    </StripePromoCodesListProvider>
  )
}
export default PromoCodesListWrapper
