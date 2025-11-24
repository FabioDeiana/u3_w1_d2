import Card from "react-bootstrap/Card"

const SingleBook = ({ book, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(book.asin)
  }

  return (
    <Card
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: isSelected ? "3px solid red" : "1px solid #ddd",
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

export default SingleBook
