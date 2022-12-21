import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import { useField } from '../hooks'

import { Button, TextField, Typography, Box } from '@mui/material'

const BlogForm = ({ blogRef }) => {
  const dispatch = useDispatch()

  const [newTitle, resetTitle] = useField('text', 'title')
  const [newAuthor, resetAuthor] = useField('text', 'author')
  const [newUrl, resetUrl] = useField('text', 'url')

  const addBlog = async (event) => {
    event.preventDefault()
    blogRef.current.toggleVisibility()
    dispatch(
      createBlog({
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value,
      }),
    )

    resetAuthor()
    resetTitle()
    resetUrl()
  }

  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold'}}>
        Create new
      </Typography>
      <Box component='form' onSubmit={addBlog} noValidate sx={{ mb: 4}}>
        <TextField
          required
          fullWidth
          variant='standard'
          {...newTitle}
        />
        <TextField
          required
          fullWidth
          variant='standard'
          {...newAuthor}
        />
        <TextField
          required
          fullWidth
          variant='standard'
          {...newUrl}
        />
        <Button type='submit' id='create-button' variant='outlined' sx={{ mt: 2}}>
          create
        </Button>
      </Box>
    </div>
  )
}

export default BlogForm
