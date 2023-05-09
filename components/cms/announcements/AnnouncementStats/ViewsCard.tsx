import {
  Avatar,
  Card,
  CardContent,
  Grid,
  SvgIcon,
  Typography
} from '@mui/material'
import React from 'react'
type Props = {
  title: string
  views: number | string
  Icon: typeof SvgIcon
  bgcolor: string
}

const ViewsCard = ({ title, views, Icon, bgcolor }: Props) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {views}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: bgcolor,
                height: 56,
                width: 56
              }}
            >
              {<Icon />}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ViewsCard
