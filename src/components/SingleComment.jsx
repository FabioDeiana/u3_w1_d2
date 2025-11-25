import { useState } from "react"

const SingleComment = ({ comment, onCommentDeleted }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTFmMjg4NDIzZTc0MDAwMTVmN2ZkZWQiLCJpYXQiOjE3NjM2NDk2NjgsImV4cCI6MTc2NDg1OTI2OH0.B-fhl9uA_W2-im-0mdQmqmYqs3ltGkWVHMRiD0SJLzU",
          },
        }
      )

      if (!response.ok) {
        throw new Error("Errore nell'eliminazione del commento")
      }

      onCommentDeleted()
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="card mb-3 p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <div className="mb-2">
            <span className="badge bg-warning text-dark me-2">
              {comment.rate} ⭐
            </span>
            <small className="text-muted">{comment.author}</small>
          </div>
          <p className="mb-0">{comment.comment}</p>
          {error && <p className="text-danger mt-2 mb-0 small">{error}</p>}
        </div>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn btn-sm btn-danger ms-3"
        >
          {loading ? "Eliminando..." : "Elimina"}
        </button>
      </div>
    </div>
  )
}

export default SingleComment
