import { useState } from 'react';

const Blog = ({ blog, updateLike, username, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    };

    updateLike(blog.id, updatedBlog);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };

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
  );
};

export default Blog;
