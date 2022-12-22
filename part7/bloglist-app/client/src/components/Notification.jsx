import { useSelector } from 'react-redux'

import { Alert, Snackbar } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      {notification && (
        <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity={notification.includes('error') ? 'error' : 'success'}>{notification}</Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default Notification
