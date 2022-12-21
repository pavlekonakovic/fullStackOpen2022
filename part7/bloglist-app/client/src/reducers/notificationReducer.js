import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch(createNotification(notification))

    if(timeoutId) clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer