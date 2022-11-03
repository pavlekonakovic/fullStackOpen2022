const Country = ({country}) =>
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital {country.capital}</p>
    <p>Area {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
      )}
    </ul>
    <img src={country.flags.png} alt="Country Flag"/>
  </div>

export default Country