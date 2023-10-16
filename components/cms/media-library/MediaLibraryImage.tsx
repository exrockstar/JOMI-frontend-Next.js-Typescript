import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'
import NoImage from './No-Image-Placeholder.png'
const MediaLibraryImage = (props: ImageProps) => {
  const [src, setSrc] = useState(props.src)
  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      onError={() => {
        setSrc(NoImage.src)
      }}
      fill
      style={{
        objectFit: 'contain'
      }}
    />
  )
}

export default MediaLibraryImage
