import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { Container, Row, Col } from "react-bootstrap"
import books from "../assets/horror.json"

const AllTheBooks = function () {
  return (
    <Container className="my-4">
      <h2 className="mb-4">Horror Books Collection</h2>
      <Row>
        {books.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ width: "100%", height: "100%" }}>
              <Card.Img
                variant="top"
                src={book.img}
                alt={book.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "0.9rem", minHeight: "3rem" }}>
                  {book.title}
                </Card.Title>
                <Card.Text>
                  <strong className="text-success">
                    €{book.price.toFixed(2)}
                  </strong>
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AllTheBooks
