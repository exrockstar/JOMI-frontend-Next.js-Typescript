import ErrorPage from './ErrorPage'

const Error404 = () => {
  return (
    <ErrorPage
      code={404}
      message="We couldn't find the page you're looking for."
    />
  )
}

export default Error404
