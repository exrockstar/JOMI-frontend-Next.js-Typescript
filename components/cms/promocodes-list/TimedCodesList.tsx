import { Add, FilterList } from '@mui/icons-material'
import {
  Alert,
  Badge,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import SearchInput from 'components/access/SearchInput'
import PromoCodesList from 'components/cms/promocodes/list/PromoCodesList'
import {
  PromoCodesListProvider,
  usePromoCodesList
} from 'components/cms/promocodes/list/usePromoCodesList'
import TableFilters from 'components/common/TableFilters'
import { ColumnFilter } from 'graphql/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { usePromoCodeListColumnFilterOptions } from 'components/cms/promocodes/list/promocodeListColumnFilterOptions'
import FilterDrawer from 'components/common/FilterDrawer/FilterDrawer'

const TimedCodesList = () => {
  const { loading, error, filters, setFilters, searchTerm, setSearchTerm, setIsSubScription } =
    usePromoCodesList()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const colummnOptions = usePromoCodeListColumnFilterOptions()
  const onSubmitFilter = (filters: ColumnFilter[]) => {
    if (!filters) return

    setFilters(filters)
    setDrawerOpen(!drawerOpen)
  } 

  useEffect(() => {
    setIsSubScription(false);
  }, []);

  return (
    <div>
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
      <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} p={2} pt={0}>
        <Stack direction={'row'} spacing={2}>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => {
              router.push('/cms/promocodes-list/timed/create')
            }}
          >
            Add Timed Code
          </Button>
        </Stack>

        <Stack px={2}>
          <TableFilters filters={filters} />
        </Stack>
        <Stack px={2} display="flex" gap={2} direction="row">
          <SearchInput value={searchTerm} onSubmit={setSearchTerm} />
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
          <PromoCodesList />
        </Stack>
      )}
    </div>
  )
}
const PromoCodesListPageWrapper = () => {
  return (
    <PromoCodesListProvider>
      <TimedCodesList />
    </PromoCodesListProvider>
  )
}
export default PromoCodesListPageWrapper
