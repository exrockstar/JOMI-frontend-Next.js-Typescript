import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { InstitutionPartsFragment } from 'graphql/cms-queries/InstitutionParts.generated'
import { useInstutionAccessOverviewQuery } from 'graphql/queries/access.generated'
import AliasesCard from './AliasesCard'
import DomainsCard from './DomainsCard'
import StatCard from './StatCard'
import UserTypesCard from './UserTypesCard'
import { InfoOutlined } from '@mui/icons-material'
import TrafficOverTimeCard from './TrafficOverTimeCard'
import TrafficOverTimeByUserType from './TrafficOverTimeByUserType'
import ActivityBreakdownCard from './ActivityBreakdownCard'
import useInstitutionAccessInput from './useInstitutionAccessInput'
import BlocksOverTimeCard from './BlocksOverTimeCard'
import UsersOverTimeCard from './UsersOverTImeCard'
import UsersOverTimeByUserType from './UsersOverTimeByUserType'
import AdminControlPanel from './AdminControlPanel'

type Props = {
  institutionId: string
  institution: InstitutionPartsFragment
}

const InstituitonOverviewStats = ({ institutionId, institution }: Props) => {
  const { endDate, startDate, filters, setFilters, globalFilters } =
    useInstitutionAccessInput()

  const { data, loading, error } = useInstutionAccessOverviewQuery({
    variables: {
      input: {
        institutionId,
        endDate,
        startDate,
        filters,
        globalFilters
      }
    },
    skip: !institutionId
  })

  const accessStats = data?.institutionAccessStats

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="baseline" gap={1}>
          <Typography color="text.primary" variant="h3">
            Institution Statistics
          </Typography>
          <Tooltip title="The information displayed is based on the latest available data. You may filter through the period selector on the right.">
            <InfoOutlined color="info" />
          </Tooltip>
        </Box>
      </Stack>
      <AdminControlPanel />
      {loading && (
        <Stack py={10} alignItems="center">
          <CircularProgress />
          <Typography>Loading</Typography>
        </Stack>
      )}
      {error && (
        <Alert sx={{ my: 10 }} severity="error">
          <Typography>{error.message}</Typography>
        </Alert>
      )}
      {data && (
        <>
          <Grid container gap={2}>
            <StatCard
              label="Newly Registered Users"
              value={accessStats.users}
            />
            <StatCard label="Active Users" value={accessStats.activeUsers} />

            <StatCard
              label="Article Views by User"
              value={accessStats.articleViewsByUser}
            />
            <StatCard label="Total Logins" value={accessStats.totalLogins} />
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container gap={2}>
            <StatCard
              label="Anonymous Users"
              value={accessStats.anonUserCount}
            />
            <StatCard
              label="Anonymous Article Views"
              value={accessStats.anonymousArticleViews}
            />
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container gap={2}>
            <StatCard
              label="Total Article Views"
              value={accessStats.totalArticleViews}
            />
          </Grid>

          <Card sx={{ my: 2, p: 2 }}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
              alignItems={'center'}
              display="flex"
              gap={1}
            >
              <InfoOutlined color="info" />
              Guide
            </Typography>
            <Box>
              <Typography variant="caption" color="text.secondary">
                <b>Anon</b> - traffic that is identified via IP addresses,
                however, the users did not log in.
              </Typography>
            </Box>
          </Card>
        </>
      )}
      {data && institution && (
        <Grid container my={4}>
          <Grid item xs={12} md={6}>
            <Stack gap={2} mr={2}>
              <AliasesCard aliases={institution.aliases} />
              <DomainsCard domains={institution.domains} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <UserTypesCard
              user_types={data?.institutionUserTypesStats}
              title="User Types"
            />
          </Grid>
        </Grid>
      )}
      {data && !!institution?.accessSettings?.displayTrafficGraph && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TrafficOverTimeCard />
          </Grid>
          <Grid item xs={12}>
            <UsersOverTimeCard />
          </Grid>
          <Grid item xs={12}>
            <BlocksOverTimeCard />
          </Grid>
          <Grid item xs={12}>
            <TrafficOverTimeByUserType />
          </Grid>
          <Grid item xs={12}>
            <UsersOverTimeByUserType />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActivityBreakdownCard
              by="userType"
              title="Activity Breakdown By User Type"
              description="Shows activity breakdown by user type over the past period"
              showHideAllButtons
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActivityBreakdownCard
              by="contentType"
              title="Activity Breakdown By Content Type"
              description="Shows activity breakdown by content type over the past period"
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default InstituitonOverviewStats
