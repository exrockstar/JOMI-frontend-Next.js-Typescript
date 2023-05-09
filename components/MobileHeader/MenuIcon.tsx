import { Close, Menu } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { keyframes } from '@mui/system'
import React, { useEffect, useRef } from 'react'

type Props = {
  open: boolean
}

/**
 * Animated menu icon for mobile from hamburger to close
 *
 * @returns
 */
const MenuIcon = ({ open }: Props) => {
  const prev = useRef(open)

  useEffect(() => {
    prev.current = open
  }, [open])
  return open ? (
    <AnimatedClose />
  ) : (
    <Menu
      sx={{
        ...(prev.current && { animation: `${rotateShow} .4s ease-out` })
      }}
    />
  )
}

export default MenuIcon

const rotateShow = keyframes`
  from {
    opacity: 0;
    transform: rotate(0deg);
  }

  to {
    opacity: 1;
    transform: rotate(180deg);
  }
`
const AnimatedClose = styled(Close)({
  animation: `${rotateShow} .4s ease-out`
})
