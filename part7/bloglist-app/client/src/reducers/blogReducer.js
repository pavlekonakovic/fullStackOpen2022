import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteFor(state, action){
      const changedBlog = action.payload
      const { id } = changedBlog
      return state.map(blog =>
        blog.id !== id ? blog : {...blog, likes: changedBlog.likes}
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog =>
        blog.id !== id
      )
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
      const newBlog = await blogServices.create(blog)
      dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogServices.remove(blog.id)

    dispatch(removeBlog(blog.id))
  }
}

export const voteBlog = (id, blog) => {
  return async dispatch => {
    const voteBlog = await blogServices.update(id, blog)
    dispatch(voteFor(voteBlog))
  }
}

export const { appendBlog, setBlogs, voteFor, removeBlog } = blogSlice.actions
export default blogSlice.reducer