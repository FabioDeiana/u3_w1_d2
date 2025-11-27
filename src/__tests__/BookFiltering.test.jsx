import { render, screen, fireEvent } from "@testing-library/react"
import App from "../App"
import books from "../data/books.json"

describe("Book Filtering Tests", () => {
  test("verifica che la searchbar sia presente nella navbar", () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText(/cerca/i)
    expect(searchInput).toBeInTheDocument()
  })

  test("verifica che il filtraggio riduca il numero di libri mostrati", () => {
    render(<App />)

    // Prima del filtraggio
    const initialBooks = screen.getAllByTestId("book-card")
    const initialCount = initialBooks.length

    // Applica il filtro
    const searchInput = screen.getByPlaceholderText(/cerca/i)
    fireEvent.change(searchInput, { target: { value: "Harry" } })

    // Dopo il filtraggio
    const filteredBooks = screen.getAllByTestId("book-card")

    expect(filteredBooks.length).toBeLessThan(initialCount)
  })

  test("verifica che il filtraggio mostri solo i libri corrispondenti", () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText(/cerca/i)
    const searchTerm = "test"

    fireEvent.change(searchInput, { target: { value: searchTerm } })

    // Verifica che i libri visibili contengano il termine cercato
    const visibleBooks = screen.getAllByTestId("book-card")

    visibleBooks.forEach((book) => {
      const bookText = book.textContent.toLowerCase()
      expect(bookText).toContain(searchTerm.toLowerCase())
    })
  })

  test("verifica che con una ricerca senza risultati non vengano mostrati libri", () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText(/cerca/i)
    fireEvent.change(searchInput, {
      target: { value: "xyztermineinesistente123" },
    })

    // Non dovrebbero esserci libri
    const books = screen.queryAllByTestId("book-card")
    expect(books).toHaveLength(0)

    // Potrebbe esserci un messaggio di "nessun risultato"
    const noResultsMessage = screen.queryByText(/nessun risultato/i)
    if (noResultsMessage) {
      expect(noResultsMessage).toBeInTheDocument()
    }
  })

  test("verifica che pulendo la ricerca vengano mostrati tutti i libri", () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText(/cerca/i)

    // Applica un filtro
    fireEvent.change(searchInput, { target: { value: "Harry" } })

    // Pulisci il filtro
    fireEvent.change(searchInput, { target: { value: "" } })

    // Verifica che tutti i libri siano di nuovo visibili
    const allBooks = screen.getAllByTestId("book-card")
    expect(allBooks.length).toBe(books.length)
  })
})
