import { Box } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import logoLight from 'public/logo_notext_light.png'
import logoDark from 'public/logo_notext_dark.png'
type Props = {
  height?: 45 | 60 | 90 | 180 | 360 | 480 | 720 | 900
  type?: 'light' | 'dark'
  href?: string
}

const Logo = ({ height = 180, type = 'light', href }: Props) => {
  const width = ((height / 900) * 1600).toFixed(0)
  const img = type === 'light' ? logoLight : logoDark
  return (
    <Link href={href ?? '/'} passHref legacyBehavior>
      <Box component="a">
        <Image src={img.src} alt="logo" height={height} width={Number(width)} />
      </Box>
    </Link>
  )
}

export default Logo
