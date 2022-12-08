import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginFrom from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setNotification(`${user.name} succesfully logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotification('error: wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setNotification(`${user.name} logged out`)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat({ ...blog, user }))
      setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(`error: failed to add blog.${exception.message}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateLike = async (id, newObject) => {
    try {
      const response = await blogService.update(id, newObject)
      setBlogs(blogs.map((blog) => (blog.id !== response.id ? blog : { ...blog, likes: response.likes })))
    } catch (exception) {
      setNotification(`error ${exception.message}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)

      setBlogs(blogs.filter((blog) => blog.id !== id))
      setNotification('Blog removed')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotification(`error ${exception.message}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  return (
    <div>
      <Notification message={notification} />

      {user === null ? (
        <LoginFrom
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLike={updateLike}
                username={user.username}
                removeBlog={removeBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
