import AppErrorFallback from 'components/fallbacks/AppErrorFallback'
import React from 'react'

const Custom500 = () => {
  return (
    <AppErrorFallback
      error={{
        message: '500 Internal Server Error',
        name: 'InternalServerError'
      }}
      resetErrorBoundary={() => {}}
    />
  )
}

export default Custom500
