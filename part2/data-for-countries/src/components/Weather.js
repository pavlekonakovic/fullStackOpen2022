import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`)
      .then(response => {
        const latLongObj = {
          lat: Math.round((response.data[0].lat)*100) / 100,
          lon: Math.round((response.data[0].lon)*100) / 100,
        }
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLongObj.lat}&lon=${latLongObj.lon}&units=metric&appid=${api_key}`)
          .then(response => {
            setWeather(response.data)
          })
      })
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