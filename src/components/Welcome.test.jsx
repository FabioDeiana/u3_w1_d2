import { render, screen } from "@testing-library/react"
import Welcome from "../components/Welcome"

describe("Welcome Component", () => {
  test("verifica che il componente Welcome venga montato correttamente", () => {
    render(<Welcome />)

    // Verifica che il componente sia presente nel DOM
    const welcomeElement = screen.getByText(/benvenuto/i)
    expect(welcomeElement).toBeInTheDocument()

    // Puoi anche verificare altri elementi specifici del tuo componente
    // Ad esempio, se ha un titolo o un sottotitolo
  })

  test("verifica che il componente contenga un elemento jumbotron o container", () => {
    const { container } = render(<Welcome />)

    // Verifica la presenza di classi Bootstrap
    const jumbotron =
      container.querySelector(".jumbotron") ||
      container.querySelector(".container")
    expect(jumbotron).toBeInTheDocument()
  })
})
