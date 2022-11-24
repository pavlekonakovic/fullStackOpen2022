import { useState } from 'react'

const Blog = ({blog, updateLike}) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible? '' : 'none'}

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }

    updateLike(blog.id, updatedBlog)
  }

return(
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>likes {blog.likes}<button onClick={handleLikes}>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  </div>  
)}

export default Blog