import "bootstrap/dist/css/bootstrap.min.css"
import MyNav from "./components/MyNav"
import MyFooter from "./components/MyFooter"
import Welcome from "./components/Welcome"
import AllTheBooks from "./components/AllTheBooks"
import BookList from "./components/BookList"
import books from "./assets/horror.json"

function App() {
  return (
    <>
      <MyNav></MyNav>
      <Welcome></Welcome>
      <div className="container mt-4">
        <h2 className="mb-4">Lista Libri</h2>
        <BookList books={books}></BookList>
      </div>
      <AllTheBooks></AllTheBooks>
      <MyFooter></MyFooter>
    </>
  )
}

export default App
