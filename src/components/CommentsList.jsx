import SingleComment from "./SingleComment"

const CommentsList = ({ comments, bookAsin, onCommentDeleted }) => {
  return (
    <div className="comments-list mt-4">
      {comments.length === 0 ? (
        <p className="text-muted text-center">Nessun commento ancora...</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <SingleComment
              key={comment._id}
              comment={comment}
              onCommentDeleted={onCommentDeleted}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentsList
