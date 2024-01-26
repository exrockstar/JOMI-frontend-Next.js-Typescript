import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import React, { useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale, Tooltip, LinearScale, LineElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import {
  useInstitutionTrafficOverTimeQuery,
  useInstitutionUsersOverTimeQuery
} from 'graphql/queries/access.generated'
import { stone, green, rose, amber } from 'tailwindcss/colors'
import useInstitutionAccessInput from './useInstitutionAccessInput'

Chart.register(LineElement, CategoryScale, LinearScale)
const colors = [
  amber[500],
  green[500],
  green[700],
  rose[300],
  rose[500],
  rose[700],
  rose[900]
]
const UsersOverTimeCard = () => {
  const { endDate, startDate, filters, institutionId, globalFilters } =
    useInstitutionAccessInput()
  const [groupBy, setGroupBy] = useState('month') //day ,month, year
  const { data, loading, error } = useInstitutionUsersOverTimeQuery({
    variables: {
      input: {
        endDate,
        startDate,
        filters,
        globalFilters,
        institutionId
      },
      groupBy: groupBy
    }
  })
  const chartData = data?.institutionUsersOverTime
  const ref = useRef<any>(null)
  return (
    <Card>
      <Box p={2}>
        <Typography variant="overline">Users Over Time</Typography>
        <Typography
          color="text.secondary"
          gutterBottom
          variant="caption"
          display="block"
        >
          Shows the number of users per {groupBy} including anonymous users.
        </Typography>
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            <b>Trial/Special Access</b> - Users who have trial/free/admin
            access.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            <b>Logged in, No subscription</b> - Users who were logged in, had
            restricted access because they were not subscribed. Prior to
            8/18/2023, this could include email unverified, expired
            subscription, or no institutional subscription.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: 'block' }}
            color="text.secondary"
          >
            <b>Logged-In, Email Unverified</b> - Users who were logged in, had
            restricted access because their email was not verified. Please note
            that data prior to 8/18/2023 did not include the reason who why
            access was denied.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: 'block' }}
            color="text.secondary"
          >
            <b>Not Logged In, No subscription</b> - Users who were not logged
            in, had restricted access because institution does not have a
            subscription or it expired.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: 'block' }}
            color="text.secondary"
          >
            <b>Not Logged In, Login Required</b> - Users who were not logged in,
            had restricted access because their institution requires them to be
            logged into an account. Please note that data prior to 8/18/2023 is
            not available, and is included in{' '}
            {`"Not Logged In, No Subscription"`}.
          </Typography>
        </Box>
        <CardContent sx={{ height: 300, width: '100%' }}>
          {loading && (
            <Stack alignItems="center">
              <CircularProgress />
              <Typography>Loading</Typography>
            </Stack>
          )}
          {error && <Alert severity="error">{error.message}</Alert>}
          {chartData && (
            <>
              <Box
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent={'flex-end'}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    const chart_ref = ref.current as Chart
                    if (chart_ref) {
                      chartData.datasets.map((item, i) => {
                        chart_ref.getDatasetMeta(i).hidden = true
                      })
                      chart_ref?.update()
                    } else {
                      console.log(chart_ref)
                    }
                  }}
                >
                  Hide All
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    const chart_ref = ref.current as Chart
                    if (chart_ref) {
                      chartData.datasets.map((item, i) => {
                        chart_ref.getDatasetMeta(i).hidden = false
                      })
                      chart_ref?.update()
                    } else {
                      console.log(chart_ref)
                    }
                  }}
                >
                  Show All
                </Button>
                <Typography variant="body2" fontWeight="bold">
                  Group By
                </Typography>
                <Select
                  sx={{ width: 300 }}
                  size="small"
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                >
                  <MenuItem value="day">Day</MenuItem>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                </Select>
              </Box>

              <Bar
                id="UsersOverTimeCard"
                key={new Date().getTime()}
                ref={ref}
                data={{
                  labels: chartData.labels,
                  datasets: chartData.datasets.map((x, i) => {
                    const color = colors[i]
                    console.log(color)
                    return {
                      data: x.data,
                      label: x.label,
                      backgroundColor: color,
                      borderColor: color,
                      tension: 0.4
                    }
                  })
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      stacked: true,
                      offset: true
                    },
                    x: {
                      stacked: true
                    }
                  },
                  plugins: {
                    tooltip: {
                      mode: 'x'
                    },
                    legend: {
                      onClick(e, legendItem) {
                        const allVisible = this.legendItems.every(
                          (i) => !i.hidden
                        )
                        if (allVisible) {
                          this.legendItems.forEach((item, i) => {
                            if (item !== legendItem) {
                              this.chart.getDatasetMeta(i).hidden =
                                !this.chart.getDatasetMeta(i).hidden
                            }
                          })
                        } else {
                          this.legendItems.forEach((item, i) => {
                            if (i === legendItem.datasetIndex) {
                              this.chart.getDatasetMeta(i).hidden =
                                !this.chart.getDatasetMeta(i).hidden
                            }
                          })
                        }
                        this.chart.update()
                      }
                    }
                  }
                }}
                plugins={[Tooltip]}
              ></Bar>
            </>
          )}
          {!loading && !error && !chartData && (
            <Alert severity="info">No Data</Alert>
          )}
        </CardContent>
      </Box>
    </Card>
  )
}

export default UsersOverTimeCard
