import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [{
    type,
    value,
    onChange
  },
  reset
  ]
}
  
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(() => {
      axios
        .get(baseUrl)
        .then(response => {
          setResources(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }, [baseUrl])
    
    const create = async (resource) => {
      const response = await axios.post(baseUrl, resource)
      setResources([...resources, response.data])
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }
  