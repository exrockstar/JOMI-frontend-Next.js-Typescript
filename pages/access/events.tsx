import { Stack, Drawer } from '@mui/material'
import AccessLayout from 'components/access/AccessLayout'
import EventsFilterDrawer from 'components/access/events/EventsFilterDrawer'
import EventsHeader from 'components/access/events/EventsHeader'
import EventsList from 'components/access/events/EventsList'
import { EventsAccessListProvider } from 'components/access/events/useEventsAccessList'
import React, { useState } from 'react'

const AccessEventsPage = () => {
  return (
    <EventsAccessListProvider>
      <AccessLayout>
        <EventsFilterDrawer />
        <Stack p={2} pt={2}>
          <EventsHeader />
          <EventsList />
        </Stack>
      </AccessLayout>
    </EventsAccessListProvider>
  )
}

export default AccessEventsPage
