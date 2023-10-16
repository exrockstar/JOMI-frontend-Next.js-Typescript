import { FilterList } from '@mui/icons-material'
import {
  Alert,
  Badge,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import CmsLayout from 'components/cms/CmsLayout'
import OrdersList from 'components/cms/orders/list/OrdersList'
import { orderListColumnFilterOptions } from 'components/cms/orders/list/orderListColumnFilterOptions'
import {
  OrdersListProvider,
  useOrdersList
} from 'components/cms/orders/list/useOrdersList'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import TableFilters from 'components/common/TableFilters'
import { ColumnFilter } from 'graphql/types'
import { useState } from 'react'

const OrdersListPage = () => {
  const { loading, error, filters, setFilters } = useOrdersList()
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
          columnOptions={orderListColumnFilterOptions}
          filters={filters}
        />
      </Drawer>
      <Stack direction={'row'} justifyContent="space-between" p={2} pt={5}>
        <Typography variant="h4">Orders</Typography>
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
      <Stack px={2}>
        <TableFilters filters={filters} />
      </Stack>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" height="80vh">
          <CircularProgress />
        </Stack>
      ) : error ? (
        <Stack p={2}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Stack>
      ) : (
        <Stack p={2}>
          <OrdersList />
        </Stack>
      )}
    </CmsLayout>
  )
}
const OrdersListPageWrapper = () => {
  return (
    <OrdersListProvider>
      <OrdersListPage />
    </OrdersListProvider>
  )
}
export default OrdersListPageWrapper
