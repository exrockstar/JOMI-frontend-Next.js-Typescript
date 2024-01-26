import Chart from 'chart.js/auto'
import { ChartData } from 'graphql/types'
import { CategoryScale, Tooltip, LinearScale, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import React from 'react'
import { Alert, Box, Typography } from '@mui/material'
import colors from 'tailwindcss/colors'

Chart.register(LinearScale)
type Props = {
  data: ChartData
  institutionId: string
}
const ArticleViewsOverTime = ({ data, institutionId }: Props) => {
  if (!data.datasets[0]?.data?.length) {
    return <Alert severity="info">No Data </Alert>
  }

  return (
    <Box sx={{ maxHeight: 100 }}>
      <Line
        id={institutionId}
        key={institutionId}
        data={{
          labels: data.labels,
          datasets:
            data.datasets.map((x) => {
              return {
                data: x.data,
                backgroundColor: colors.indigo['600'],
                borderColor: colors.indigo['600'],
                borderWidth: 4,
                tension: 0.4
              }
            }) ?? []
        }}
        options={{
          plugins: {
            legend: {
              display: false
            }
          },
          elements: {
            point: {
              radius: 1
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }}
        plugins={[Tooltip]}
      ></Line>
    </Box>
  )
}

export default ArticleViewsOverTime
