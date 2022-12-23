import { useSelector } from 'react-redux'

import { Alert, Snackbar, Slide } from '@mui/material'

const SlideTransition = (props) => {
  return <Slide {...props} direction='down' />
}

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      {notification && (
        <Snackbar
          open={true}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={notification.includes('error') ? 'error' : 'success'}>{notification}</Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default Notification
