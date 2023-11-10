import {
  Alert,
  Box,
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
import { Line } from 'react-chartjs-2'
import { graphColors } from './getColors'
import useInstitutionAccessInput from './useInstitutionAccessInput'
import { useInstitutionTrafficOverTimeQuery } from 'graphql/queries/access.generated'

Chart.register(LineElement, CategoryScale, LinearScale, Tooltip)

const BlocksOverTimeCard = () => {
  const { endDate, startDate, filters, institutionId, globalFilters } =
    useInstitutionAccessInput()
  const [groupBy, setGroupBy] = useState('month') //day ,month, year
  const { data, loading, error } = useInstitutionTrafficOverTimeQuery({
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
  const chartData = data?.institutionBlocksOverTime
  return (
    <Card>
      <Box p={2}>
        <Typography variant="overline">Users Blocked Over Time</Typography>

        <Box>
          <Typography variant="caption" color="text.secondary">
            <b>Not Subscribed</b> - Users who were logged in, had restricted
            access because they were not subscribed. Please note that data prior
            to 8/14/2023 is not available.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: 'block' }}
            color="text.secondary"
          >
            <b>Logged-In But Blocked Users</b> - Users who were logged in, had
            restricted access because their email was not verified.Please note
            that data prior to 8/14/2023 did not include the reason who why
            access was denied.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: 'block' }}
            color="text.secondary"
          >
            <b>Login Required</b> - Users who were not logged in, had restricted
            access because their institution requires them to be logged into an
            account. Please note that data prior to 8/14/2023 is not available.
          </Typography>
          <Typography></Typography>
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

              <Line
                id="blocks-over-time"
                key={new Date().getTime()}
                data={{
                  labels: chartData.labels,
                  datasets: chartData.datasets.map((x, i) => {
                    const color = graphColors[i]
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
                      beginAtZero: true
                    }
                  },
                  plugins: {
                    tooltip: {
                      mode: 'x'
                    },
                    legend: {
                      display: true,
                      onClick(e, legendItem, legend) {
                        console.log(legendItem)
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
              ></Line>
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

export default BlocksOverTimeCard
