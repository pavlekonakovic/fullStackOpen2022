import { useSelector } from 'react-redux'

import Alert from '@mui/material/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      {notification && (
        <Alert severity={notification.includes('error') ? 'error' : 'success'}>
          {notification}
        </Alert>
      )}
    </div>
  )
}

export default Notification
