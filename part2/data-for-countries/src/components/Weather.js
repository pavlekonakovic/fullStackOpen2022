import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <div>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
          <p>Wind {weather.wind.speed}</p>
        </div>
      ) : null }
    </div>
  )
}

export default Weather