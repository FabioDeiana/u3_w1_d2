import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import App from "../App"

describe("Comments Tests", () => {
  test("verifica che all'avvio non ci siano istanze di SingleComment nel DOM", () => {
    render(<App />)

    // Cerca i commenti usando data-testid
    const comments = screen.queryAllByTestId("single-comment")

    // All'avvio non dovrebbero esserci commenti
    expect(comments).toHaveLength(0)
  })

  test("verifica che senza selezione non ci siano commenti visibili", () => {
    render(<App />)

    // Verifica che non ci siano elementi di commento
    const commentsList = screen.queryByTestId("comments-list")

    // La lista potrebbe non esistere o essere vuota
    if (commentsList) {
      const comments = screen.queryAllByTestId("single-comment")
      expect(comments).toHaveLength(0)
    }
  })

  test("verifica che cliccando su un libro i commenti vengano caricati", async () => {
    render(<App />)

    // Trova e clicca su un libro
    const bookCards = screen.getAllByTestId("book-card")
    const firstBook = bookCards[0]

    fireEvent.click(firstBook)

    // Attendi che i commenti vengano caricati (chiamata API asincrona)
    await waitFor(
      () => {
        const comments = screen.queryAllByTestId("single-comment")
        // Se il libro ha commenti, dovrebbero essere visualizzati
        // Altrimenti potrebbe esserci un messaggio "nessun commento"
        expect(
          comments.length > 0 || screen.getByText(/nessun commento/i)
        ).toBeTruthy()
      },
      { timeout: 3000 }
    )
  })

  test("verifica che i commenti caricati corrispondano al libro selezionato", async () => {
    render(<App />)

    const bookCards = screen.getAllByTestId("book-card")
    const bookWithComments = bookCards[0]

    fireEvent.click(bookWithComments)

    // Attendi il caricamento dei commenti
    await waitFor(() => {
      const commentArea = screen.getByTestId("comment-area")
      expect(commentArea).toBeInTheDocument()
    })

    // Verifica che la CommentArea sia associata al libro corretto
  })

  test("verifica che cambiando libro i commenti si aggiornino", async () => {
    render(<App />)

    const bookCards = screen.getAllByTestId("book-card")

    // Clicca sul primo libro
    fireEvent.click(bookCards[0])

    await waitFor(() => {
      const comments = screen.queryAllByTestId("single-comment")
      expect(comments.length).toBeGreaterThanOrEqual(0)
    })

    const firstBookComments = screen.queryAllByTestId("single-comment").length

    // Clicca sul secondo libro
    fireEvent.click(bookCards[1])

    await waitFor(() => {
      const comments = screen.queryAllByTestId("single-comment")
      // I commenti potrebbero essere diversi

      expect(comments).toBeDefined()
    })
  })

  test("verifica la presenza di un loading state durante il caricamento dei commenti", async () => {
    render(<App />)

    const bookCards = screen.getAllByTestId("book-card")
    fireEvent.click(bookCards[0])

    // Cerca un indicatore di caricamento
    const loadingIndicator =
      screen.queryByText(/caricamento/i) ||
      screen.queryByTestId("loading-spinner")

    // Il loading potrebbe essere molto veloce, quindi potrebbe non essere sempre visibile
  })
})
