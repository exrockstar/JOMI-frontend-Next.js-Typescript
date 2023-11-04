import {
  Card,
  Box,
  Typography,
  CardContent,
  Stack,
  CircularProgress,
  Alert,
  Button
} from '@mui/material'

import { useInstitutionTrafficBreakdownQuery } from 'graphql/queries/access.generated'
import { useRef } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { graphColors } from './getColors'
import useInstitutionAccessInput from './useInstitutionAccessInput'
import { Chart } from 'chart.js'
import { capitalize } from 'lodash'

type Props = {
  by: 'userType' | 'contentType'
  title: string
  description: string
  showHideAllButtons?: boolean
}
const ActivityBreakdownCard = ({
  by,
  title,
  description,
  showHideAllButtons
}: Props) => {
  const { endDate, startDate, filters, institutionId, globalFilters } =
    useInstitutionAccessInput()
  const { data, loading, error } = useInstitutionTrafficBreakdownQuery({
    variables: {
      input: {
        endDate,
        startDate,
        filters,
        institutionId,
        globalFilters
      }
    }
  })
  const ref = useRef<any>(null)
  const isByContentType = by === 'contentType'
  const chartData = isByContentType ? data?.byContentType : data?.byUserType
  const Component = isByContentType ? Bar : Doughnut
  return (
    <Card>
      <Box p={2}>
        <Typography variant="overline">{title}</Typography>
        <Typography
          color="text.secondary"
          gutterBottom
          variant="caption"
          display="block"
        >
          {description}
        </Typography>
        <CardContent sx={{ height: 500, width: '100%' }}>
          {loading && (
            <Stack alignItems="center">
              <CircularProgress />
              <Typography>Loading</Typography>
            </Stack>
          )}
          {error && <Alert severity="error">{error.message}</Alert>}
          {chartData && (
            <>
              {showHideAllButtons && (
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const chart_ref = ref.current as Chart
                      chartData.labels.map((item, i) => {
                        if (chart_ref?.getDataVisibility(i)) {
                          chart_ref?.toggleDataVisibility(i)
                        }
                      })
                      chart_ref?.update()
                    }}
                  >
                    Hide All
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const chart_ref = ref.current as Chart
                      chartData.labels.map((item, i) => {
                        if (!chart_ref?.getDataVisibility(i)) {
                          chart_ref?.toggleDataVisibility(i)
                        }
                      })
                      chart_ref?.update()
                    }}
                  >
                    Show All
                  </Button>
                </Box>
              )}
              <Component
                data={{
                  labels: chartData.labels.map((l) =>
                    l === 'anon' ? 'Anon' : l
                  ),
                  datasets: chartData.datasets.map((x, i) => {
                    const colors = graphColors.slice(0, chartData.labels.length)
                    return {
                      data: x.data,
                      label: x.label,
                      backgroundColor: colors,
                      tension: 0.4
                    }
                  })
                }}
                ref={ref}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  radius: '90%',
                  plugins: {
                    legend: {
                      display: !isByContentType,
                      onClick(e, legendItem, legend) {
                        const allVisible = this.legendItems.every(
                          (i) => !i.hidden
                        )
                        const legendIndex = this.legendItems.indexOf(legendItem)
                        if (allVisible) {
                          this.legendItems.forEach((item, i) => {
                            if (item !== legendItem) {
                              this.chart.toggleDataVisibility(i)
                            }
                          })
                        } else {
                          this.legendItems.forEach((item, i) => {
                            if (i === legendIndex) {
                              this.chart.toggleDataVisibility(i)
                            }
                          })
                        }
                        this.chart.update()
                      }
                    }
                  }
                }}
              />
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

export default ActivityBreakdownCard
