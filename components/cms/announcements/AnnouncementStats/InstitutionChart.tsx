import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import React, { useMemo } from 'react'

ChartJS.register(ArcElement)

type ViewData = {
  key: string
  views: number
}

type Props = {
  views: ViewData[]
  title: string
}

const ViewChart = ({ views, title }: Props) => {
  const theme = useTheme()

  const colors = useMemo(() => {
    return views
      .map((v) => `hsla(${~~(360 * Math.random())},80%,60%,0.7)`)
      .slice(0, 10)
  }, [])

  const data = {
    labels: views.map((v) => v.key),
    datasets: [
      {
        data: views.map((v) => v.views),
        backgroundColor: colors
      }
    ]
  }

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <Doughnut
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: title
              }
            }
          }}
          plugins={[ArcElement]}
        />
      </CardContent>
    </Card>
  )
}

export default React.memo(ViewChart)
