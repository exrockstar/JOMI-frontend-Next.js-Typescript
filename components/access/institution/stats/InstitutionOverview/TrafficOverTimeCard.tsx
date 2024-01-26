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
import { useState } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale, Tooltip, LinearScale, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useInstitutionTrafficOverTimeQuery } from 'graphql/queries/access.generated'
import { graphColors } from './getColors'
import useInstitutionAccessInput from './useInstitutionAccessInput'

Chart.register(LineElement, CategoryScale, LinearScale)

const TrafficOverTimeCard = () => {
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
  const chartData = data?.institutionTrafficOverTime

  return (
    <Card>
      <Box p={2}>
        <Typography variant="overline">Article Views Over Time</Typography>
        <Typography
          color="text.secondary"
          gutterBottom
          variant="caption"
          display="block"
        >
          Shows article views over the past period
        </Typography>
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
                id="traffic-over-time"
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
                  }
                }}
                plugins={[Tooltip]}
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

export default TrafficOverTimeCard
