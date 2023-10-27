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
import { useRef, useState } from 'react'
import {
  CategoryScale,
  Tooltip,
  LinearScale,
  LineElement,
  Chart
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useInstitutionTrafficOverTimeByUserTypeQuery } from 'graphql/queries/access.generated'
import { graphColors } from './getColors'
import useInstitutionAccessInput from './useInstitutionAccessInput'
Chart.register(LineElement, CategoryScale, LinearScale, Tooltip)

const TrafficOverTimeByUserType = () => {
  const { endDate, startDate, filters, institutionId, globalFilters } =
    useInstitutionAccessInput()
  const [groupBy, setGroupBy] = useState('month') //day ,month, year
  const ref = useRef<any>(null)
  const { data, loading, error } = useInstitutionTrafficOverTimeByUserTypeQuery(
    {
      variables: {
        input: {
          startDate,
          endDate,
          institutionId,
          filters,
          globalFilters
        },
        groupBy: groupBy
      }
    }
  )
  const output = data?.output

  return (
    <Card>
      <Box p={2}>
        <Typography variant="overline">Activity By User Type</Typography>
        <Typography
          color="text.secondary"
          gutterBottom
          variant="caption"
          display="block"
        >
          Shows activity by user type over the past period
        </Typography>
        <CardContent sx={{ height: 300, width: '100%' }}>
          {loading && (
            <Stack alignItems="center">
              <CircularProgress />
              <Typography>Loading</Typography>
            </Stack>
          )}
          {error && <Alert severity="error">{error.message}</Alert>}
          {output && (
            <>
              <Box
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent={'flex-end'}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    const chart_ref = ref.current as Chart
                    if (chart_ref) {
                      output.labels.map((item, i) => {
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
                  onClick={() => {
                    const chart_ref = ref.current as Chart
                    if (chart_ref) {
                      output.labels.map((item, i) => {
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

              <Line
                id="traffic-over-time"
                data={{
                  labels: output.labels,
                  datasets: output.datasets.map((x, i) => {
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
                ref={ref}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
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
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              ></Line>
            </>
          )}
          {!loading && !error && !output && (
            <Alert severity="info">No Data</Alert>
          )}
        </CardContent>
      </Box>
    </Card>
  )
}

export default TrafficOverTimeByUserType
