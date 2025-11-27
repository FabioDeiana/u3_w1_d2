import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import MyNav from "./components/MyNav"
import MyFooter from "./components/MyFooter"
import Welcome from "./components/Welcome"
import AllTheBooks from "./components/AllTheBooks"
import BookList from "./components/BookList"
import CommentArea from "./components/CommentArea"
import books from "./assets/horror.json"

function App() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBookSelect = (book) => {
    setSelectedBook(book)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <>
      <MyNav onSearch={handleSearch}></MyNav>
      <Welcome></Welcome>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">Lista Libri</h2>
            <BookList
              books={filteredBooks}
              selectedBook={selectedBook}
              onBookSelect={handleBookSelect}
            />
          </div>
          <div className="col-md-4">
            {selectedBook && (
              <>
                <h2 className="mb-4">Commenti</h2>
                <CommentArea book={selectedBook} />
              </>
            )}
          </div>
        </div>
      </div>
      <AllTheBooks></AllTheBooks>
      <MyFooter></MyFooter>
    </>
  )
}
export default App
