import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = ({ username }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={username} />
        ))}
    </div>
  )
}

export default BlogList
