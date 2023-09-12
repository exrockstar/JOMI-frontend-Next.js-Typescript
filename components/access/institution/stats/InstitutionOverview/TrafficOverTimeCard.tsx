import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale, Tooltip, LinearScale, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useRouter } from 'next/router'
import { useInstitutionTrafficOverTimeQuery } from 'graphql/queries/access.generated'
import { indigo, green, rose } from 'tailwindcss/colors'

Chart.register(LineElement, CategoryScale, LinearScale, Tooltip)

const TrafficOverTimeCard = () => {
  const router = useRouter()
  const start = router.query.start as string | null
  const end = router.query.end as string | null
  const instId = router.query.id as string | null
  const [groupBy, setGroupBy] = useState('month') //day ,month, year
  const { data, loading, error } = useInstitutionTrafficOverTimeQuery({
    variables: {
      input: {
        startDate: start,
        endDate: end,
        institutionId: instId
      },
      groupBy: groupBy
    }
  })
  const chartData = data?.institutionTrafficOverTime

  const _colors = [indigo[400], green[400], rose[400]]
  return (
    <Card>
      <Box p={2}>
        <Typography variant="overline">Activity Over Time</Typography>
        <Typography
          color="text.secondary"
          gutterBottom
          variant="caption"
          display="block"
        >
          Shows activity over the past period
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
                    const color = _colors[i]
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
