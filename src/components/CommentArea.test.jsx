import { render, screen } from "@testing-library/react"
import CommentArea from "../components/CommentArea"

describe("CommentArea Component", () => {
  test("verifica che il componente CommentArea venga renderizzato correttamente", () => {
    render(<CommentArea asin="1234567890" />)

    // Verifica che il componente sia presente
    const commentArea = screen.getByTestId("comment-area")
    expect(commentArea).toBeInTheDocument()
  })

  test("verifica che il componente mostri un messaggio quando non ci sono commenti", () => {
    render(<CommentArea asin={null} />)

    // Cerca un messaggio che indica nessuna selezione o nessun commento
    const noCommentsMessage =
      screen.getByText(/seleziona un libro/i) ||
      screen.getByText(/nessun commento/i)
    expect(noCommentsMessage).toBeInTheDocument()
  })

  test("verifica la presenza del form per aggiungere commenti", () => {
    render(<CommentArea asin="1234567890" />)

    // Cerca elementi del form
    const commentForm = screen.getByTestId("comment-form")
    expect(commentForm).toBeInTheDocument()
  })
})
