import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(voteBlog(blog.id, updatedBlog))
    } catch (error) {
      dispatch(setNotification(`error ${error.message}`, 5))
    }
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification('Blog removed', 5))
      } catch (error) {
        dispatch(setNotification(`error ${error.message}`, 5))
      }
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={handleLikes} className='like-button'>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === username && <button onClick={handleRemove}>delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
