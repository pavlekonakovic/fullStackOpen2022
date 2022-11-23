import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginFrom from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      setNotification(`${user.name} succesfully logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception){
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')
        setNotification(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification(
          `error: failed to add blog ${title} by ${author}. ${error.message}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)  
      })
  }


  return (
    <div>
      <Notification message={notification}/>

      {user === null ?
        <LoginFrom 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> : 
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm 
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            addBlog={addBlog}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}  
        </div>  
      }
    </div>
  )
}

export default App
