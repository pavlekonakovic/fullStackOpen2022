import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = event => {
    const filter = event.target.value
    setSearchCountry(filter)
    if(filter){
      setFilteredCountries(
        countries.filter(country =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      )
    }
  }

  return (
    <div>
     <Filter value={searchCountry} handleChange={handleFilterChange} />
     <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries}/>
    </div>
  );
}

export default App;
