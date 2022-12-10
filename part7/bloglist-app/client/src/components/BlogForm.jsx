import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useField } from '../hooks'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [newTitle, resetTitle] = useField('text', 'title')
  const [newAuthor, resetAuthor] = useField('text', 'author')
  const [newUrl, resetUrl] = useField('text', 'url')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      dispatch(
        createBlog({
          title: newTitle.value,
          author: newAuthor.value,
          url: newUrl.value,
        }),
      )
      dispatch(setNotification(`a new blog ${newTitle.value} by ${newAuthor.value} added`, 5))

      resetAuthor()
      resetTitle()
      resetUrl()
    } catch (error) {
      dispatch(setNotification(`error creating the blog. ${error.message}`))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input {...newTitle} />
        </div>
        <div>
          author
          <input {...newAuthor} />
        </div>
        <div>
          url
          <input {...newUrl} />
        </div>
        <button type='submit' id='create-button'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
