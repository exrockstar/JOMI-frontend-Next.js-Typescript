import dayjs from 'dayjs'
import Chart from 'chart.js/auto'
import { InstitutionAccessTraffic } from 'graphql/types'
import { CategoryScale, Tooltip, LinearScale, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
Chart.register(LineElement, CategoryScale, LinearScale, Tooltip)
import React from 'react'
import { Box } from '@mui/material'
import colors from 'tailwindcss/colors'
type Props = {
  data: InstitutionAccessTraffic[]
  institutionId: string
}
const ArticleViewsOverTime = ({ data, institutionId }: Props) => {
  if (!data) {
    return null
  }

  const first = data[0]?._id
  const last = data.at(-1)?._id

  const dataLength = (dayjs(last).diff(first, 'month') || 1) + 1
  const format = 'YYYY-MM'
  const labels = new Array(dataLength).fill('x').map((x, index) => {
    return dayjs(first).add(index, 'month').format(format)
  })
  const datasetData = new Array(dataLength).fill('x').map((x, index) => {
    const id = labels.at(index)
    const found = data.find((x) => x._id === id)

    return found?.count ?? 0
  })
  return (
    <Box sx={{ maxHeight: 100 }}>
      <Line
        id={institutionId}
        key={institutionId}
        data={{
          labels: labels,
          datasets: [
            {
              data: datasetData,
              backgroundColor: colors.indigo['600'],
              borderColor: colors.indigo['600'],
              borderWidth: 4,
              tension: 0.4
            }
          ]
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
      ></Line>
    </Box>
  )
}

export default ArticleViewsOverTime
