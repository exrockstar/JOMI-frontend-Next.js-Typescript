import { Box, Card, CardContent, Typography } from '@mui/material'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  LinearScale,
  BarElement
} from 'chart.js'
import React, { useMemo } from 'react'
import { InstitutionUserTypeStat } from 'graphql/types'
import { graphColors } from './getColors'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

type ViewData = {
  key: string
  views: number
}

type Props = {
  user_types: InstitutionUserTypeStat[]
  title: string
}

const UserTypesCard = ({ user_types, title }: Props) => {
  const data = {
    labels: user_types.map((v) => v.user_type),
    datasets: [
      {
        data: user_types.map((v, i) => v.count),
        backgroundColor: user_types.map((u, i) => graphColors[i]),
        barPercentage: 5,
        barThickness: 50,
        maxBarThickness: 25,
        minBarLength: 2
      }
    ]
  }

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h5">User Types (Active Users)</Typography>
        <CardContent sx={{ height: 300 }}>
          <Bar
            data={data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: title
                },
                legend: {
                  display: false
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    stepSize: 200
                  }
                }
              }
            }}
          />
        </CardContent>
      </Box>
    </Card>
  )
}

export default React.memo(UserTypesCard)
