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
import TagOrderResultsToCRM from 'components/cms/orders/list/TagOrderResultsToCRM'
import { useOrdersListColumnOptions } from 'components/cms/orders/list/orderListColumnFilterOptions'
import {
  OrdersListProvider,
  useOrdersList
} from 'components/cms/orders/list/useOrdersList'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'
import TableFilters from 'components/common/TableFilters'
import { ColumnFilter } from 'graphql/types'
import { useState } from 'react'
import { useOrderListLazyQuery } from 'graphql/cms-queries/order-list.generated'
import dayjs from 'dayjs'
import useCsvDownload from 'components/cms/useCsvDownload'
import { LoadingButton } from '@mui/lab'
import DownloadIcon from '@mui/icons-material/Download'
import DownloadCsvButton from 'components/common/DownloadCsvButton'

const OrdersListPage = () => {
  const { loading, error, filters, setFilters, sortBy, sortOrder, count } =
    useOrdersList()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const colummnOptions = useOrdersListColumnOptions()
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  }

  const [fetchFunc] = useOrderListLazyQuery({ fetchPolicy: 'no-cache' })

  const getMainData = (data) => {
    return data?.output.orders ?? []
  }

  const convertFunc = (order) => {
    return {
      'DATABASE ID': order._id,
      'CREATE DATE': dayjs(order.created).format('YYYY-MM-DD hh:mm:ss'),
      'START DATE': order.start
        ? dayjs(order.start).format('YYYY-MM-DD hh:mm:ss')
        : 'N/A',
      'END DATE': order.end
        ? dayjs(order.end).format('YYYY-MM-DD hh:mm:ss')
        : 'N/A',
      'ORDER STATUS': order.status,
      'ORDER TYPE': order.type,
      AMOUNT: order.amount,
      RENEWALS: order.renewals,
      INSTITUTION: order.institutionObject
        ? order?.institutionObject?.name
        : order.institution
        ? order.institution
        : 'N/A',
      'CUSTOM INSTITUTION NAME': order.customInstitutionName,
      'USER EMAIL': order.user ? order.user?.email : 'N/A',
      'USER TYPE': order.user?.user_type ?? '',
      'USER SPECIALTY': order.user?.specialty ?? '',
      'PROMO CODE': order.promoCode ?? 'N/A',
      DESCRIPTION: order.description ?? 'N/A',
      'INTERNAL NOTES': order.notes ?? 'N/A',
      'REQUIRE LOGIN': order.require_login,
      'PAYMENT STATUS': order.payment_status
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
    collection: 'order',
    filters,
    sort_by: sortBy,
    sort_order: sortOrder
  })

  return (
    <CmsLayout>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterDrawer
          onSubmit={onSubmitFilter}
          columnOptions={colummnOptions}
          filters={filters}
        />
      </Drawer>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        p={2}
        pt={5}
        alignItems={'flex-end'}
      >
        <Typography variant="h4">Orders</Typography>
        <Stack direction={'row'} spacing={2}>
          <DownloadCsvButton
            onClick={downloadCsv}
            loading={csvLoading}
            csvProgress={csvProgress}
          />
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
      <Stack px={2}>
        <TagOrderResultsToCRM />
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
