import { Box, Grid, GridSize } from '@mui/material'
import React, { Children, PropsWithChildren } from 'react'

type Props = {
  left?: GridSize
  right?: GridSize
} & PropsWithChildren
const TwoColumnLayout = ({ children, left = 6, right = 6 }: Props) => {
  const [leftChild, rightChild] = Children.toArray(children).slice(0, 2)
  return (
    <Grid container>
      <Grid item xs={12} md={left}>
        {leftChild}
      </Grid>
      <Grid item xs={12} md={right}>
        {rightChild}
      </Grid>
    </Grid>
  )
}

export default TwoColumnLayout
