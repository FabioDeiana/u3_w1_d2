import { render, screen } from "@testing-library/react"
import BookList from "../components/BookList"
import books from "../data/books.json" // Importa il tuo file JSON

describe("BookList Component", () => {
  test("verifica che vengano renderizzate tante cards quanti sono i libri nel JSON", () => {
    render(<BookList books={books} />)

    // Trova tutte le cards usando il data-testid (da aggiungere al componente)
    // Oppure cerca per classe Bootstrap
    const bookCards = screen.getAllByTestId("book-card")

    // Verifica che il numero di cards corrisponda al numero di libri
    expect(bookCards).toHaveLength(books.length)
  })

  test("verifica che ogni card contenga le informazioni del libro", () => {
    render(<BookList books={books} />)

    // Verifica che almeno il titolo del primo libro sia presente
    const firstBookTitle = screen.getByText(books[0].title)
    expect(firstBookTitle).toBeInTheDocument()
  })

  test("verifica che le immagini dei libri vengano renderizzate", () => {
    render(<BookList books={books} />)

    const bookImages = screen.getAllByRole("img")
    expect(bookImages.length).toBeGreaterThan(0)
  })
})
