import { useRef } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

import { Box, Typography } from '@mui/material'

const Blogs = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <Typography variant='h4'>Recent blogs</Typography>
      <Box display='flex' justifyContent='end' alignItems='end'>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm blogRef={blogFormRef} />
        </Togglable>
      </Box>
      <BlogList />
    </div>
  )
}

export default Blogs
