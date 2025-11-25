import { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const AddComment = ({ bookAsin, onCommentAdded }) => {
  // UNICO useState per tutto il form (come richiesto)
  const [formData, setFormData] = useState({
    comment: "",
    rate: 3,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Handler generico per tutti i campi del form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.comment.trim()) {
      setError("Scrivi un commento!")
      return
    }

    try {
      setLoading(true)
      setError(null)

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
            comment: formData.comment,
            rate: formData.rate,
            elementId: bookAsin,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Errore nell'invio del commento")
      }

      const newComment = await response.json()
      onCommentAdded(newComment)

      // Reset del form
      setFormData({
        comment: "",
        rate: 3,
      })
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group className="mb-3">
        <Form.Label>Aggiungi un commento</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Scrivi il tuo commento..."
          disabled={loading}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Voto</Form.Label>
        <Form.Select
          name="rate"
          value={formData.rate}
          onChange={handleChange}
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

export default AddComment
