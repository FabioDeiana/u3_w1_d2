import { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: "",
      rate: 3,
      loading: false,
      error: null,
    }
  }

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value })
  }

  handleRateChange = (e) => {
    this.setState({ rate: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { comment, rate } = this.state
    const { bookAsin, onCommentAdded } = this.props

    if (!comment.trim()) {
      this.setState({ error: "Scrivi un commento!" })
      return
    }

    try {
      this.setState({ loading: true, error: null })

      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTFmMjg4NDIzZTc0MDAwMTVmN2ZkZWQiLCJpYXQiOjE3NjM2NDk2NjgsImV4cCI6MTc2NDg1OTI2OH0.B-fhl9uA_W2-im-0mdQmqmYqs3ltGkWVHMRiD0SJLzU",
          },
          body: JSON.stringify({
            comment: comment,
            rate: rate,
            elementId: bookAsin,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Errore nell'invio del commento")
      }

      const newComment = await response.json()
      onCommentAdded(newComment)

      this.setState({
        comment: "",
        rate: 3,
        loading: false,
      })
    } catch (err) {
      this.setState({ error: err.message, loading: false })
    }
  }

  render() {
    const { comment, rate, loading, error } = this.state

    return (
      <Form onSubmit={this.handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Aggiungi un commento</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={this.handleCommentChange}
            placeholder="Scrivi il tuo commento..."
            disabled={loading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Voto</Form.Label>
          <Form.Select
            value={rate}
            onChange={this.handleRateChange}
            disabled={loading}
          >
            <option value={1}>1 stella</option>
            <option value={2}>2 stelle</option>
            <option value={3}>3 stelle</option>
            <option value={4}>4 stelle</option>
            <option value={5}>5 stelle</option>
          </Form.Select>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Invio..." : "Invia commento"}
        </Button>
      </Form>
    )
  }
}

export default AddComment
