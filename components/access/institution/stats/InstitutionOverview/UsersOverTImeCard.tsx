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
import { indigo, green, rose, zinc } from 'tailwindcss/colors'
import useInstitutionAccessInput from './useInstitutionAccessInput'

const colors = [indigo[500], indigo[300]]
Chart.register(LineElement, CategoryScale, LinearScale, Tooltip)

const UsersOverTimeCard = () => {
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
  const chartData = data?.institutionUsersOverTime

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
                id="UsersOverTimeCard"
                key={new Date().getTime()}
                data={{
                  labels: chartData.labels,
                  datasets: chartData.datasets.map((x, i) => {
                    const color = colors[i]
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

export default UsersOverTimeCard
