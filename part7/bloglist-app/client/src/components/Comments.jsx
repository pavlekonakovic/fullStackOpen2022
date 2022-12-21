import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

import { addComment } from '../reducers/blogReducer'

import { Button, TextField, Typography, Box } from '@mui/material'

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
      <Typography variant='h4'>Comments</Typography>
      <Box component='form' onSubmit={handleAddComment} noValidate>
        <TextField
          variant='standard'
          fullWidth 
          {...newComment}
        />
        <Button type='submit' id='comment-button' variant='contained' sx={{ mt: 2}}>
          add comment
        </Button>
      </Box>
      <ul>
        {comments.map((comment, id) => (
          <li key={id}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
