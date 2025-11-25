import { useState, useEffect } from "react"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

const CommentArea = ({ book }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComments = async () => {
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

  // useEffect come componentDidMount E componentDidUpdate
  // Si attiva quando book.asin cambia
  useEffect(() => {
    fetchComments()
  }, [book.asin]) // Array di dipendenze: si riattiva quando asin cambia

  const addComment = (newComment) => {
    setComments([newComment, ...comments])
  }

  return (
    <div className="mt-3 p-3 bg-light rounded">
      <h5>Commenti per: {book.title}</h5>
      {loading && <p className="text-muted">Caricamento commenti...</p>}
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
