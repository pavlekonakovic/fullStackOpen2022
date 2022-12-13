import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBlog, voteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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
    dispatch(voteBlog(blog.id, updatedBlog))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
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
          {blog.user.username === user.username && <button onClick={handleRemove}>delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
