import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteBlog, voteBlog } from '../reducers/blogReducer'

import Comments from './Comments'

import Button from '@mui/material/Button'
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
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <Button onClick={handleLikes} className='like-button' variant='contained' startIcon={<FavoriteIcon />}>
            like
          </Button>
        </p>
        {blog.user.username === user.username && +
          <Button onClick={handleRemove} variant='contained' startIcon={<DeleteIcon />}>delete</Button>}
        <p>
          added by <strong>{blog.user.name}</strong>
        </p>
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog
