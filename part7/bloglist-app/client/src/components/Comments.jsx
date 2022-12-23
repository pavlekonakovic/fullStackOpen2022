import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

import { addComment } from '../reducers/blogReducer'

import { Button, TextField, Typography, Box, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
      <Typography variant='h6'>Comments</Typography>
      <Box component='form' onSubmit={handleAddComment} noValidate>
        <TextField variant='standard' fullWidth {...newComment} />
        <Button type='submit' id='comment-button' variant='contained' sx={{ mt: 2 }}>
          add comment
        </Button>
      </Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper', my: 4 }}>
        {comments.map((comment, id) => (
          <ListItem key={id} disablePadding alignItems='center' sx={{ borderBottom: 1, borderColor: '#eee', p: 1 }}>
            <ListItemAvatar>
              <AccountCircleIcon sx={{ color: '#bdbdbd', fontSize: 32 }} />
            </ListItemAvatar>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Comments
