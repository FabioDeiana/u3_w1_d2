import { Component } from "react"
import { Row, Col } from "react-bootstrap"
import SingleBook from "./SingleBook"
import CommentArea from "./CommentArea"

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAsin: null,
    }
  }

  handleBookSelect = (asin) => {
    this.setState({ selectedAsin: asin })
  }

  render() {
    const { books } = this.props
    const { selectedAsin } = this.state

    const selectedBook = books.find((book) => book.asin === selectedAsin)

    return (
      <Row>
        <Col md={8}>
          <div className="d-flex flex-wrap gap-3">
            {books.map((book) => (
              <div key={book.asin} style={{ width: "200px" }}>
                <SingleBook
                  book={book}
                  isSelected={book.asin === selectedAsin}
                  onSelect={this.handleBookSelect}
                />
              </div>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <div className="position-sticky" style={{ top: "20px" }}>
            {selectedBook ? (
              <CommentArea book={selectedBook} />
            ) : (
              <div className="p-3 bg-light rounded text-center">
                <p className="text-muted">
                  Seleziona un libro per vedere i commenti
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    )
  }
}

export default BookList
