import React, { memo } from 'react'

import Image from 'next/legacy/image'
type Props = {
  thumbnailUrl: string
  onPlay(): void
}

/**
 * Preloads the video thumbnail for faster load times
 * @param props
 * @returns
 */
const VideoPreload = ({ thumbnailUrl, onPlay }: Props) => {
  return (
    <Image
      src={thumbnailUrl}
      alt="cover-image"
      layout="fill"
      objectFit="cover"
      quality={80}
      priority={true}
    />
  )
}

export default memo(VideoPreload)
