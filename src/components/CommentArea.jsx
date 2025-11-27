import { useState, useEffect } from "react"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

const CommentArea = ({ book }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComments = async () => {
    if (!book || !book.asin) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${book.asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTFmMjg4NDIzZTc0MDAwMTVmN2ZkZWQiLCJpYXQiOjE3NjM2NDk2NjgsImV4cCI6MTc2NDg1OTI2OH0.B-fhl9uA_W2-im-0mdQmqmYqs3ltGkWVHMRiD0SJLzU",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Errore nel caricamento dei commenti")
      }
      const data = await response.json()
      setComments(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [book?.asin])

  const addComment = (newComment) => {
    setComments([newComment, ...comments])
  }

  if (!book) {
    return (
      <div className="mt-3 p-3 bg-light rounded" data-testid="comment-area">
        <p className="text-muted">Seleziona un libro per vedere i commenti</p>
      </div>
    )
  }

  return (
    <div className="mt-3 p-3 bg-light rounded" data-testid="comment-area">
      {" "}
      {}
      <h5>Commenti per: {book.title}</h5>
      {loading && (
        <p className="text-muted" data-testid="loading-spinner">
          Caricamento commenti...
        </p>
      )}{" "}
      {}
      {error && <p className="text-danger">Errore: {error}</p>}
      {!loading && !error && (
        <>
          <CommentsList
            comments={comments}
            bookAsin={book.asin}
            onCommentDeleted={fetchComments}
          />
          <AddComment bookAsin={book.asin} onCommentAdded={addComment} />
        </>
      )}
    </div>
  )
}

export default CommentArea
