import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

import { addComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()

  const [newComment, resetComment] = useField('text', 'comment')

  const { comments, id } = blog

  const handleAddComment = (event) => {
    event.preventDefault()

    if (!newComment.value) return

    dispatch(addComment(id, newComment.value))
    resetComment()
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleAddComment}>
        <input {...newComment} />
        <button type='submit' id='comment-button'>
          add comment
        </button>
      </form>
      <ul>
        {comments.map((comment, id) => (
          <li key={id}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
