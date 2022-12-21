import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteBlog, voteBlog } from '../reducers/blogReducer'

import Comments from './Comments'

import { Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Blog = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id))
  const user = useSelector((state) => state.user)

  if (!blog) return null

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(voteBlog(blog.id, updatedBlog))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  return (
    <div className='blog'>
      <Typography variant='h6'>
        {blog.title} by {blog.author}
      </Typography>
      <div>
        <Typography variant='body2'>{blog.url}</Typography>
        <Typography variant='subtitle2'>likes {blog.likes}</Typography>
        <Button onClick={handleLikes} className='like-button' variant='contained' startIcon={<FavoriteIcon />}>
          like
        </Button>
        {blog.user.username === user.username && (
          <Button onClick={handleRemove} variant='contained' startIcon={<DeleteIcon />}>
            delete
          </Button>
        )}
        <Typography variant='body2'>
          added by <strong>{blog.user.name}</strong>
        </Typography>
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog
