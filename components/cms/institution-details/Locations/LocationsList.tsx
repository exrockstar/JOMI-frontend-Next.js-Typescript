import { Add, Delete, Edit } from '@mui/icons-material'
import { Button, Tabs, Tab, useMediaQuery, Stack, Alert } from '@mui/material'
import { Location } from 'graphql/types'
import TabPanel, { a11yProps } from 'components/common/TabPanel'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import {
  useCreateLocationMutation,
  useDeleteLocationMutation
} from 'graphql/cms-queries/location-management.generated'
import { useSnackbar } from 'notistack'
import {
  InstitutionByIdDocument,
  InstitutionByIdQuery
} from 'graphql/cms-queries/institutions-list.generated'
import EditLocationModal from './EditLocationModal'
import OrdersList from '../Orders/OrdersList'
import IpRangesList from '../IpRanges/IpRangesList'
import { LoadingButton } from '@mui/lab'

type Props = {
  locations: Location[]
}
const LocationList = ({ locations }: Props) => {
  const router = useRouter()
  const [institutionId] = router.query.id as string[]
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const tabs = locations.map((location) => location._id)

  const [value, setValue] = useState(tabs[0])
  const selected = locations.find((loc) => loc._id === value)
  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))
  const { enqueueSnackbar } = useSnackbar()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const query = {
    query: InstitutionByIdDocument,
    variables: { id: institutionId }
  }

  const [deleteLocation, { client, loading: deletingLocation }] =
    useDeleteLocationMutation({
      onCompleted(result) {
        const deleted = result.deleteLocation
        client.cache.updateQuery(query, (current: InstitutionByIdQuery) => {
          console.log(current)
          return {
            institution: {
              ...current.institution,
              locations: current.institution?.locations.filter(
                (l) => l._id !== deleted?._id
              )
            }
          }
        })

        enqueueSnackbar(`Successfully deleted location: ${deleted?.title}`, {
          variant: 'success'
        })

        setValue(tabs[0])
        setConfirmDialogOpen(false)
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
        setConfirmDialogOpen(false)
      }
    })

  const [createLocation, { loading: addingLocation }] =
    useCreateLocationMutation({
      onCompleted(result) {
        const created = result.createLocation
        enqueueSnackbar(`Successfully added location: ${created.title}`, {
          variant: 'success'
        })
        client.cache.updateQuery(query, (current: InstitutionByIdQuery) => {
          const institution = { ...current.institution }
          institution.locations = [...institution.locations, created]
          return {
            institution
          }
        })
        setConfirmDialogOpen(false)
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
        setConfirmDialogOpen(false)
      }
    })

  const cancelDelete = () => {
    setConfirmDialogOpen(false)
  }

  const handleDelete = () => {
    deleteLocation({
      variables: {
        id: value
      }
    })
  }

  const startAddLocation = () => {
    createLocation({
      variables: {
        input: {
          institution: institutionId,
          title: 'New Location'
        }
      }
    })
  }

  const startDeleteLocation = () => {
    if (!selected) {
      enqueueSnackbar('Please select a location!', { variant: 'error' })
      return
    }
    setConfirmDialogOpen(true)
  }

  const startEditLocation = () => {
    setEditDialogOpen(true)
  }

  return (
    <>
      <ConfirmationDialog
        key={'confirm-' + selected?._id}
        open={confirmDialogOpen}
        dialogTitle={'Confirm Delete Location'}
        onClose={() => cancelDelete()}
        onComplete={handleDelete}
        onCancel={cancelDelete}
        loading={deletingLocation}
      >
        Are you sure you want to delete <strong> {selected?.title} </strong>?
        <Alert severity="warning" sx={{ my: 2 }}>
          This will delete all orders and ip ranges associated with this
          location.
        </Alert>
      </ConfirmationDialog>
      <EditLocationModal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onCompleted={() => setEditDialogOpen(false)}
        location={selected}
        key={new Date().getTime()}
      />
      <Stack my={2} spacing={2} direction="row">
        <LoadingButton
          variant="contained"
          onClick={() => startAddLocation()}
          startIcon={<Add />}
          loading={addingLocation}
        >
          Add Location
        </LoadingButton>
        <Button
          variant="outlined"
          onClick={() => startEditLocation()}
          startIcon={<Edit />}
        >
          Update Location
        </Button>
        <LoadingButton
          variant="outlined"
          color="error"
          onClick={() => startDeleteLocation()}
          startIcon={<Delete />}
          loading={deletingLocation}
        >
          Delete Location
        </LoadingButton>
      </Stack>
      <Tabs
        value={value}
        textColor="secondary"
        indicatorColor="secondary"
        onChange={handleChange}
        aria-label="basic tabs example"
        orientation={isSmallDevice ? 'vertical' : 'horizontal'}
        variant="scrollable"
      >
        {locations.map((location) => {
          return (
            <Tab
              key={location._id}
              label={location.title}
              value={location._id}
              {...a11yProps('location-tab', location._id)}
            />
          )
        })}
      </Tabs>
      {locations.map((location) => {
        return (
          <TabPanel
            key={location._id}
            id={`location-tab-panel`}
            value={value}
            index={location._id}
          >
            <OrdersList
              orders={location.orders}
              locationId={location._id}
              institutionId={institutionId}
            />
            <IpRangesList
              ip_ranges={location.ip_ranges}
              locationId={location._id}
              institutionId={institutionId}
            />
          </TabPanel>
        )
      })}
    </>
  )
}

export default LocationList
