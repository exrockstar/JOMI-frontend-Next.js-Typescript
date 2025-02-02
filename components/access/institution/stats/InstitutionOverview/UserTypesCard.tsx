import { Box, Card, CardContent, Typography } from '@mui/material'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  LinearScale,
  BarElement,
  LineElement
} from 'chart.js'
import React, { useMemo } from 'react'
import { InstitutionUserTypeStat } from 'graphql/types'
import { graphColors } from './getColors'
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale)
type Props = {
  user_types: InstitutionUserTypeStat[]
  title: string
}

const UserTypesCard = ({ user_types, title }: Props) => {
  const data = {
    labels: user_types.map((v) =>
      v.user_type === 'anon' ? 'Anon' : v.user_type
    ),
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
                },
                datalabels: {
                  display: true,
                  anchor: 'end',
                  align: 'top'
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    stepSize: 250
                  }
                }
              }
            }}
            plugins={[Tooltip, ChartDataLabels]}
          />
        </CardContent>
      </Box>
    </Card>
  )
}

export default React.memo(UserTypesCard)
