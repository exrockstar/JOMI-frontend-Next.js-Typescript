import * as React from 'react'
import Image from 'next/legacy/image'

export function IconLogo({ style }: { style?: any } = { style: {} }) {
  return (
    <span style={{ ...style }}>
      <Image alt="jomi_black" height={80} width={80} src="/logo.svg" />
    </span>
  )
}
