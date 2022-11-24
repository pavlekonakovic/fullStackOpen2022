import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = ({ target }) => setNewTitle(target.value)
  const handleAuthorChange = ({ target }) => setNewAuthor(target.value)
  const handleUrlChange = ({ target }) => setNewUrl(target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

return(
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title
        <input 
          type='text'
          value={newTitle}
          name='Title'
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input 
          type='text'
          value={newAuthor}
          name='Author'
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input 
          type='text'
          value={newUrl}
          name='Url'
          onChange={handleUrlChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  </div>
)}

export default BlogForm