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
import { InstitutionUserTypeStat } from 'graphql/types'
import { useRouter } from 'next/router'
import { useInstitutionTrafficOverTimeQuery } from 'graphql/queries/access.generated'
import dayjs from 'dayjs'

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

  const getFormat = (groupBy: string) => {
    switch (groupBy) {
      case 'day':
        return 'YYYY-MM-DD'
      case 'year':
        return 'YYYY'
      case 'month':
      default:
        return 'YYYY-MM'
    }
  }
  const array = data?.institutionTrafficOverTime
  if (!data || !array.length || loading || error) {
    return (
      <Card>
        <Box p={2}>
          <Typography color="text.secondary" gutterBottom variant="overline">
            Article Views Over Time
          </Typography>
          <CardContent>
            {loading ? (
              <Stack alignItems="center">
                <CircularProgress />
                <Typography>Loading</Typography>
              </Stack>
            ) : error ? (
              <Alert severity="error">{error.message}</Alert>
            ) : (
              <Alert severity="info">No Data</Alert>
            )}
          </CardContent>
        </Box>
      </Card>
    )
  }

  const first = start || array[0]?._id
  const last = end || array.at(-1)?._id

  const dataLength = (dayjs(last).diff(first, groupBy as any) || 1) + 1

  const format = getFormat(groupBy)

  const labels = new Array(dataLength).fill('x').map((x, index) => {
    return dayjs(first).add(index, groupBy).format(format)
  })
  const datasetData = new Array(dataLength).fill('x').map((x, index) => {
    const id = labels.at(index)
    const found = array.find((x) => x._id === id)

    return found?.count ?? 0
  })

  const color = `hsla(${~~(360 * Math.random())},80%,60%,0.7)`
  return (
    <Card>
      <Box p={2}>
        <Typography color="text.secondary" gutterBottom variant="overline">
          Article Views Over Time
        </Typography>
        <CardContent sx={{ height: 300, width: '100%' }}>
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
              labels,
              datasets: [
                {
                  data: datasetData,
                  label: 'Article Views',
                  backgroundColor: color,
                  borderColor: 'black',
                  tension: 0.4
                }
              ]
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
        </CardContent>
      </Box>
    </Card>
  )
}

export default TrafficOverTimeCard
