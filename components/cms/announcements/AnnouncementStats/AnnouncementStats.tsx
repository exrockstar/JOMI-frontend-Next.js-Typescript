import { Group, Public, Visibility } from '@mui/icons-material'
import {
  Stack,
  CircularProgress,
  Typography,
  Container,
  Grid
} from '@mui/material'
import { useAnnouncementQuery } from 'graphql/queries/announcements.generated'
import { useSession } from 'next-auth/react'
import React from 'react'

import ViewChart from './InstitutionChart'
import ViewsCard from './ViewsCard'
type Props = {
  _id: string
}

const AnnouncementStats = ({ _id }: Props) => {
  const { data: session } = useSession()
  const { data: announcementData, loading: loadingAnnouncement } =
    useAnnouncementQuery({
      variables: {
        _id
      },
      skip: !_id || !session
    })

  const announcement = announcementData?.announcement
  return (
    <>
      {!announcement ? (
        <Stack py={10} alignItems="center">
          <CircularProgress />
          <Typography color="textSecondary">Loading...</Typography>
        </Stack>
      ) : (
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
              <ViewsCard
                title="total views"
                views={announcement.views}
                bgcolor="error.main"
                Icon={Visibility}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <ViewsCard
                title="Unique Views (By IP)"
                views={announcement.unique_views}
                bgcolor="warning.main"
                Icon={Public}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <ViewsCard
                title="User Views (BY Non-Admin User)"
                views={announcement.user_views.total}
                bgcolor="info.main"
                Icon={Group}
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <ViewChart
                title="Views by country"
                views={announcement.user_views.by_country}
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <ViewChart
                title="Views by user type"
                views={announcement.user_views.by_user_type}
              />
            </Grid>

            <Grid item lg={3} sm={6} xs={12}>
              <ViewChart
                title="Views by institution"
                views={announcement.user_views.by_institution}
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}></Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default AnnouncementStats
