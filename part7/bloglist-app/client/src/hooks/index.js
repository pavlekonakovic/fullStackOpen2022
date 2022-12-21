import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  const label = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return [{
    type,
    value,
    onChange,
    name,
    label: label(name),
    className: name,
    id: name,
  }, 
  reset
  ]
}