import { Component } from "react"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

class CommentArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchComments()
  }

  fetchComments = async () => {
    const { book } = this.props
    try {
      this.setState({ loading: true, error: null })
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
      this.setState({ comments: data, loading: false })
    } catch (err) {
      this.setState({ error: err.message, loading: false })
    }
  }

  addComment = (newComment) => {
    this.setState((prevState) => ({
      comments: [newComment, ...prevState.comments],
    }))
  }

  render() {
    const { book } = this.props
    const { comments, loading, error } = this.state

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
              onCommentDeleted={this.fetchComments}
            />
            <AddComment bookAsin={book.asin} onCommentAdded={this.addComment} />
          </>
        )}
      </div>
    )
  }
}

export default CommentArea
