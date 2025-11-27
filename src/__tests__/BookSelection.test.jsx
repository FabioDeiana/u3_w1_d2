import { render, screen, fireEvent } from "@testing-library/react"
import App from "../App"

describe("Book Selection Tests", () => {
  test("verifica che cliccando su un libro il suo bordo cambi colore", () => {
    render(<App />)

    // Ottieni il primo libro
    const bookCards = screen.getAllByTestId("book-card")
    const firstBook = bookCards[0]

    // Clicca sul libro
    fireEvent.click(firstBook)

    // Verifica che il libro abbia una classe o uno stile che indica la selezione
    // Questo dipende dalla tua implementazione
    expect(firstBook).toHaveClass("selected") // Oppure controlla lo style
    // Oppure: expect(firstBook).toHaveStyle('border: 3px solid red');
  })

  test("verifica che il bordo del libro selezionato sia diverso dagli altri", () => {
    render(<App />)

    const bookCards = screen.getAllByTestId("book-card")
    const firstBook = bookCards[0]
    const secondBook = bookCards[1]

    // Clicca sul primo libro
    fireEvent.click(firstBook)

    // Verifica che solo il primo libro abbia la classe selected
    expect(firstBook).toHaveClass("selected")
    expect(secondBook).not.toHaveClass("selected")
  })

  test("verifica che cliccando su un secondo libro, il bordo del primo ritorni normale", () => {
    render(<App />)

    const bookCards = screen.getAllByTestId("book-card")
    const firstBook = bookCards[0]
    const secondBook = bookCards[1]

    // Clicca sul primo libro
    fireEvent.click(firstBook)
    expect(firstBook).toHaveClass("selected")

    // Clicca sul secondo libro
    fireEvent.click(secondBook)

    // Verifica che il primo libro non sia più selezionato
    expect(firstBook).not.toHaveClass("selected")

    // Verifica che il secondo libro sia ora selezionato
    expect(secondBook).toHaveClass("selected")
  })

  test("verifica che solo un libro alla volta possa essere selezionato", () => {
    render(<App />)

    const bookCards = screen.getAllByTestId("book-card")

    // Clicca su diversi libri
    fireEvent.click(bookCards[0])
    fireEvent.click(bookCards[2])
    fireEvent.click(bookCards[1])

    // Conta quanti libri hanno la classe selected
    const selectedBooks = bookCards.filter((book) =>
      book.classList.contains("selected")
    )

    expect(selectedBooks).toHaveLength(1)
  })
})
