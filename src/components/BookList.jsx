import SingleBook from "./SingleBook"

const BookList = function (props) {
  const { books } = props

  return (
    <div className="d-flex flex-wrap gap-3">
      {books.map((book) => (
        <div key={book.asin} style={{ width: "200px" }}>
          <SingleBook book={book} />
        </div>
      ))}
    </div>
  )
}

export default BookList
