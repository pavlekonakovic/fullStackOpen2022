import Weather from "./Weather"

const Country = ({country}) =>
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital {country.capital}</p>
    <p>Area {country.area} km²</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
      )}
    </ul>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
    <Weather city={country.capital}/>
  </div>

export default Country