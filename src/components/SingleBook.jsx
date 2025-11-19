import { Component } from "react"
import Card from "react-bootstrap/Card"

class SingleBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
    }
  }

  toggleSelected = () => {
    this.setState({ selected: !this.state.selected })
  }

  render() {
    const { book } = this.props
    const { selected } = this.state

    return (
      <Card
        onClick={this.toggleSelected}
        style={{
          cursor: "pointer",
          border: selected ? "3px solid red" : "1px solid #ddd",
          transition: "all 0.3s ease",
        }}
      >
        <Card.Img
          variant="top"
          src={book.img}
          alt={book.title}
          style={{ height: "300px", cursor: "pointer" }}
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
      </Card>
    )
  }
}

export default SingleBook
