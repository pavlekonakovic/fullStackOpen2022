import { useRef } from 'react'

import { useSelector } from 'react-redux'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Blogs = () => {
  const blogFormRef = useRef()

  const user = useSelector((state) => state.user)

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList username={user.username} />
    </div>
  )
}

export default Blogs
