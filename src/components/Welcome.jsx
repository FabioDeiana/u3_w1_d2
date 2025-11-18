import Alert from "react-bootstrap/Alert"

const Welcome = function () {
  return (
    <Alert variant="success">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>Libri pazzeschi</p>
      <hr />
      <p className="mb-0">Libri? Eccoli</p>
    </Alert>
  )
}

export default Welcome
