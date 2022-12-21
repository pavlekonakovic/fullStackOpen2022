import { useRef } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Blogs = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Blogs
