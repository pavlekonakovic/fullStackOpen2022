import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import loginServices from '../services/login'

import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    }
  }
})

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogServices.setToken(user.token)
    }
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginServices.login({
        username,
        password,
      })
      dispatch(setUser(user))
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setNotification(`${user.name} succesfully logged in`, 5))
    } catch (error) {
      dispatch(setNotification('error: wrong username or password', 5))
    }
  }
}

export const userLogout = (user) => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch(removeUser())
    dispatch(setNotification(`${user.name} logged out`, 5))
  }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer