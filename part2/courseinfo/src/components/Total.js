const Total = ({ parts }) => {
  const total = parts.reduce((totalAmount, currentValue) => totalAmount + currentValue.exercises, 0)

  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  )
}


export default Total