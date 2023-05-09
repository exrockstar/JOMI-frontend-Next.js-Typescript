import React from 'react'
import ErrorPage from './ErrorPage'

const Error403 = () => {
  return (
    <ErrorPage
      code={403}
      message="Unauthorized. Please login as admin to view this page."
    />
  )
}

export default Error403
