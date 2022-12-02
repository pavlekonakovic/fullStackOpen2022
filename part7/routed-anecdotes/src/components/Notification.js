const Notification = ({ notification }) =>(
  <div>
    {notification &&
    <p>
      {notification}
    </p>
    }
  </div>
)

export default Notification