import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteBlog, voteBlog } from '../reducers/blogReducer'

import Comments from './Comments'

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
          <button onClick={handleLikes} className='like-button'>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username && <button onClick={handleRemove}>delete</button>}
        <p>
          added by <strong>{blog.user.name}</strong>
        </p>
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog
