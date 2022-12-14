import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action){
      const changedBlog = action.payload
      const { id } = changedBlog
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
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
    try{
      const newBlog = await blogServices.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 5))
    } catch (error) {
      dispatch(setNotification(`error creating the blog. ${error.message}`))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try{
      await blogServices.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(setNotification('Blog removed', 5))
    } catch (error) {
      dispatch(setNotification(`error ${error.message}`, 5))
    }
  }
}

export const voteBlog = (id, blog) => {
  return async dispatch => {
    try{
      const voteBlog = await blogServices.update(id, blog)
      dispatch(updateBlog(voteBlog))
    } catch (error) {
      dispatch(setNotification(`error ${error.message}`, 5))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try{
      const updatedBlog = await blogServices.addComment(id, comment)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification(`Added comment ${comment}`, 5))
    } catch (error) {
      dispatch(setNotification(`error adding comment, ${error.message}`))
    }
  }
}

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer